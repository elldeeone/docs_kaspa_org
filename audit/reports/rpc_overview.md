# RPC Overview Fact-Check Report

Date: 2026-02-27

Scope audited:
- `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/overview.mdx`

Primary sources used:
- `/Users/luke/Projects/rusty-kaspa`
- `/Users/luke/Projects/kips` (no RPC-specific claims found)
- Official Kaspa docs (kaspa.aspectron.org + docs_kaspa_org)
- Live endpoint checks (`api.kaspa.org`, `pnn.kaspa.stream`)

Coverage summary:
- Claims checked: 72
- Outcome: 55 VERIFIED / 4 ISSUES / 13 UNVERIFIED
- File status: ISSUES

## Claim-Level Findings

1. `overview.mdx:8` Kaspa nodes expose RPC for querying chain state, submitting transactions, subscriptions, and node operations.  
Status: VERIFIED.  
Evidence: [E1], [E2].  
Suggested fix: Keep as-is.

2. `overview.mdx:8` RPC layer sits between applications and consensus/mempool engines.  
Status: VERIFIED.  
Evidence: [E3].  
Suggested fix: Keep as-is.

3. `overview.mdx:10` "Three protocols are available for interacting with a Kaspa node: wRPC, gRPC, REST."  
Status: ISSUES.  
Evidence: official node docs describe Rusty Kaspa node protocols as gRPC+wRPC; REST is a separate public API service (`api.kaspa.org`) [E5], [E41].  
Suggested fix: Replace with "Kaspa nodes expose wRPC and gRPC; a separate public REST service (`api.kaspa.org`) provides HTTP endpoints backed by node data."

4. `overview.mdx:16` wRPC is Rust-developed by Kaspa team and built on WebSockets.  
Status: VERIFIED.  
Evidence: [E4], [E5].  
Suggested fix: Keep as-is.

5. `overview.mdx:16` wRPC is full-duplex and supports server push without polling.  
Status: VERIFIED.  
Evidence: [E1], [E6].  
Suggested fix: Keep as-is.

6. `overview.mdx:16` All RPC methods are available over wRPC.  
Status: VERIFIED.  
Evidence: wRPC router registers full RPC method set [E6], mirrored from RPC ops [E2].  
Suggested fix: Keep as-is.

7. `overview.mdx:18` wRPC transport is `ws://` / `wss://`.  
Status: VERIFIED.  
Evidence: URL parsing/scheme selection logic [E7].  
Suggested fix: Keep as-is.

8. `overview.mdx:19` wRPC supports Borsh and JSON encodings.  
Status: VERIFIED.  
Evidence: [E4], [E7].  
Suggested fix: Keep as-is.

9. `overview.mdx:20` wRPC supports real-time subscription notifications.  
Status: VERIFIED.  
Evidence: subscribe/unsubscribe ops + notification ops [E2], router methods [E6].  
Suggested fix: Keep as-is.

10. `overview.mdx:21` wRPC fully integrated with Rust/WASM SDKs including Resolver-based balancing.  
Status: VERIFIED.  
Evidence: [E5], [E12], [E14], [E20].  
Suggested fix: Keep as-is.

11. `overview.mdx:22` "Best for most applications" recommendation list.  
Status: UNVERIFIED.  
Evidence: advisory statement, not protocol truth test.  
Suggested fix: Mark as guidance/opinion (e.g., "typically used for...").

12. `overview.mdx:26` gRPC uses HTTP/2 + protobuf and is strongly typed.  
Status: VERIFIED.  
Evidence: Kaspa gRPC proto/tonic stack [E9], [E10], [E16], plus gRPC official intro [E35].  
Suggested fix: Keep as-is.

13. `overview.mdx:30` gRPC subscriptions are supported via streaming gRPC.  
Status: VERIFIED.  
Evidence: bidirectional `MessageStream` service + notify request messages [E9], [E10].  
Suggested fix: Keep as-is.

14. `overview.mdx:31` "Best for server-to-server / backend ecosystems" recommendation.  
Status: UNVERIFIED.  
Evidence: ecosystem ranking is advisory.  
Suggested fix: Prefix as recommendation ("often preferred").

15. `overview.mdx:34` Rusty Kaspa uses streaming gRPC that can be incompatible with some routing infra.  
Status: VERIFIED.  
Evidence: explicit official docs statement [E5].  
Suggested fix: Keep as-is.

