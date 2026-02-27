# Wallets + SDKs + Integrations Fact-Check

Date: 2026-02-27

## Scope
Audited files from:
- `audit/chunks/wallets.txt`
- `audit/chunks/sdks.txt`
- `audit/chunks/integrations.txt`

Primary sources used:
- `/Users/luke/Projects/rusty-kaspa`
- Official WASM/SDK docs in `/Users/luke/Projects/rusty-kaspa/wasm/*`

Status definitions:
- `VERIFIED`: all factual claims in file confirmed from allowed primary sources.
- `ISSUES`: one or more claims contradicted by allowed primary sources.
- `UNVERIFIED`: one or more claims could not be proven from allowed primary sources.

## Status Summary
| File | Status |
|---|---|
| `content/docs/wallets/cli-wallet.mdx` | `ISSUES` |
| `content/docs/wallets/hardware-wallets.mdx` | `UNVERIFIED` |
| `content/docs/wallets/hd-derivation.mdx` | `ISSUES` |
| `content/docs/wallets/overview.mdx` | `ISSUES` |
| `content/docs/wallets/wallet-api.mdx` | `ISSUES` |
| `content/docs/wallets/wallet-sdk.mdx` | `ISSUES` |
| `content/docs/wallets/web-wallet.mdx` | `UNVERIFIED` |
| `content/docs/sdks/community-sdks.mdx` | `UNVERIFIED` |
| `content/docs/sdks/overview.mdx` | `UNVERIFIED` |
| `content/docs/sdks/python-sdk.mdx` | `UNVERIFIED` |
| `content/docs/sdks/rust-crates.mdx` | `UNVERIFIED` |
| `content/docs/sdks/wasm-sdk.mdx` | `UNVERIFIED` |
| `content/docs/integrations/block-explorers.mdx` | `UNVERIFIED` |
| `content/docs/integrations/exchange-integration.mdx` | `ISSUES` |
| `content/docs/integrations/payment-processing.mdx` | `UNVERIFIED` |
| `content/docs/integrations/third-party-protocols.mdx` | `UNVERIFIED` |

---

## 1) `content/docs/wallets/cli-wallet.mdx` — `ISSUES`

### A. `--server` startup guidance is not backed by CLI source
- Claim: `cli-wallet.mdx:50`, `cli-wallet.mdx:64`
- Evidence:
  - Connection target is handled by interactive `connect` logic (`cli/src/modules/connect.rs:13-25`).
  - RPC server persistence is handled by `server` command (`cli/src/modules/server.rs:12-19`).
  - No `--server` occurrence in CLI source search.
- Proposed fix: replace `kaspa-wallet --server ...` with interactive flow: `server <host>` then `connect` (or `connect <host>`).

### B. Default `connect` target is misstated
- Claim: `cli-wallet.mdx:117`
- Evidence:
  - If no server is set, `connect` explicitly resolves to a public node (`cli/src/modules/connect.rs:19-21`).
  - Default wallet setting is `server = "public"` (`wallet/core/src/settings.rs:30-32`).
- Proposed fix: state that default behavior is public resolver unless user sets `server` explicitly.

### C. Wallet creation mnemonic length is misstated
- Claim: `cli-wallet.mdx:75`, `cli-wallet.mdx:81`, `cli-wallet.mdx:93`
- Evidence:
  - CLI wallet creation wizard uses `WordCount::Words12` (`cli/src/wizards/wallet.rs:26`).
  - Mnemonic generation uses that selected word count (`cli/src/wizards/wallet.rs:129-133`).
  - SDK supports both 12 and 24 words (`wallet/bip32/src/mnemonic/phrase.rs:28-32`).
- Proposed fix: document CLI default as 12-word mnemonic (and optionally note that 24-word mnemonics are supported in SDK contexts).

### D. Storage path table is inaccurate
- Claim: `cli-wallet.mdx:273-279`
- Evidence:
  - Default storage folder is `~/.kaspa` (`wallet/core/src/storage/local/mod.rs:36-43`).
- Proposed fix: update storage section to `~/.kaspa` (or explicitly document runtime overrides if applicable).

---

## 2) `content/docs/wallets/hardware-wallets.mdx` — `UNVERIFIED`

