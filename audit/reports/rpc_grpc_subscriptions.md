# RPC gRPC + Subscriptions Fact-Check Report

Date: 2026-02-27

Scope audited (12 files):
- `content/docs/rpc/grpc/overview.mdx`
- `content/docs/rpc/grpc/protobuf-schema.mdx`
- `content/docs/rpc/grpc/streaming.mdx`
- `content/docs/rpc/subscriptions/block-added.mdx`
- `content/docs/rpc/subscriptions/finality-conflict.mdx`
- `content/docs/rpc/subscriptions/new-block-template.mdx`
- `content/docs/rpc/subscriptions/overview.mdx`
- `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx`
- `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx`
- `content/docs/rpc/subscriptions/utxos-changed.mdx`
- `content/docs/rpc/subscriptions/virtual-chain-changed.mdx`
- `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx`

Primary sources used:
- Local code: `/Users/luke/Projects/rusty-kaspa`
- Local KIPs: `/Users/luke/Projects/kips`
- Official online references (Kaspa docs/whitepaper research + gRPC/tonic docs)

## COVERAGE
- Files audited: **12 / 12**
- Factual claims checked: **136**
- Claim outcomes: **88 VERIFIED / 29 ISSUES / 19 UNVERIFIED**
- File outcomes: **2 VERIFIED / 10 ISSUES / 0 UNVERIFIED**

## File Status Summary

| File | Status | Verified | Issues | Unverified |
|---|---:|---:|---:|---:|
| `content/docs/rpc/grpc/overview.mdx` | **ISSUES** | 9 | 3 | 3 |
| `content/docs/rpc/grpc/protobuf-schema.mdx` | **ISSUES** | 9 | 4 | 1 |
| `content/docs/rpc/grpc/streaming.mdx` | **ISSUES** | 8 | 6 | 2 |
| `content/docs/rpc/subscriptions/block-added.mdx` | **VERIFIED** | 8 | 0 | 0 |
| `content/docs/rpc/subscriptions/finality-conflict.mdx` | **ISSUES** | 5 | 2 | 3 |
| `content/docs/rpc/subscriptions/new-block-template.mdx` | **ISSUES** | 5 | 3 | 2 |
| `content/docs/rpc/subscriptions/overview.mdx` | **ISSUES** | 10 | 1 | 1 |
| `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx` | **ISSUES** | 4 | 3 | 2 |
| `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx` | **ISSUES** | 5 | 4 | 1 |
| `content/docs/rpc/subscriptions/utxos-changed.mdx` | **VERIFIED** | 10 | 0 | 2 |
| `content/docs/rpc/subscriptions/virtual-chain-changed.mdx` | **ISSUES** | 7 | 1 | 1 |
| `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx` | **ISSUES** | 8 | 2 | 1 |

---

## Detailed Findings

### `content/docs/rpc/grpc/overview.mdx` — **ISSUES**

Issues:
1. Rust connect example is outdated (`GrpcClient::connect` with 5 args at docs lines ~87-93). Current API exposes `GrpcClient::connect(url)` or `connect_with_args(...)`. [S7] [S7b]
2. Python and Go examples use unary RPC methods (`GetBlockDagInfo`) that do not exist in Kaspa gRPC service; service exposes only bidirectional `MessageStream`. [S1] [S8]
3. "gRPC does not currently implement authentication or TLS by default" is directionally correct, but the page implies a server-side auth/TLS model without documenting currently exposed server flags or middleware path. TLS/auth implementation details are not present in gRPC server builder path. [S9]

Verified highlights:
- Default gRPC ports (16110/16210/16510/16610) match consensus network defaults. [S5]
- `grpc://` scheme and localhost usage are valid for client connection parsing. [S7]
- Node default bind behavior is loopback when `--rpclisten` is unset. [S6]
- gRPC is HTTP/2 + protobuf; browsers use gRPC-Web rather than native gRPC. [W1] [W2]

Unverified (insufficient authoritative data):
- "Public gRPC endpoints are generally not available".
- Protocol preference claims (e.g., "wRPC is simpler" for Node/mobile) are advisory but not source-verifiable.
- Ecosystem maturity ranking by language (Go/Python/Java/etc.).

### `content/docs/rpc/grpc/protobuf-schema.mdx` — **ISSUES**