16. `overview.mdx:34` Much gRPC payload data is hex/string serialized, reducing protobuf efficiency gains.  
Status: VERIFIED.  
Evidence: official docs + proto/convert code use many string/hex fields [E5], [E10], [E11].  
Suggested fix: Keep as-is.

17. `overview.mdx:34` gRPC has no WASM SDK integration.  
Status: VERIFIED.  
Evidence: official docs + WASM exports are wRPC-oriented [E5], [E12].  
Suggested fix: Keep as-is.

18. `overview.mdx:39` REST API is "read-only".  
Status: ISSUES.  
Evidence: OpenAPI includes write-like POST endpoints, including `POST /transactions` ("Submit A New Transaction") [E27], and REST docs include `POST /transactions` submission [E44].  
Suggested fix: Replace with "public HTTP API for lightweight queries and selected operations (including transaction submission)."

19. `overview.mdx:39` REST wraps a subset of RPC methods behind HTTP endpoints.  
Status: VERIFIED.  
Evidence: endpoint set is partial and not 1:1 with full node RPC API [E26], [E27].  
Suggested fix: Keep as-is.

20. `overview.mdx:41` REST transport is HTTPS.  
Status: VERIFIED.  
Evidence: REST base URL docs and live endpoint [E41], [E27].  
Suggested fix: Keep as-is.

21. `overview.mdx:42` REST encoding is JSON.  
Status: VERIFIED.  
Evidence: live endpoint content-type and OpenAPI schema [E27].  
Suggested fix: Keep as-is.

22. `overview.mdx:43` REST is suitable for browser tools requiring CORS.  
Status: VERIFIED.  
Evidence: `access-control-allow-origin: *` from live check [E27].  
Suggested fix: Keep as-is.

23. `overview.mdx:43` "Best for simple queries/quick prototyping" recommendation.  
Status: UNVERIFIED.  
Evidence: advisory categorization.  
Suggested fix: Keep as guidance language.

24. `overview.mdx:50` Real-time monitoring/subscriptions are best served by wRPC push model.  
Status: VERIFIED.  
Evidence: wRPC notification model and subscription ops [E2], [E6].  
Suggested fix: Keep as-is.

25. `overview.mdx:51` "WebSocket support in all browsers."  
Status: UNVERIFIED.  
Evidence: no browser-compat matrix cited in source set.  
Suggested fix: Change to "modern browsers" or cite MDN compatibility table.

26. `overview.mdx:52-53` gRPC as high-performance and ecosystem maturity recommendation.  
Status: UNVERIFIED.  
Evidence: no Kaspa benchmark or comparative data cited.  
Suggested fix: qualify as "typically" and avoid performance absolutes without benchmark links.

27. `overview.mdx:54` REST simple balance/UTXO lookups with no SDK required.  
Status: VERIFIED.  
Evidence: REST GET endpoints for balances/UTXOs and direct HTTP usage [E41], [E26].  
Suggested fix: Keep as-is.

28. `overview.mdx:55` Mining software can use wRPC or gRPC for block-template subscriptions.  
Status: VERIFIED.  
Evidence: `NotifyNewBlockTemplate` exists in both transport models [E2], [E10].  
Suggested fix: Keep as-is.

29. `overview.mdx:58` "wRPC is recommended for most applications."  
Status: UNVERIFIED.  
Evidence: recommendation/policy statement.  
Suggested fix: keep as recommendation language, not objective fact.

30. `overview.mdx:58` wRPC provides access to all RPC methods.  
Status: VERIFIED.  
Evidence: [E6], [E2].  
Suggested fix: Keep as-is.

31. `overview.mdx:58` wRPC works in Node.js and browsers via WASM SDK.  
Status: VERIFIED.  
Evidence: WASM SDK and Node/browser guidance [E12], [E13].  
Suggested fix: Keep as-is.

32. `overview.mdx:59` JSON mode eases third-party integration.  
Status: VERIFIED.  
Evidence: official protocol docs call out JSON-RPC-like framing for third-party use [E5].  
Suggested fix: Keep as-is.

33. `overview.mdx:63` wRPC supports two encodings on separate ports.  
Status: VERIFIED.  
Evidence: network default port functions + CLI args [E8], [E33].  
Suggested fix: Keep as-is.

34. `overview.mdx:65` "Borsh is faster to serialize/deserialize" performance claim.  
Status: UNVERIFIED.  
Evidence: no benchmark in source set.  
Suggested fix: add benchmark citation or soften to "typically more compact and often faster than JSON."

