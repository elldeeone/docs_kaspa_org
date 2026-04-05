package org.kaspa.examples;

import org.kaspa.examples.shared.KaspadRpcException;
import org.kaspa.examples.shared.RpcClientSession;
import protowire.GetBlockDagInfoRequestMessage;
import protowire.GetBlockDagInfoResponseMessage;
import protowire.KaspadRequest;
import protowire.KaspadResponse;

public final class GettingStartedExample {
    private static final String HOST = env("KASPA_GRPC_HOST", "127.0.0.1");
    private static final int PORT = Integer.parseInt(env("KASPA_GRPC_PORT", "16110"));

    private GettingStartedExample() {}

    public static void main(String[] args) {
        try (RpcClientSession client = new RpcClientSession(HOST, PORT)) {
            GetBlockDagInfoResponseMessage dagInfo = getBlockDagInfo(client);
            System.out.println(dagInfo);
            System.out.println("Pruning point: " + dagInfo.getPruningPointHash());
        } catch (KaspadRpcException exception) {
            System.err.println(exception.getMessage());
            if (exception.getCause() != null) {
                System.err.println("Cause: " + exception.getCause().getMessage());
            }
        }
    }

    private static GetBlockDagInfoResponseMessage getBlockDagInfo(RpcClientSession client) {
        KaspadResponse response =
                client.send(
                        KaspadRequest.newBuilder()
                                .setGetBlockDagInfoRequest(
                                        GetBlockDagInfoRequestMessage.getDefaultInstance()));

        if (response.getPayloadCase() != KaspadResponse.PayloadCase.GETBLOCKDAGINFORESPONSE) {
            throw KaspadRpcException.unexpectedResponse(
                    "GetBlockDagInfo", response.getPayloadCase());
        }

        GetBlockDagInfoResponseMessage dagInfoResponse = response.getGetBlockDagInfoResponse();
        if (dagInfoResponse.hasError()) {
            throw KaspadRpcException.rpcError("GetBlockDagInfo", dagInfoResponse.getError());
        }

        return dagInfoResponse;
    }

    private static String env(String key, String defaultValue) {
        String value = System.getenv(key);
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