Issues:
1. Docs state `messages.proto` defines "all RPC request/response messages". Actual request/response/message bodies are primarily in `rpc.proto`; `messages.proto` wraps request/response oneofs and service definition. [S1] [S2]
2. "Primary file ... defines both service and all request/response message types" is inaccurate for current layout. [S1] [S2]
3. Rust section says `kaspa-grpc-client` compiles protobuf internally via build script. Protobuf build script is in `rpc/grpc/core/build.rs` (not client crate). [S10]
4. Codegen examples compile only `messages.proto`; this is incomplete/ambiguous for non-Rust toolchains because schema also depends on `rpc.proto`. [S1] [S10]

Verified highlights:
- Service definition shown (`MessageStream(stream KaspadRequest) -> stream KaspadResponse`) is correct. [S1]
- `RpcBlock`, `RpcBlockHeader`, `RpcTransaction`, `RpcOutpoint`, `RpcUtxoEntry` fields align with current schema. [S2]
- `RPCError error = 1000` pattern in response messages is accurate. [S2]

Unverified:
- Strong versioning policy statements ("breaking changes only in major versions") are not explicitly codified in repository policy text.

### `content/docs/rpc/grpc/streaming.mdx` — **ISSUES**

Issues:
1. Service signature uses `KaspadMessage` for request/response; current proto uses `KaspadRequest`/`KaspadResponse`. [S1]
2. Notification dispatch guidance references `oneof` in incoming `KaspadMessage`; current incoming stream type is `KaspadResponse` with `payload` oneof. [S1]
3. Rust example uses outdated connect signature and incorrect `start_notify` payload type (`Notification::...` instead of `Scope::...`). [S7] [S11]
4. Python example uses `KaspadMessage` wrapper type not present in current schema (current wrappers are `KaspadRequest`/`KaspadResponse`). [S1]
5. Catch-up method name `getVirtualSelectedParentBlueScore` is not in current RPC API; current method is `get_sink_blue_score()`. [S12]
6. Streaming examples imply per-method unary stubs in generated clients; Kaspa gRPC is single-stream service. [S1] [S8]

Verified highlights:
- Bidirectional single-stream model is correct. [S1] [S8]
- Subscription notification message types listed are present in current proto. [S2]
- Reconnection requirement (connection-scoped subscriptions) is correct. [S13]

Unverified:
- "Single stream has no benefit to multiple streams" as a universal performance claim.
- Suggested backpressure outcomes like "drop subscription" are plausible but not explicitly documented as deterministic behavior.

### `content/docs/rpc/subscriptions/block-added.mdx` — **VERIFIED**

Verified highlights:
- `notifyBlockAdded` subscription exists and event payload includes full `RpcBlock`. [S2] [S14]
- WASM event name `block-added` is correct. [S15]
- 10 BPS statement is consistent with current network blockrate config (`BlockrateParams::new::<10>()`). [S16]

No factual contradictions found.

### `content/docs/rpc/subscriptions/finality-conflict.mdx` — **ISSUES**

Issues:
1. "Finality depth based on DAA score" is inaccurate in current consensus logic; finality point/depth calculations are based on **blue score** depth traversal. [S17]
2. Page implies single `subscribeFinalityConflict()` subscription is sufficient for both conflict and resolved events. This is true for gRPC path due explicit mirroring logic, but not clearly guaranteed for all transports without subscribing to `FinalityConflictResolved` scope. [S18] [S11c] [S19]

Verified highlights:
- Notification payload fields (`violatingBlockHash`, `finalityBlockHash`) match RPC models/proto. [S2] [S14]
- Selected-parent selection by highest blue work is consistent with conflict narrative. [S20]

Unverified:
- "Extremely rare" frequency characterization.
- Operational recommendation "should never occur under normal operation" as an empirical claim.
- Exact 3-step trigger scenario wording is conceptual and not verbatim-specified in source docs.

### `content/docs/rpc/subscriptions/new-block-template.mdx` — **ISSUES**

Issues:
1. Response example (`{"error": null}`) does not match current WASM subscription API shape (`subscribeNewBlockTemplate()` returns `Result<()>`) and RPC model response struct is empty. [S11c] [S14b]
2. Trigger description claims notifications on mempool-entry changes; current emission point located in virtual processor path on virtual-state updates. Mempool-triggered notification path is not evidenced in current code. [S21]
3. Trigger description ties notifications directly to DAA advance as a separate cause; in code the event is emitted during virtual processing cycle rather than dedicated DAA-only trigger. [S21]