35. `overview.mdx:65` Borsh is native/default in Rust/WASM SDK usage paths.  
Status: VERIFIED.  
Evidence: SDK docs and defaults [E12], [E13], [E42].  
Suggested fix: Keep as-is.

36. `overview.mdx:66` JSON is human-readable and JSON-RPC-like over WebSocket.  
Status: VERIFIED.  
Evidence: official protocol docs [E5].  
Suggested fix: Keep as-is.

37. `overview.mdx:66` "JSON preferred" recommendation for dev/browser/third-party.  
Status: UNVERIFIED.  
Evidence: preference is context-dependent.  
Suggested fix: present as tradeoff guidance rather than universal preference.

38. `overview.mdx:68` Both encodings expose identical methods/logical data; only wire format/port differ.  
Status: VERIFIED.  
Evidence: same API ops and shared server interface, encoding-dependent transport layer [E2], [E6], [E7].  
Suggested fix: Keep as-is.

39. `overview.mdx:74` WASM SDK compiles core Rust code to WebAssembly with JS/TS API surface.  
Status: VERIFIED.  
Evidence: WASM crate docs and exports [E12], [E13].  
Suggested fix: Keep as-is.

40. `overview.mdx:76-79` WASM SDK includes `RpcClient`, `Resolver`, wallet/tx/subscription capabilities.  
Status: VERIFIED.  
Evidence: WASM exports and resolver/client bindings [E12], [E13], [E14].  
Suggested fix: Keep as-is.

41. `overview.mdx:81` `npm install kaspa-wasm` availability claim.  
Status: VERIFIED.  
Evidence: live npm registry check [E27].  
Suggested fix: Keep as-is.

42. `overview.mdx:88-94` Rust SDK provides `KaspaRpcClient`, `GrpcClient`, shared `RpcApi`, and resolver usage.  
Status: VERIFIED.  
Evidence: workspace crates and client traits/deps [E15], [E16], [E17], [E18].  
Suggested fix: Keep as-is.

43. `overview.mdx:99` Python SDK is PyO3/Rust-backed and supports RPC/wallet/tx operations.  
Status: VERIFIED.  
Evidence: official Python SDK docs + PyPI metadata linking Rust-backed package lineage [E43], [E27].  
Suggested fix: Keep as-is.

44. `overview.mdx:105` `.proto` files can be used for multi-language client codegen, and are located under `rpc/grpc/core/proto`.  
Status: VERIFIED.  
Evidence: official clients docs + repository proto files [E20], [E10].  
Suggested fix: Keep as-is.

45. `overview.mdx:105` "This enables clients for Go, Java, C#, C++, and other languages."  
Status: UNVERIFIED.  
Evidence: no Kaspa-maintained generated client list in sources; capability is general gRPC property.  
Suggested fix: change to "can be generated for languages supported by protobuf/gRPC tooling."

46. `overview.mdx:109` PNN is a contributor-driven public node initiative.  
Status: VERIFIED.  
Evidence: [E21].  
Suggested fix: Keep as-is.

47. `overview.mdx:109` PNN nodes are run by independent contributors coordinating via Telegram/Discord.  
Status: VERIFIED.  
Evidence: [E21].  
Suggested fix: Keep as-is.

48. `overview.mdx:113-114` PNN uses dedicated VPS (typically Debian/Ubuntu) and kHOST deployment automation.  
Status: VERIFIED.  
Evidence: [E21], [E23], [E45].  
Suggested fix: Keep as-is.

49. `overview.mdx:115` Resolver monitors PNN nodes and distributes connections by load.  
Status: VERIFIED.  
Evidence: PNN/Resolver docs + resolver monitor implementation [E21], [E22], [E38], [E39].  
Suggested fix: Keep as-is.

50. `overview.mdx:116` PNN status page is `pnn.kaspa.stream`.  
Status: VERIFIED.  
Evidence: docs + live 200 check [E21], [E27].  
Suggested fix: Keep as-is.

51. `overview.mdx:126` PNN is best-effort; high-value production should run own node.  
Status: VERIFIED.  
Evidence: official PNN guidance [E21].  
Suggested fix: Keep as-is.

52. `overview.mdx:131` PNN contributor onboarding via Discord `#development`.  
Status: VERIFIED.  
Evidence: [E21].  
Suggested fix: Keep as-is.

53. `overview.mdx:135` Resolver is an ALB and foundational PNN infrastructure.  
Status: VERIFIED.  
Evidence: [E22], [E21].  
Suggested fix: Keep as-is.