- Unverified claim groups: Ledger device/app support and model matrix (`hardware-wallets.mdx:25-26`), Web Wallet/KasVault Ledger integration (`hardware-wallets.mdx:45-47`), Tangem behavior and backup model (`hardware-wallets.mdx:91-111`), and asset/open-source comparison table (`hardware-wallets.mdx:115-123`).
- Reason: these are third-party/product-state assertions not provable from `rusty-kaspa` + official WASM docs alone.
- Proposed fix: add dated citations to official Ledger, Tangem, KasVault, and Kaspa wallet support docs for each product claim.

---

## 3) `content/docs/wallets/hd-derivation.mdx` — `ISSUES`

### A. 24-word mnemonic is presented as universal
- Claim: `hd-derivation.mdx:8`, `hd-derivation.mdx:14-17`
- Evidence:
  - BIP39 word count in source supports both 12 and 24 (`wallet/bip32/src/mnemonic/phrase.rs:28-32`).
  - 12-word path uses 128-bit entropy (`wallet/bip32/src/mnemonic/phrase.rs:123-126`), 24-word uses 256-bit (`wallet/bip32/src/mnemonic/phrase.rs:118-121`).
- Proposed fix: describe both 12-word and 24-word flows, not only 24-word.

### B. Derivation path is overstated as one universal path
- Claim: `hd-derivation.mdx:47-51`, `hd-derivation.mdx:97-102`
- Evidence:
  - Gen1 standard vs multisig purpose differs (`44` vs `45`) (`wallet/keys/src/derivation/gen1/hd.rs:178-199`).
  - Legacy/gen0 path uses `/972/` (`wallet/keys/src/derivation/gen0/hd.rs:308-329`).
- Proposed fix: split path documentation by account type (`bip32`, `multisig`, `legacy`) and note compatibility limits.

### C. “Kaspa uses Schnorr rather than ECDSA” is inaccurate
- Claim: `hd-derivation.mdx:107`
- Evidence:
  - Address version enum includes `PubKeyECDSA` (`crypto/addresses/src/lib.rs:138-144`).
  - Wallet key API exposes ECDSA address derivation (`wallet/keys/src/keypair.rs:72-80`).
  - TxScript supports ECDSA signature opcode (`crypto/txscript/src/opcodes/mod.rs:745-752`).
- Proposed fix: rephrase to “Schnorr is the primary/default wallet flow; ECDSA paths/opcodes are also supported in protocol/tooling.”

### D. SLIP-44 registration statement lacks in-scope proof
- Claim: `hd-derivation.mdx:64`
- Evidence: no canonical SLIP-44 registry artifact is present in allowed local primary sources.
- Proposed fix: add direct citation to official SLIP-44 registry entry or soften to “commonly used coin type in Kaspa tooling”.

---

## 4) `content/docs/wallets/overview.mdx` — `ISSUES`

### A. “All wallets use same BIP-44 path + 24-word portability” is overstated
- Claim: `overview.mdx:8`, `overview.mdx:136-140`
- Evidence:
  - Both 12 and 24-word mnemonics exist (`wallet/bip32/src/mnemonic/phrase.rs:28-32`).
  - Path differs for multisig purpose (`45`) (`wallet/keys/src/derivation/gen1/hd.rs:178-199`).
  - Legacy path differs (`/972/`) (`wallet/keys/src/derivation/gen0/hd.rs:308-329`).
- Proposed fix: scope portability statements to account type/path compatibility and mention legacy/multisig differences.

### B. Address model is incomplete/incorrect
- Claim: `overview.mdx:25`
- Evidence:
  - Network prefixes include mainnet/testnet/simnet/devnet (`crypto/addresses/src/lib.rs:65-76`).
  - Address versions include `PubKey`, `PubKeyECDSA`, and `ScriptHash` (`crypto/addresses/src/lib.rs:138-144`).
- Proposed fix: update address description to include all supported prefixes and versions.

---

## 5) `content/docs/wallets/wallet-api.mdx` — `ISSUES`

