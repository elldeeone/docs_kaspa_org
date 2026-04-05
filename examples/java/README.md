Generate Java gRPC sources and run the Java example:

```bash
gradle -p ./java syncKaspaProto
gradle -p ./java generateProto
gradle -p ./java runGettingStarted
```

If `gradle` is not installed globally, use the wrapper instead:

```bash
./java/gradlew -p ./java syncKaspaProto
./java/gradlew -p ./java generateProto
./java/gradlew -p ./java runGettingStarted
```

The example connects to a node and calls `GetBlockDagInfo`.

By default it connects to `127.0.0.1:16110`.

Optional environment variables:

- `KASPA_GRPC_HOST`
- `KASPA_GRPC_PORT`