54. `overview.mdx:139-140` Resolver maintains node registry and tracks node health/connection state.  
Status: VERIFIED.  
Evidence: docs + resolver monitor/connections model [E22], [E38], [E39].  
Suggested fix: Keep as-is.

55. `overview.mdx:141` Resolver returns strictly the least-loaded node.  
Status: ISSUES.  
Evidence: resolver implementation does weighted-random selection over load-sorted nodes, not strict argmin selection [E40], [E38].  
Suggested fix: Replace with "returns a node selected from lowest-load candidates (load-biased selection)."

56. `overview.mdx:142-143,159` Failover behavior: client can re-query resolver and reconnect to another node when one fails.  
Status: VERIFIED.  
Evidence: resolver docs and SDK resolver usage model [E22], [E14], [E18].  
Suggested fix: Keep as-is.

57. `overview.mdx:146-157` Resolver is directly integrated in Rust and WASM SDK client configuration.  
Status: VERIFIED.  
Evidence: [E14], [E17], [E20].  
Suggested fix: Keep as-is.

58. `overview.mdx:163` Resolver supports private/custom clusters.  
Status: VERIFIED.  
Evidence: official resolver docs + custom URLs in resolver constructor [E22], [E18], [E14].  
Suggested fix: Keep as-is.

59. `overview.mdx:165` Resolver source code is at `github.com/aspectron/kaspa-resolver`.  
Status: VERIFIED.  
Evidence: [E22], [E46].  
Suggested fix: Keep as-is.

60. `overview.mdx:169-177` Proxy/NGINX usage claims (fronting nodes, path routing, TLS termination for WSS, multi-network mapping).  
Status: VERIFIED.  
Evidence: official proxies docs and examples [E25].  
Suggested fix: Keep as-is.

61. `overview.mdx:174` "Load balancing across multiple nodes" in this section.  
Status: UNVERIFIED.  
Evidence: provided NGINX example shows path routing, not an upstream LB configuration.  
Suggested fix: either add an explicit NGINX upstream load-balancing example or soften to "can be configured for load balancing."

62. `overview.mdx:179` "Default NGINX config allows 768 simultaneous connections per CPU core."  
Status: UNVERIFIED.  
Evidence: Kaspa docs repeat this value, but node code reads `worker_connections` dynamically from nginx.conf and does not enforce fixed default [E25], [E34].  
Suggested fix: qualify as environment-specific (e.g., "common Debian/Ubuntu default is often 768 worker_connections per worker").

63. `overview.mdx:184` kHOST is a Rust deployment automation tool used by PNN contributors.  
Status: VERIFIED.  
Evidence: [E23], [E45].  
Suggested fix: Keep as-is.

64. `overview.mdx:190` Two methods to verify RPC availability (CLI wallet and Kaspa NG desktop).  
Status: VERIFIED.  
Evidence: [E24].  
Suggested fix: Keep as-is.

65. `overview.mdx:193-197` CLI check commands `network mainnet`, `connect localhost`, `rpc get-info` are valid.  
Status: VERIFIED.  
Evidence: official availability doc and CLI command implementations [E24], [E47], [E48], [E49].  
Suggested fix: Keep as-is.

66. `overview.mdx:199-203` Online Kaspa NG cannot connect local non-SSL RPC due browser restrictions; desktop can.  
Status: VERIFIED.  
Evidence: [E24].  
Suggested fix: Keep as-is.

67. `overview.mdx:207-219` Public-vs-own-node bullet lists are operational recommendations.  
Status: UNVERIFIED.  
Evidence: advisory guidance (not protocol invariants).  
Suggested fix: keep as recommendation language.

68. `overview.mdx:222-224` wRPC subscription model is full-duplex push, includes block/UTXO/virtual-chain updates, and uses paired subscribe/unsubscribe calls.  
Status: VERIFIED.  
Evidence: [E1], [E2], [E6], [E10].  
Suggested fix: Keep as-is.

69. `overview.mdx:229` Kaspa RPC has no built-in authentication mechanism.  
Status: VERIFIED.  
Evidence: security docs statement + no auth config/handshake implementation in node RPC path [E24], [E29], [E32].  
Suggested fix: Keep as-is.

70. `overview.mdx:229` "Any reachable client can issue any command, including `Shutdown`" (default behavior).  
Status: ISSUES.  
Evidence: `Shutdown` and other state-changing calls are blocked in safe mode unless node is started with `--unsaferpc` [E29], [E30].  
Suggested fix: Replace with "any reachable client can issue exposed RPC calls; state-changing calls (e.g., `Shutdown`) require `--unsaferpc`."

