# Fact-Check Report: `content/docs/rpc/connecting.mdx`

Audit date: 2026-02-27

## Status Summary

| File | Status | Verified | Issues | Unverified |
|---|---|---:|---:|---:|
| `content/docs/rpc/connecting.mdx` | **ISSUES** | 26 | 9 | 3 |

## Claim-by-Claim Validation

| Target lines | Claim | Result | Evidence |
|---|---|---|---|
| 8, 14-16 | Mainnet/Testnet port table is correct (`16111/16110/17110/18110`, `16211/16210/17210/18210`, `16311/16210/17210/18210`). | VERIFIED | [RK1] |
| 22-23 | Simnet/Devnet port table is correct (`16511/16510/17510/18510`, `16611/16610/17610/18610`). | VERIFIED | [RK1] |
| 8, 16, 436 | Testnet suffix changes P2P port while RPC ports stay on testnet defaults. | VERIFIED | [RK1] |
| 26 | P2P port is separate from RPC client ports. | VERIFIED | [RK1] |
| 31-37 | `--rpclisten`, `--rpclisten-borsh`, `--rpclisten-json` are valid kaspad args for gRPC/wRPC listeners. | VERIFIED | [RK2] |
| 39, 43, 46, 49 | Binding to `127.0.0.1/localhost` vs `0.0.0.0` is valid; custom ports are valid. | VERIFIED | [RK2] |
| 56-73 | wRPC uses WebSocket transport (`ws://` / `wss://`). | VERIFIED | [OD1] |
| 77-84 | gRPC URL form `grpc://<host>:<port>` and mainnet default `16110` are correct. | VERIFIED | [RK1], [RK7] |
| 88-93 | `https://api.kaspa.org` is a live public REST service. | VERIFIED | [API1] |
| 98-100, 189-200 | URL priority `connect(url)` > constructor URL > Resolver is correct. | VERIFIED | [RK4] |
| 104, 164-165, 517 | Resolver provides load balancing/failover behavior. | VERIFIED | [RK10], [OD1] |
| 104 | Resolver chooses the least-loaded node (fewest active connections). | VERIFIED | [OD1] |
| 118-121 | JS `getBlockDagInfo()` fields `network` and `virtualDaaScore` are valid. | VERIFIED | [RK6] |
| 144-150 | Rust resolver example constructor arguments are correct. | ISSUE | `KaspaRpcClient::new` expects `(encoding, url, resolver, network_id, ...)`; doc example passes resolver in URL slot. [RK5] |
| 155 | Rust resolver example field `info.network_name` is valid for `get_block_dag_info()`. | ISSUE | `GetBlockDagInfoResponse` has `network`, not `network_name`. [RK6] |
| 164-165, 517 | Resolver-based reconnect/re-resolve behavior is documented and supported. | VERIFIED | [RK15], [OD1], [RK4] |
| 183-184 | JS direct-URL example uses correct field `info.serverVersion` from `getBlockDagInfo()`. | ISSUE | `getBlockDagInfo()` response has no `serverVersion`; that field is in `getInfo()`/`getServerInfo()`. [RK6], [RK9] |
| 189-200 | JS `connect({ url })` override behavior is correct. | VERIFIED | [RK4] |
| 220-221 | Rust direct-URL example field `info.server_version` from `get_block_dag_info()` is valid. | ISSUE | `GetBlockDagInfoResponse` has no `server_version`. [RK6] |
| 242-244 | Rust `ConnectOptions { url: ... }` for connect-time override is valid. | VERIFIED | [RK4] |
| 251 | Public gRPC endpoints are generally not exposed via PNN/Resolver. | VERIFIED | Resolver queries `/wrpc/...` endpoints; no gRPC resolver path. [RK10] |
| 261-267 | Rust gRPC example `GrpcClient::connect(url, ...)` signature is valid. | ISSUE | Current `GrpcClient::connect` takes only `url`; advanced args use `connect_with_args(...)`. [RK7] |
| 281-294 | Python generated gRPC stub exposes unary `GetBlockDagInfo` as used in example. | ISSUE | Kaspa gRPC service defines only bidirectional `MessageStream`; unary RPC method does not exist in proto service. [RK8] |
| 314-336 | Go generated gRPC client exposes unary `GetBlockDagInfo` as used in example. | ISSUE | Same service-shape issue: only `MessageStream` is defined. [RK8] |
| 297 | `.proto` location in `rusty-kaspa/rpc/grpc/core/proto` is correct. | VERIFIED | [RK14] |
| 345, 348, 351 | REST sample endpoints (`/info/coinsupply`, `/addresses/{...}/balance`, `/blocks/{...}`) exist. | VERIFIED | [API2] |
| 358 | “RPC is enabled by default on localhost” (for local node). | ISSUE | gRPC defaults to loopback, but wRPC listeners default to `None` and are only started when args are provided. [RK3], [RK2] |
| 358 | `GetSyncStatus` / `GetInfo` exist for sync verification. | VERIFIED | [RK9] |
| 374 | RPC has no built-in authentication. | VERIFIED | [OD1] |
| 379-383 | Kaspa RPC has no native TLS endpoint config; reverse proxy/tunnel/VPN is required for encrypted remote exposure. | VERIFIED | [RK2], [RK12], [RK13] |
| 436-448 | Testnet-11 wRPC ports matching testnet-10 (with different P2P) is correct. | VERIFIED | [RK1] |
| 459 | “Default NGINX allows 768 simultaneous connections per CPU core.” | ISSUE | NGINX core directive default for `worker_connections` is `512` (not `768`) in official docs. [NG1] |
| 468-473 | Mainnet Borsh/JSON ports and “same methods/logical data” claim are correct. | VERIFIED | [RK1], [RK3] |
| 481-484 | Network identifiers/prefixes shown (`mainnet`, `testnet-10`, `testnet-11`, `simnet` with prefixes) are correct. | VERIFIED | [RK11], [RK1] |
| 507-518 | JS disconnect event usage and resolver-reconnect behavior are valid. | VERIFIED | [RK15], [RK10] |
| 522-527 | Common error table (cause/resolution mapping) is fully source-backed. | UNVERIFIED | Operational guidance is plausible but not explicitly specified in primary sources. |
| 531-536 | Lifecycle specifics (immediate ready state; no auth handshake; ping keepalive through proxies/firewalls) are fully source-backed. | UNVERIFIED | No single primary source states this lifecycle contract end-to-end. `Ping` exists, but keepalive recommendation is not explicitly specified. [RK9] |
| 543-546 | `getInfo()` fields `serverVersion`, `isSynced`, `isUtxoIndexed` are valid. | VERIFIED | [RK6], [RK9] |
| 554 | “Unsynced node may return stale/incomplete data” is explicitly documented in primary sources. | UNVERIFIED | Plausible and likely true, but no direct normative statement found in the checked primary sources. |