Verified highlights:
- `notifyNewBlockTemplate` request/notification types exist. [S2]
- Notification body is empty (`{}`) by schema. [S2] [S14b]
- Event name `new-block-template` and subscribe/unsubscribe methods exist in WASM API. [S15] [S11c]

Unverified:
- Real-world update frequency claims for pool operators.
- End-to-end miner latency impact figures (qualitatively true, not source-quantified here).

### `content/docs/rpc/subscriptions/overview.mdx` — **ISSUES**

Issues:
1. Suggested catch-up method `getVirtualSelectedParentChainFromBlock` does not match current API (`get_virtual_chain_from_block`). [S12]

Verified highlights:
- Connection-scoped subscription lifecycle is correct (drop => re-subscribe required). [S13]
- Listed subscription categories map to current event scopes. [S19]
- WASM event names and SDK methods used in examples are present. [S11] [S15]

Unverified:
- "Polling would be prohibitively expensive" depends on workload and infra constraints.

### `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx` — **ISSUES**

Issues:
1. Page describes routine pruning-point advancement as a trigger; current override notification is documented/emitted for pruning-point UTXO-set override during IBD reset flow. [S22] [S2]
2. "Rare deep reorganizations" trigger is not evidenced in current emission path. [S22]
3. "Node’s pruning point UTXO set is replaced" is correct, but implying regular operational cadence beyond IBD is not currently supported by source evidence. [S22]

Verified highlights:
- Request/notification messages exist and notification payload is empty. [S2] [S14b]
- Event name is correct. [S15]

Unverified:
- "Deepest immutable block" definition phrasing is conceptual and not formalized in cited code comments.
- Frequency claims outside IBD path.

### `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx` — **ISSUES**

Issues:
1. Blue score is described as count of blue blocks in selected parent chain; current GHOSTDAG score update is `selected_parent_blue_score + mergeset_blues.len()`, i.e., not strictly +1 chain-height semantics. [S23]
2. Table claim "increments by 1 per chain block" is inaccurate under current formula. [S23]
3. DAA described as "difficulty-weighted block count" is inaccurate for current `daa_score` computation (`sp_daa_score + mergeset_size - non_daa_count`). [S24]
4. Callout claim "exactly 1" increment per new chain block is inaccurate. [S23]

Verified highlights:
- Subscription and payload field (`sinkBlueScore`) exist. [S2] [S14]
- Event name `sink-blue-score-changed` is correct. [S15]

Unverified:
- Typical increments-per-second claim in live network conditions.

### `content/docs/rpc/subscriptions/utxos-changed.mdx` — **VERIFIED**

Verified highlights:
- `notifyUtxosChanged` request and `UtxosChangedNotification` payload shape (`added`/`removed`) match schema and models. [S2] [S14]
- WASM methods `subscribeUtxosChanged(addresses)` / `unsubscribeUtxosChanged(addresses)` signatures match docs examples. [S11]
- Address add/remove behavior via repeated subscribe/unsubscribe is consistent with compounded subscription logic. [S25]

No factual contradictions found.

Unverified (non-blocking):
- "Hundreds of addresses" is plausible but not a hard protocol guarantee.
- Reorg-depth recommendations are operational guidance.

### `content/docs/rpc/subscriptions/virtual-chain-changed.mdx` — **ISSUES**

Issues:
1. `unsubscribeVirtualChainChanged()` is documented without args, but current WASM signature requires `includeAcceptedTransactionIds: bool` for unsubscribe as well. [S11]

Verified highlights:
- Subscribe signature with `includeAcceptedTransactionIds` matches current API. [S11]
- Notification fields (`removedChainBlockHashes`, `addedChainBlockHashes`, `acceptedTransactionIds`) match schema. [S2] [S14]

Unverified:
- "Reorgs are typically shallow (1-2 blocks)" is empirical, not codified.

### `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx` — **ISSUES**

