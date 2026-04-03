package org.kaspa.examples.shared;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusException;
import io.grpc.stub.BlockingClientCall;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicLong;
import protowire.RPCGrpc;
import protowire.GetInfoRequestMessage;
import protowire.KaspadRequest;
import protowire.KaspadResponse;

public final class RpcClientSession implements AutoCloseable {
    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(30);
    private static final int MAX_MESSAGE_SIZE = 1024 * 1024 * 1024;

    private final ManagedChannel channel;
    private final BlockingClientCall<KaspadRequest, KaspadResponse> stream;
    private final AtomicLong nextRequestId = new AtomicLong(1);

    public RpcClientSession(String host, int port) {
        channel = ManagedChannelBuilder.forAddress(host, port).usePlaintext().build();
        stream =
                RPCGrpc.newBlockingV2Stub(channel)
                        .withCompression("gzip")
                        .withMaxInboundMessageSize(MAX_MESSAGE_SIZE)
                        .messageStream();

        KaspadResponse response =
                sendInternal(
                        KaspadRequest.newBuilder()
                                .setGetInfoRequest(GetInfoRequestMessage.getDefaultInstance()));

        if (response.getPayloadCase() != KaspadResponse.PayloadCase.GETINFORESPONSE) {
            throw KaspadRpcException.unexpectedResponse("GetInfo", response.getPayloadCase());
        }

        if (response.getGetInfoResponse().hasError()) {
            throw KaspadRpcException.rpcError("GetInfo", response.getGetInfoResponse().getError());
        }
    }

    public synchronized KaspadResponse send(KaspadRequest.Builder requestBuilder) {
        return sendInternal(requestBuilder);
    }

    private KaspadResponse sendInternal(KaspadRequest.Builder requestBuilder) {
        long requestId = nextRequestId.getAndIncrement();
        try {
            boolean writeAccepted =
                    stream.write(
                            requestBuilder.setId(requestId).build(),
                            REQUEST_TIMEOUT.toMillis(),
                            TimeUnit.MILLISECONDS);
            if (!writeAccepted) {
                throw new KaspadRpcException(
                        "RPC stream closed while sending request " + requestId);
            }

            KaspadResponse response =
                    stream.read(REQUEST_TIMEOUT.toMillis(), TimeUnit.MILLISECONDS);
            if (response == null) {
                throw new KaspadRpcException("RPC stream closed before returning a response");
            }

            return response;
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new KaspadRpcException(
                    "Interrupted while waiting for response to request " + requestId, exception);
        } catch (TimeoutException exception) {
            throw new KaspadRpcException(
                    "Timed out waiting for response to request " + requestId, exception);
        } catch (StatusException exception) {
            throw new KaspadRpcException("RPC stream failed", exception);
        } catch (RuntimeException exception) {
            throw new KaspadRpcException("Failed to send request " + requestId, exception);
        }
    }

    @Override
    public void close() {
        try {
            stream.halfClose();
        } catch (RuntimeException ignored) {
        }

        channel.shutdown();
        try {
            if (!channel.awaitTermination(5, TimeUnit.SECONDS)) {
                channel.shutdownNow();
                channel.awaitTermination(5, TimeUnit.SECONDS);
            }
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            channel.shutdownNow();
        }
    }
}