### A. `accountsSend` JS example uses wrong schema
- Claim: `wallet-api.mdx:159-165`
- Evidence:
  - WASM request interface expects `destination?: IPaymentOutput[]` and `priorityFeeSompi`, not `destination: string`, `amount`, `priorityFee` (`wallet/core/src/wasm/api/message.rs:1390-1419`, `wallet/core/src/wasm/api/message.rs:1423-1435`).
- Proposed fix: change to `destination: [{ address, amount }]` and `priorityFeeSompi`.

### B. `accountsEstimate` JS example uses wrong schema and response fields
- Claim: `wallet-api.mdx:173-180`
- Evidence:
  - Request expects `destination: IPaymentOutput[]` + required `priorityFeeSompi` (`wallet/core/src/wasm/api/message.rs:1771-1777`, `wallet/core/src/wasm/api/message.rs:1781-1792`).
  - Response shape is `generatorSummary`, not top-level `fees` / `transactions` (`wallet/core/src/wasm/api/message.rs:1802-1804`).
- Proposed fix: update request and read `estimate.generatorSummary.fees` / `estimate.generatorSummary.transactions`.

### C. Rust `accounts_send` example fields are incorrect
- Claim: `wallet-api.mdx:311-317`
- Evidence:
  - Rust `AccountsSendRequest` fields are `destination: PaymentDestination` and `priority_fee_sompi`; there is no `amount` field (`wallet/core/src/api/message.rs:498-505`).
- Proposed fix: model destination as payment outputs and rename fee field to `priority_fee_sompi`.

---

## 6) `content/docs/wallets/wallet-sdk.mdx` — `ISSUES`

### A. Coinbase maturity configuration limitation is misstated
- Claim: `wallet-sdk.mdx:115-117`
- Evidence:
  - SDK setter permits any value greater than stasis period (`wallet/core/src/utxo/settings.rs:92-100`), it does not enforce consensus coinbase maturity floor.
  - Default mainnet/testnet SDK maturity is `1000` DAA (`wallet/core/src/utxo/settings.rs:46-57`), but runtime override can set lower values.
- Proposed fix: say “these methods only control SDK event timing; do not set below consensus spendability thresholds.”

---

## 7) `content/docs/wallets/web-wallet.mdx` — `UNVERIFIED`

- Unverified claim groups: wallet.kaspanet.io implementation details (`web-wallet.mdx:8`, `web-wallet.mdx:16-22`), UI/UX specifics like compound prompts (`web-wallet.mdx:69-71`), and operational timing claims (`web-wallet.mdx:55`).
- Reason: behavior of the hosted Web Wallet app is not documented in allowed primary sources in scope.
- Proposed fix: add dated citations to the official Web Wallet repository/docs and release notes for each implementation/detail claim.

---

## 8) `content/docs/sdks/community-sdks.mdx` — `UNVERIFIED`

- Unverified claim groups: lifecycle and status of community repos/projects (`community-sdks.mdx:20-24`, `community-sdks.mdx:28-38`, `community-sdks.mdx:54-65`), and ecosystem recommendations (`community-sdks.mdx:83-95`).
- Reason: these are external project-state claims outside allowed primary-source scope.
- Proposed fix: attach per-project evidence links (latest release date, maintenance signals, compatibility notes) and add “as-of” dates.

---

## 9) `content/docs/sdks/overview.mdx` — `UNVERIFIED`

- Unverified claim groups: maturity matrix and cross-SDK capability parity (`overview.mdx:41-52`), and Python binding statements (`overview.mdx:65`).
- Reason: allowed sources fully cover Rust/WASM, but not enough canonical Python/community SDK artifacts to validate all matrix claims.
- Proposed fix: split matrix into “source-verified” vs “community-reported” rows with citations.

---

## 10) `content/docs/sdks/python-sdk.mdx` — `UNVERIFIED`

- Unverified claim groups: package/distribution details (`python-sdk.mdx:17-24`), API class surface in examples (`python-sdk.mdx:30-91`), and feature parity assertions (`python-sdk.mdx:105-112`).
- Reason: Python SDK implementation/distribution artifacts are not present in allowed local primary sources used for this audit.
- Proposed fix: cite the authoritative Python SDK repository and package index metadata for every install/API claim.

---

