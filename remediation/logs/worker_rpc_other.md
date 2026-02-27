# Worker Remediation Log — rpc_other

Date: 2026-02-27
Owner chunk: `remediation/chunks/rpc_other.txt`

## Scope handled
- Fixed all `ISSUE` findings for owned RPC files covered in:
  - `audit/reports/rpc_rest.md`
  - `audit/reports/rpc_grpc_subscriptions.md`
  - `audit/reports/rpc_connecting.md`
  - `audit/reports/rpc_overview.md`
- Resolved `UNVERIFIED` findings by source-backed rewrite, guidance-softening, or removal of unsupported absolutes.
- Edited owned files only.

## Primary source basis used in remediation
- `rusty-kaspa` RPC/client/proto/service code paths cited in the audit reports.
- `audit/kaspa_openapi.json` and `audit/evidence/rpc_rest/*` probes/snippets.
- Official docs references cited in the reports (`kaspa.aspectron.org`, `api.kaspa.org`, nginx docs).

## File-by-file remediation
- `content/docs/rpc/connecting.mdx`
  - Fixed Rust wRPC constructor argument order and `get_block_dag_info()` field usage.
  - Fixed JS/Rust direct-connection examples to use valid response fields (`getInfo()` / `get_info()`).
  - Updated Rust gRPC example to current `GrpcClient::connect(url)` signature.
  - Replaced Python/Go unary gRPC examples with `MessageStream`-based examples.
  - Corrected local-node defaults (gRPC default loopback; wRPC listeners via explicit flags).
  - Removed incorrect fixed NGINX default claim (`768`) and softened operational/error/lifecycle assertions.

- `content/docs/rpc/overview.mdx`
  - Corrected architecture statement: nodes expose wRPC+gRPC; REST is a separate public service.
  - Corrected REST capability from “read-only” to include selected operations (including tx submission).
  - Updated Resolver wording from strict least-loaded to low-load candidate selection.
  - Corrected RPC security note for `Shutdown`/unsafe methods requiring `--unsaferpc`.
  - Softened advisory claims (protocol preference, browser wording, encoding performance, load-balancing wording, rate-limit wording).

- `content/docs/rpc/grpc/overview.mdx`
  - Updated outdated Rust connect example.
  - Replaced Python/Go unary examples with stream-contract examples (`MessageStream`).
  - Clarified auth/TLS posture (no built-in auth; TLS via network/proxy layer).
  - Softened ecosystem/preference language to guidance.

- `content/docs/rpc/grpc/protobuf-schema.mdx`
  - Corrected schema ownership split: `messages.proto` wrappers/service + `rpc.proto` payload/models.
  - Corrected Rust codegen location to gRPC core workspace build path.
  - Updated codegen commands to include both proto files.
  - Softened unsupported versioning-policy absolutes.

- `content/docs/rpc/grpc/streaming.mdx`
  - Corrected service signature to `KaspadRequest` / `KaspadResponse`.
  - Corrected dispatch guidance to inspect `payload` on `KaspadResponse`.
  - Updated Rust notification example to use `Scope::*` and current connect usage.
  - Updated Python stream example to use `KaspadRequest` wrappers (not `KaspadMessage`).
  - Corrected catch-up method naming (`getSinkBlueScore`).
  - Softened non-deterministic backpressure/performance absolutes.

- `content/docs/rpc/rest/addresses.mdx`
  - Corrected `/full-transactions-page` parameters (`before`/`after`, `limit` default 50; removed `page`).
  - Corrected pagination model (array response + cursor headers such as `x-next-page-before`).
  - Replaced invalid comma-separated multi-address path usage with POST `/addresses/balances` and `/addresses/utxos`.
  - Corrected validation semantics to `422` + `detail` body shape.
  - Updated stale type example (`utxoEntry.blockDaaScore` string).
  - Softened unsupported public rate-limit specifics.

