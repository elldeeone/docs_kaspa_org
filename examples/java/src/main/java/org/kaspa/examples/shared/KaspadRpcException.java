package org.kaspa.examples.shared;

import protowire.KaspadResponse;
import protowire.RPCError;

public final class KaspadRpcException extends RuntimeException {
    public KaspadRpcException(String message) {
        super(message);
    }

    public KaspadRpcException(String message, Throwable cause) {
        super(message, cause);
    }

    public static KaspadRpcException rpcError(String operation, RPCError error) {
        return new KaspadRpcException(operation + " failed: " + error.getMessage());
    }

    public static KaspadRpcException unexpectedResponse(
            String operation, KaspadResponse.PayloadCase payloadCase) {
        return new KaspadRpcException(operation + " returned unexpected payload: " + payloadCase);
    }
}
