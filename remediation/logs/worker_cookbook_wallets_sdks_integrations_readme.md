# Worker Remediation Log: cookbook_wallets_sdks_integrations_readme

Date: 2026-02-27
Owner chunk: `remediation/chunks/cookbook_wallets_sdks_integrations_readme.txt`

## Scope handled
- `README.md`
- Cookbook pages in scope (`content/docs/cookbook/...`)
- Wallets pages in scope (`content/docs/wallets/...`)
- SDK pages in scope (`content/docs/sdks/...`)
- Integrations pages in scope (`content/docs/integrations/...`)

Only files in the owned chunk were edited.

## ISSUE findings fixed

### README report
- Reworded unverifiable provenance text:
  - "generated with Create Fumadocs" -> "built with Fumadocs".
- Fixed localhost wording:
  - now references `http://localhost:3000` **or** URL printed by `next dev`.
- Corrected wrong paths:
  - `lib/...` -> `src/lib/...`
  - `app/...` -> `src/app/...`
- Corrected `src/app/(home)` route description to match current redirect behavior.

### Cookbook report
- `check-node-status.mdx`: fixed peer count field usage
  - `peerInfo.infos.length` -> `peerInfo.peerInfo.length`.
- `connect-grpc.mdx`: corrected protobuf location
  - `rpc/grpc/proto` -> `rpc/grpc/core/proto` (`messages.proto`, `rpc.proto`).
- `connect-wrpc.mdx`: corrected reconnect behavior
  - removed claim that SDK does not auto-reconnect; documented re-subscribe-on-connect behavior.
- `query-utxos.mdx`: corrected UTXO entry fields
  - replaced `entry.utxoEntry.*` with `entry.*` in code and field table.
- `subscribe-blocks.mdx`: removed assumption that `verboseData.hash` is always present
  - uses `block.header.hash` as canonical hash; verbose hash optional.
- `track-confirmation.mdx`:
  - removed inaccurate txid-based approximation flow.
  - replaced with known-inclusion-DAA-score tracking flow.
  - clarified that mempool-by-address exists (`getMempoolEntriesByAddresses`).
  - reframed confirmation-depth table as operator policy example (non-normative).
- `generate-address.mdx`: `XPub.fromString(...)` -> `new XPub(...)`.
- `get-balance.mdx`: replaced `entry.utxoEntry.*` with `entry.*`.
- `restore-from-mnemonic.mdx`: mnemonic word-count validation corrected to `12 or 24`; description updated accordingly.
- `sign-message.mdx`:
  - `PrivateKey.random()` -> `Keypair.random()` + `keypair.privateKey`.
  - `PublicKey.fromString(...)` -> `new PublicKey(...)`.

### Wallets/SDKs/Integrations report
- `cli-wallet.mdx`:
  - removed incorrect `--server` startup guidance; switched to interactive `server` + `connect` flow.
  - corrected default connect behavior (public resolver when server unset).
  - corrected mnemonic wording to CLI default of 12 words; import wording supports 12/24.
  - replaced incorrect storage path table with `~/.kaspa` default root statement.
- `hd-derivation.mdx`:
  - replaced universal 24-word framing with 12/24 support.
  - added account-type/path caveats (standard/multisig/legacy).
  - softened SLIP-44 assertion to tooling usage wording.
  - corrected signature wording to Schnorr-primary while acknowledging ECDSA support paths.
- `overview.mdx`:
  - removed overstated universal-path portability language.
  - corrected address model to include broader prefixes/versions.
- `wallet-api.mdx`:
  - fixed JS `accountsSend` request shape to `destination[]` + `priorityFeeSompi`.
  - fixed JS `accountsEstimate` request/response shape to `destination[]`, `priorityFeeSompi`, `generatorSummary.*`.
  - fixed Rust `AccountsSendRequest` example fields to `destination: PaymentOutputs(...).into()` and `priority_fee_sompi`.
- `wallet-sdk.mdx`:
  - corrected coinbase maturity configuration statement to SDK-event-timing semantics.
  - removed testnet-11 example reference from networkId sample.
- `exchange-integration.mdx`:
  - corrected input-limit statement to reflect hard protocol cap + practical mass/script constraints.

## UNVERIFIED findings resolved

Resolution method used per file: **softened claims and/or removed unverifiable product-state assertions**, while preserving implementation guidance.

- `cookbook/transactions/batch-transactions.mdx`
  - removed fixed "80-100 outputs" claim; now capacity is script/composition dependent.
- `cookbook/transactions/estimate-fees.mdx`
  - removed prescriptive timing guarantees and fixed numeric "typical mass" assertions.
  - bucket semantics now phrased as estimator outputs, not guarantees.
- `cookbook/transactions/utxo-consolidation.mdx`
  - removed fixed "80-90 inputs" claim; now variable by composition.
- `wallets/hardware-wallets.mdx`
  - replaced product-specific support matrix/claims with stable compatibility and security workflow.
- `wallets/web-wallet.mdx`
  - replaced specific implementation/timing claims with operationally safe, non-version-bound guidance.
- `sdks/community-sdks.mdx`
  - replaced project-status assertions with evaluation framework and validation checklist.
- `sdks/overview.mdx`
  - replaced unverified maturity/parity matrix with canonical-path selection guidance.
- `sdks/python-sdk.mdx`
  - replaced unverified package/API assertions with verifiable integration approaches (gRPC generation + wrapper validation).
- `sdks/rust-crates.mdx`
  - removed weakly sourced external-resource assertions; retained primary-source oriented references.
- `sdks/wasm-sdk.mdx`
  - softened non-canonical platform claims (Bun/Deno/RN) and removed testnet-11 examples.
- `integrations/block-explorers.mdx`
  - removed fixed explorer feature/API inventory claims; kept canonical node-backed indexing guidance.
- `integrations/payment-processing.mdx`
  - reframed confirmation table as operator-defined example policy; removed fixed timing guidance.
- `integrations/third-party-protocols.mdx`
  - replaced ecosystem-specific assertions with neutral boundary and due-diligence guidance.

## Global scope consistency actions
- Removed/relocated out-of-scope L2/Kasplex canonical language by rewriting:
  - `content/docs/integrations/third-party-protocols.mdx`
- Removed out-of-scope ecosystem references from canonical SDK page by rewriting:
  - `content/docs/sdks/community-sdks.mdx`
- Removed `testnet-11` references in owned scope:
  - `content/docs/wallets/wallet-sdk.mdx`
  - `content/docs/sdks/overview.mdx`
  - `content/docs/sdks/community-sdks.mdx`
  - `content/docs/sdks/wasm-sdk.mdx`

## Notes
- Worktree contains many unrelated pre-existing modifications outside owned scope; these were intentionally left untouched per instruction.