- `content/docs/rpc/rest/blocks.mdx`
  - Corrected `lowHash` semantics to inclusive behavior.
  - Corrected `includeBlocks` default to `false`.
  - Updated stale field typing examples/descriptions (string-encoded timestamp/nonce/daaScore/blueScore).
  - Removed unsupported `verboseData.isHeaderOnly` documentation from this REST page.
  - Corrected error table to include `422` validation behavior.
  - Softened unsupported serialization internals claim.

- `content/docs/rpc/rest/network-info.mdx`
  - Corrected `/info/hashrate` query param to `stringOnly` (not `windowSize`).
  - Corrected hashrate unit to TH/s and documented string response mode.
  - Added `422` validation behavior to error section.
  - Softened unsupported fee sufficiency claim.
  - Clarified `/info/network` alias/deprecation status.

- `content/docs/rpc/rest/transactions.mdx`
  - Corrected validation semantics (`422` for invalid transaction-id format).
  - Updated `mass` documentation to allow `null` values.
  - Trimmed unsupported error statuses and aligned to observed/spec-backed status set.
  - Softened explanatory “mass/fees” language to avoid overstating strict endpoint contracts.

- `content/docs/rpc/rest/virtual-chain.mdx`
  - Replaced non-existent `/virtual-chain-from-block/{startHash}` REST documentation with current `/virtual-chain` contract.
  - Replaced mismatched chain-delta model (`removed/addedChainBlockHashes`) with actual `VcBlockModel[]` response shape.
  - Replaced incompatible pagination guidance with `blueScoreGte`-based iteration guidance.
  - Removed unsupported reorg-depth assertions.

- `content/docs/rpc/subscriptions/overview.mdx`
  - Corrected catch-up method reference to `getVirtualChainFromBlock`.
  - Softened unsupported polling-cost absolute language.
  - Updated pruning-point subscription use-case wording to match override semantics.

- `content/docs/rpc/subscriptions/finality-conflict.mdx`
  - Corrected finality-depth framing to blue-score-based logic.
  - Added explicit subscribe/unsubscribe coverage for both conflict and resolved events in WASM usage.
  - Softened unsupported frequency/“never occurs” absolutes.

- `content/docs/rpc/subscriptions/new-block-template.mdx`
  - Corrected subscribe response expectations (WASM `Result<()>`, not `{ "error": null }`).
  - Removed unsupported trigger-cause specifics and aligned to template-refresh signal semantics.
  - Softened frequency/latency absolutes.

- `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx`
  - Removed unsupported routine-pruning/deep-reorg trigger claims.
  - Aligned trigger explanation with IBD/reset pruning-point UTXO override flow.
  - Softened unsupported cadence/definition language.

- `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx`
  - Corrected blue-score description away from strict +1 selected-chain framing.
  - Corrected blue-score vs DAA-score comparison language.
  - Removed fixed increment-rate claims.

- `content/docs/rpc/subscriptions/virtual-chain-changed.mdx`
  - Corrected unsubscribe signature to require `includeAcceptedTransactionIds` argument (same value as subscribe).
  - Removed unsupported “typically shallow 1-2 blocks” assertion.

- `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx`
  - Removed incorrect “~1 increment per second” semantics.
  - Reframed DAA score as monotonic consensus clock, not fixed wall-clock mapping.
  - Softened unsupported “most common clock” assertion.

- `content/docs/rpc/subscriptions/utxos-changed.mdx`
  - Softened unverified capacity claim (“hundreds of addresses”) to non-absolute wording.
  - Replaced rigid confirmation-depth advice with explicit confirmation-policy guidance.

- `content/docs/rpc/subscriptions/block-added.mdx`
  - No changes required (no `ISSUE`/`UNVERIFIED` findings to remediate for this page in provided reports).

## Notes
- Worktree contains many unrelated modifications outside this chunk; those were intentionally ignored.
- No unrelated owned-scope files were edited.
