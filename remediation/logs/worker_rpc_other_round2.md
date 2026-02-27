# Worker Remediation Log — rpc_other (Round 2)

Date: 2026-02-27
Owner chunk: `remediation/chunks/rpc_other.txt`
Residual input: `remediation/validation_rpc_other.md`

## Scope handled
- Eliminated all remaining `ISSUES` listed in the residual report.
- Resolved all remaining `UNVERIFIED` claims by rewriting with source-backed or explicitly non-normative wording.
- Edited owned files only.

## Source basis used
- `rusty-kaspa/rpc/wrpc/server/src/router.rs` (`RpcApiOps::Subscribe` / `RpcApiOps::Unsubscribe` handling)
- `rusty-kaspa/rpc/grpc/core/proto/rpc.proto` (`RpcNotifyCommand`, `Notify*RequestMessage.command` semantics)
- `rusty-kaspa/rpc/grpc/core/proto/rpc.proto` (`message RpcUtxosByAddressesEntry`)
- `https://api.kaspa.org/openapi.json` (`kaspaAddress` regex, `BlockTxVerboseDataModel.computeMass`)

## Remediation summary by residual item

1. Subscription raw-request contract mismatch (`notify*` JSON examples)
- Updated files:
  - `content/docs/rpc/subscriptions/block-added.mdx`
  - `content/docs/rpc/subscriptions/finality-conflict.mdx`
  - `content/docs/rpc/subscriptions/new-block-template.mdx`
  - `content/docs/rpc/subscriptions/overview.mdx`
  - `content/docs/rpc/subscriptions/pruning-point-utxo-set-override.mdx`
  - `content/docs/rpc/subscriptions/sink-blue-score-changed.mdx`
  - `content/docs/rpc/subscriptions/utxos-changed.mdx`
  - `content/docs/rpc/subscriptions/virtual-chain-changed.mdx`
  - `content/docs/rpc/subscriptions/virtual-daa-score-changed.mdx`
- Changes:
  - Removed incorrect raw JSON examples using `"method": "notify..."`.
  - Replaced with transport-accurate contract notes:
    - wRPC JSON: `subscribe` / `unsubscribe` with `Scope` payload.
    - gRPC: `Notify*RequestMessage` with `command = NOTIFY_START | NOTIFY_STOP`.
  - Updated overview lifecycle/table wording to SDK subscription methods and transport-aware notes.

2. Invalid Kaspa address examples (`...kaspadev`)
- Updated files:
  - `content/docs/rpc/rest/addresses.mdx`
  - `content/docs/rpc/subscriptions/overview.mdx`
  - `content/docs/rpc/subscriptions/utxos-changed.mdx`
- Changes:
  - Replaced invalid literals with a valid-format example address matching OpenAPI path regex requirements.

3. Protobuf schema non-existent message name
- Updated file:
  - `content/docs/rpc/grpc/protobuf-schema.mdx`
- Changes:
  - Corrected `message UtxosByAddressesEntry` to `message RpcUtxosByAddressesEntry`.

4. Block endpoint verbose transaction field mismatch
- Updated file:
  - `content/docs/rpc/rest/blocks.mdx`
- Changes:
  - Corrected transaction verbose field example from `mass` to `computeMass`.

## Residual UNVERIFIED claims resolution

1. Resolver low-load selection claim (`content/docs/rpc/connecting.mdx`)
- Rewrote resolver text to avoid unprovable selection-policy assertions.
- Added explicit non-normative operational notes for reconnect/selection behavior.

2. PNN governance/operations claims (`content/docs/rpc/overview.mdx`)
- Removed unsupported governance/process specifics.
- Replaced with protocol-backed client behavior and explicit non-normative operational guidance for PNN/resolver policy details.
- Updated `kHOST` wording to avoid unverifiable adoption claims.

## Verification checks run
- Confirmed no remaining `"method": "notify..."` examples in subscriptions docs.
- Confirmed no remaining `kaspadev` literals in affected files.
- Confirmed corrected schema/message/field strings:
  - `RpcUtxosByAddressesEntry` present.
  - `computeMass` present in block example.
- Confirmed resolver/PNN problematic phrases removed from affected pages.

## Notes
- Worktree contains many unrelated edits by other workers; those were intentionally left untouched.