Issues:
1. "Approximately 1 DAA increment per second" is not generally correct post-Crescendo 10 BPS. KIP-14 explicitly notes DAA score no longer maps directly to seconds after moving to 10 BPS; conversions account for BPS history. [K1] [S16] [S26]
2. Callout claim "fires approximately once per second" is inconsistent with current 10 BPS-era DAA semantics and should be qualified. [K1] [S16]

Verified highlights:
- Subscription and payload field exist (`virtualDaaScore`). [S2] [S14]
- Lock-time threshold claim (`lockTime < 500_000_000_000` interpreted as DAA score) is correct. [S27]
- Coinbase maturity dependence on DAA score is correct. [S28]

Unverified:
- "Most common clock in Kaspa applications" (usage-frequency claim).

---

## Evidence Index

### Local sources (`rusty-kaspa`)
- [S1] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/messages.proto:6-9,73-76,140-141`
- [S2] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto:19-123,337-359,447-459,469-483,505-528,610-644,652-664,727-739`
- [S5] `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:42-48`
- [S6] `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:551` and `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:239-246`
- [S7] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/client/src/lib.rs:87-89,115-125`
- [S7b] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/examples/simple_client/src/main.rs:26-29`
- [S8] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/server/src/connection_handler.rs:237-244`
- [S9] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/server/src/connection_handler.rs:144-150`
- [S10] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/build.rs:2-14`
- [S11] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/client.rs:793-807,821-839,851-869`
- [S11c] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/client.rs:881-912` and `/Users/luke/Projects/rusty-kaspa/rpc/macros/src/wrpc/wasm.rs:160-176`
- [S12] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:245-262,359-367`
- [S13] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/server/src/connection.rs:278-279,333-337`
- [S14] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/model/message.rs:2866-2870,2950-2954,3031-3033,3102-3104,3188-3191,3300-3302,3379-3380`
- [S14b] `/Users/luke/Projects/rusty-kaspa/rpc/core/src/model/message.rs:3430-3451,3474-3476,3500-3523`
- [S15] `/Users/luke/Projects/rusty-kaspa/rpc/wrpc/wasm/src/notify.rs:19-27,53-61`
- [S16] `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:343-345,588,643,684,722`
- [S17] `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/block_depth.rs:55-60,86-90`
- [S18] `/Users/luke/Projects/rusty-kaspa/rpc/grpc/server/src/request_handler/factory.rs:99-123`
- [S19] `/Users/luke/Projects/rusty-kaspa/notify/src/scope.rs:38-47,90-92,139-140`
- [S20] `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:99-105,110-112`
- [S21] `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/virtual_processor/processor.rs:345-350`
- [S22] `/Users/luke/Projects/rusty-kaspa/protocol/flows/src/flow_context.rs:605-609` and `/Users/luke/Projects/rusty-kaspa/protocol/flows/src/ibd/flow.rs:593-603`
- [S23] `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:153`
- [S24] `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/difficulty.rs:31-34`
- [S25] `/Users/luke/Projects/rusty-kaspa/notify/src/subscription/compounded.rs:185-211`
- [S26] `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/virtual_processor/utxo_inquirer.rs:293-295` and `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/coinbase.rs:240-250`
- [S27] `/Users/luke/Projects/rusty-kaspa/consensus/core/src/constants.rs:7` and `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/transaction_validator/tx_validation_in_header_context.rs:50-57`
- [S28] `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/transaction_validator/tx_validation_in_utxo_context.rs:75-87`

### Local KIPs
- [K1] `/Users/luke/Projects/kips/kip-0014.md:49,58-61`

### Official online references
- [W1] gRPC Introduction (HTTP/2 + protobuf): https://grpc.io/docs/what-is-grpc/introduction/
- [W2] gRPC-Web docs (browser transport constraints): https://grpc.io/docs/platforms/web/basics/
- [W3] Kaspa docs (connection-scoped subscription lifecycle): https://kaspa.aspectron.org/docs/category/node-rpc
- [W4] Kaspa docs (RpcClient method signatures incl. `subscribeVirtualChainChanged(includeAcceptedTransactionIds: boolean)`): https://kaspa.aspectron.org/docs/classes/RpcClient
- [W5] GHOSTDAG paper reference page (Kaspa research): https://eprint.iacr.org/2018/104
- [W6] tonic source docs (`max_decoding_message_size` default 4MB): https://docs.rs/tonic-build/latest/src/tonic_build/client.rs.html