## Primary Sources Used

- `rusty-kaspa` codebase (ports, args, RPC API/model, resolver/client behavior)
- `kips` repository scan for RPC-connection-specific normative content (none found specific to this file’s connection details)
- Official Kaspa docs in this docs repo (`rpc/overview.mdx`) for PNN/resolver/auth statements
- Official live REST/OpenAPI at `api.kaspa.org`
- Official NGINX directive docs for `worker_connections` default

## Evidence Index

- [RK1] `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:42`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:51`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:60`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:238`
- [RK2] `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:102`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:107`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:126`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:239`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:249`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:261`
- [RK3] `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:551`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:724`
- [RK4] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/client.rs:231`, `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/client.rs:433`, `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/client.rs:442`
- [RK5] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/client.rs:280`
- [RK6] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/model/message.rs:1043`, `/Users/luke/Projects/rusty-kaspa/rpc/core/src/wasm/message.rs:161`, `/Users/luke/Projects/rusty-kaspa/rpc/core/src/wasm/message.rs:267`
- [RK7] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/client/src/lib.rs:87`, `/Users/luke/Projects/rusty-kaspa/rpc/grpc/client/src/lib.rs:115`, `/Users/luke/Projects/rusty-kaspa/rpc/grpc/client/src/lib.rs:125`
- [RK8] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/messages.proto:140`
- [RK9] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:26`, `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:96`, `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:384`
- [RK10] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/resolver.rs:87`, `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/client/src/resolver.rs:143`
- [RK11] `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:86`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:306`
- [RK12] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/server/src/service.rs:19`
- [RK13] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/server/src/connection_handler.rs:144`
- [RK14] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/messages.proto`, `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto`
- [RK15] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/client.rs:379`
- [OD1] `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/overview.mdx:18`, `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/overview.mdx:135`, `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/overview.mdx:229`
- [API1] `/Users/luke/Projects/docs_kaspa_org/audit/evidence/api_kaspa_http_status_2026-02-27.txt:1`
- [API2] `/Users/luke/Projects/docs_kaspa_org/audit/evidence/api_kaspa_openapi_paths_2026-02-27.txt:9`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/api_kaspa_openapi_paths_2026-02-27.txt:18`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/api_kaspa_openapi_paths_2026-02-27.txt:21`
- [NG1] https://nginx.org/en/docs/ngx_core_module.html#worker_connections (default `worker_connections 512;`)
- [KIP1] `/Users/luke/Projects/docs_kaspa_org/audit/evidence/kips_rpc_scan_2026-02-27.txt:11`