## 11) `content/docs/sdks/rust-crates.mdx` — `UNVERIFIED`

- Verified portions: crate existence in taxonomy table matches workspace crate names (e.g., `kaspa-wallet-core`, `kaspa-rpc-core`, `kaspa-wrpc-client`) (`*/Cargo.toml` matches, e.g. `wallet/core/Cargo.toml:2`, `rpc/core/Cargo.toml:2`, `rpc/wrpc/client/Cargo.toml:2`).
- Unverified claim groups: Python derivation statement and external documentation/community resources (`rust-crates.mdx:8`, `rust-crates.mdx:153-156`).
- Proposed fix: keep crate taxonomy; add hard citations for external-resource claims or move them to a “community resources” note.

---

## 12) `content/docs/sdks/wasm-sdk.mdx` — `UNVERIFIED`

- Verified portions: top-level SDK categories, package variants, build scripts, Node wrapper behavior, and browser loading requirements are supported by official WASM docs/scripts (`wasm/README.md:27-40`, `wasm/README.md:65-77`, `wasm/README.md:81-85`, `wasm/README.md:125-127`, `wasm/build-web:8-30`, `wasm/build-release:26-39`, `wasm/npm/README.md:3-5`, `wasm/npm/package.json:25-27`).
- Unverified claim groups: platform compatibility table entries (Bun/Deno/React Native) and some operational recommendations without canonical source citations (`wasm-sdk.mdx:75-82`).
- Proposed fix: annotate platform table with source links and tested version ranges; mark unsupported rows explicitly as experimental with dates.

---

## 13) `content/docs/integrations/block-explorers.mdx` — `UNVERIFIED`

- Unverified claim groups: explorer availability/features and REST API endpoint inventory (`block-explorers.mdx:14-39`, `block-explorers.mdx:107-127`).
- Verified portion: DAG/RPC concepts are generally aligned with core RPC ops and UTXO-index requirements (e.g., notify ops and UTXO-index-gated address methods) (`rpc/core/src/api/ops.rs:34-42`, `rpc/service/src/service.rs:691-699`).
- Proposed fix: add official explorer/API docs citations and timestamp availability claims.

---

## 14) `content/docs/integrations/exchange-integration.mdx` — `ISSUES`

### A. “No hard protocol limit on number of inputs” is incorrect
- Claim: `exchange-integration.mdx:75`
- Evidence:
  - Consensus params define hard per-transaction input limit `max_tx_inputs: 1000` (`consensus/core/src/config/params.rs:561`).
  - Testnet params also define `max_tx_inputs: 1000` (`consensus/core/src/config/params.rs:617`).
- Proposed fix: replace with “There is a hard protocol input cap (`max_tx_inputs`), and practical mass/script limits often lower the usable count.”

---

## 15) `content/docs/integrations/payment-processing.mdx` — `UNVERIFIED`

- Unverified claim groups: recommended confirmation-depth policy table and timing guidance (`payment-processing.mdx:59-68`), POS/e-commerce operational guidance (`payment-processing.mdx:114-129`).
- Reason: these are policy/operational recommendations, not directly derivable as canonical facts from allowed source code.
- Proposed fix: label as “operator recommendations” and add explicit “risk-policy examples, not protocol requirements” language.

---

## 16) `content/docs/integrations/third-party-protocols.mdx` — `UNVERIFIED`

- Unverified claim groups: ecosystem protocol adoption/state and roadmap statements (`third-party-protocols.mdx:13`, `third-party-protocols.mdx:30-37`, `third-party-protocols.mdx:56-61`).
- Reason: these are external ecosystem and roadmap assertions not provable from the allowed primary sources alone.
- Proposed fix: add dated, authoritative links (official roadmap statements + protocol documentation) for each ecosystem claim.

---

## High-priority patch targets
1. Fix schema errors in `wallet-api.mdx` examples first (currently non-working request/response shapes).
2. Correct CLI defaults/commands in `cli-wallet.mdx` (server behavior + mnemonic length + storage path).
3. Correct derivation/signature overstatements in `hd-derivation.mdx` and `overview.mdx`.
4. Fix incorrect input-limit statement in `exchange-integration.mdx`.