71. `overview.mdx:234-237` Security mitigations (firewall/VPN/loopback bind/reverse proxy TLS) are valid.  
Status: VERIFIED.  
Evidence: node bind flags and security guidance [E31], [E33], [E24].  
Suggested fix: Keep as-is.

72. `overview.mdx:241` No RPC-layer rate limiting in kaspad + public infra may impose separate limits.  
Status: UNVERIFIED.  
Evidence: no explicit kaspad RPC rate-limit control surfaced beyond max-client limits; no definitive public limit policy docs captured [E33], [E38], [E27].  
Suggested fix: split into two qualified statements: "kaspad exposes max-client limits (not request-rate quotas)" and "public service rate limits may apply; check service docs/status."

## Evidence Index

- [E1] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:24-31,117-133,207-215,506-526`
- [E2] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/ops.rs:27-42,58-143`
- [E3] `/Users/luke/Projects/rusty-kaspa/rpc/service/src/service.rs:669-676`
- [E4] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/lib.rs:4-7`
- [E5] `https://kaspa.aspectron.org/rpc/protocols.html`
- [E6] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/server/src/router.rs:30-80,82-102`
- [E7] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/client.rs:518-536`
- [E8] `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:42-67`
- [E9] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/messages.proto:140-141`
- [E10] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto:19-123,130-133,337-352,505-528,723-739`
- [E11] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/src/convert/tx.rs:18,41,117,201,237,252`
- [E12] `/Users/luke/Projects/rusty-kaspa/wasm/src/lib.rs:28-31,165-178,214-221`
- [E13] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/client.rs:252-257,281-299,919-973`
- [E14] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/resolver.rs:92-100,132-143,155-167`
- [E15] `/Users/luke/Projects/rusty-kaspa/Cargo.toml:101,135,261`
- [E16] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/client/Cargo.toml:2-3,41`
- [E17] `/Users/luke/Projects/rusty-kaspa/wallet/core/src/rpc.rs:8-12,14-25`
- [E18] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/resolver.rs:2,85-90,143,169-178`
- [E19] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/Resolvers.toml:5-20`
- [E20] `https://kaspa.aspectron.org/rpc/clients.html`
- [E21] `https://kaspa.aspectron.org/rpc/pnn.html`
- [E22] `https://kaspa.aspectron.org/rpc/kaspa-resolver.html`
- [E23] `https://kaspa.aspectron.org/rpc/khost.html`
- [E24] `https://kaspa.aspectron.org/rpc/availability.html`
- [E25] `https://kaspa.aspectron.org/rpc/proxies.html`
- [E26] `/Users/luke/Projects/docs_kaspa_org/audit/kaspa_openapi.json`
- [E27] `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_overview_live_checks.md:5-55`
- [E29] `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:109,271`
- [E30] `/Users/luke/Projects/rusty-kaspa/rpc/service/src/service.rs:1050-1054`
- [E31] `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:551`
- [E32] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/server/src/service.rs:73-83`
- [E33] `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:239-269,320-327`
- [E34] `/Users/luke/Projects/rusty-kaspa/utils/src/sysinfo.rs:98-106`
- [E35] `https://grpc.io/docs/what-is-grpc/introduction/`
- [E38] `https://raw.githubusercontent.com/aspectron/kaspa-resolver/master/src/monitor.rs`
- [E39] `https://raw.githubusercontent.com/aspectron/kaspa-resolver/master/src/connection.rs`
- [E40] `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_overview_resolver_selection.md:5-27`
- [E41] `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/addresses.mdx:8-12`
- [E42] `/Users/luke/Projects/rusty-kaspa/wasm/README.md:105-107`
- [E43] `/Users/luke/Projects/docs_kaspa_org/content/docs/sdks/python-sdk.mdx:8-12,45` and `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_overview_live_checks.md:48-55`
- [E44] `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/transactions.mdx:78-86,121-127`
- [E45] `https://raw.githubusercontent.com/aspectron/khost/master/README.md`
- [E46] `https://api.github.com/repos/aspectron/kaspa-resolver`
- [E47] `/Users/luke/Projects/rusty-kaspa/cli/src/modules/network.rs:11-15`
- [E48] `/Users/luke/Projects/rusty-kaspa/cli/src/modules/connect.rs:13-25`
- [E49] `/Users/luke/Projects/rusty-kaspa/cli/src/modules/rpc.rs:215-217`

