# RPC Other Validation Audit

Date: 2026-02-27
Scope: `remediation/chunks/rpc_other.txt` (19 files)
Primary sources used: `rusty-kaspa` source/proto, `kips`, and `https://api.kaspa.org/openapi.json` (+ live endpoint checks)

## Status Table

| File | Status |
|---|---|
| `content/docs/rpc/connecting.mdx` | UNVERIFIED |
| `content/docs/rpc/grpc/overview.mdx` | VERIFIED |
| `content/docs/rpc/grpc/protobuf-schema.mdx` | ISSUES |
| `content/docs/rpc/grpc/streaming.mdx` | VERIFIED |
| `content/docs/rpc/overview.mdx` | UNVERIFIED |
| `content/docs/rpc/rest/addresses.mdx` | ISSUES |
| `content/docs/rpc/rest/blocks.mdx` | ISSUES |
| `content/docs/rpc/rest/network-info.mdx` | VERIFIED |
| `content/docs/rpc/rest/transactions.mdx` | VERIFIED |
| `content/docs/rpc/rest/virtual-chain.mdx` | VERIFIED |
| `content/docs/rpc/subscriptions/block-added.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/finality-conflict.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/new-block-template.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/overview.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/utxos-changed.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/virtual-chain-changed.mdx` | ISSUES |
| `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx` | ISSUES |

## Counts

- VERIFIED: 5
- ISSUES: 12
- UNVERIFIED: 2
- TOTAL: 19

## Residual ISSUES

1. Subscription raw-request examples use `notify*` JSON calls that do not match current transport contracts.
- Affected files: 
  `content/docs/rpc/subscriptions/block-added.mdx`,
  `content/docs/rpc/subscriptions/finality-conflict.mdx`,
  `content/docs/rpc/subscriptions/new-block-template.mdx`,
  `content/docs/rpc/subscriptions/overview.mdx`,
  `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx`,
  `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx`,
  `content/docs/rpc/subscriptions/utxos-changed.mdx`,
  `content/docs/rpc/subscriptions/virtual-chain-changed.mdx`,
  `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx`.
- Evidence:
  - Docs show JSON like `{"method":"notifyBlockAdded","params":{}}` (for example `block-added.mdx:20`, similar in the other listed files).
  - wRPC server exposes notification control through `Subscribe`/`Unsubscribe` methods (not `Notify*` RPC methods): `rusty-kaspa/rpc/wrpc/server/src/router.rs:82-103`.
  - gRPC `Notify*RequestMessage` contracts require `command` (`NOTIFY_START`/`NOTIFY_STOP`), e.g. `rusty-kaspa/rpc/grpc/core/proto/rpc.proto:189-191` (and similarly `337-340`, `469-470`, `511-515`, `610-611`, `630-631`, `652-653`, `727-728`).

2. Invalid Kaspa address examples (`...kaspadev`) fail API validation.
- Affected files:
  `content/docs/rpc/rest/addresses.mdx`,
  `content/docs/rpc/subscriptions/overview.mdx`,
  `content/docs/rpc/subscriptions/utxos-changed.mdx`.
- Evidence:
  - Invalid address literal appears in docs (e.g. `addresses.mdx:25`, `subscriptions/overview.mdx:54`, `subscriptions/utxos-changed.mdx:16`).
  - Public API path validator requires `^kaspa:[a-z0-9]{61,63}$` for `kaspaAddress` (`api.kaspa.org/openapi.json`, path `/addresses/{kaspaAddress}/...`).
  - Live check: `GET /addresses/<that-address>/balance` returns `422` validation error.

3. Protobuf schema doc uses a non-existent message name.
- Affected file: `content/docs/rpc/grpc/protobuf-schema.mdx`.
- Residual claim:
  - `protobuf-schema.mdx:115` uses `message UtxosByAddressesEntry`.
  - Canonical schema uses `message RpcUtxosByAddressesEntry` (`rusty-kaspa/rpc/grpc/core/proto/rpc.proto:530`).

4. Block endpoint example uses wrong verbose transaction field name.
- Affected file: `content/docs/rpc/rest/blocks.mdx`.
- Residual claim:
  - `blocks.mdx:67` shows `verboseData.mass`.
  - OpenAPI/implementation use `verboseData.computeMass` (`BlockTxVerboseDataModel` in `api.kaspa.org/openapi.json`), and live `/blocks/{hash}` responses return `computeMass`.

## Residual UNVERIFIED Claims

1. Resolver node-selection semantics in connecting page are not provable from available primary sources.
- Affected file: `content/docs/rpc/connecting.mdx`.
- Unverified claim:
  - `connecting.mdx:104` states the Resolver selects from low-load nodes.
- Why unverified:
  - `rusty-kaspa` client code confirms resolver usage, URL resolution, and priority ordering, but not the resolver-side load-selection algorithm itself.

2. PNN operational/governance claims in RPC overview are not provable from the audited primary set.
- Affected file: `content/docs/rpc/overview.mdx`.
- Unverified claims:
  - Contributor coordination/process statements (`overview.mdx:109-116`, `129-132`).
  - Resolver operational policy wording (`overview.mdx:139-143`).
- Why unverified:
  - These are ecosystem/operations claims outside `rusty-kaspa` and `kips` protocol code/specs; no primary operational spec was present in the audited set that normatively defines these behaviors.
