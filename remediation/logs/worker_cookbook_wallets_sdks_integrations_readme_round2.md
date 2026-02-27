# Worker Remediation Log: cookbook_wallets_sdks_integrations_readme (Round 2)

Date: 2026-02-27
Owner chunk: `remediation/chunks/cookbook_wallets_sdks_integrations_readme.txt`
Validation input: `remediation/validation_cookbook_wallets_sdks_integrations_readme.md`

## Scope handled
- Addressed all residual `ISSUES` and `UNVERIFIED` items listed in the validation input for this chunk.
- Kept edits limited to owned files in this chunk.
- Aligned technical/API examples with current `rusty-kaspa` structures and WASM/RPC bindings.

## Residual ISSUES fixed

1. `content/docs/cookbook/transactions/track-confirmation.mdx`
- Updated `utxos-changed` sample to use top-level entry fields:
  - `added.utxoEntry.amount` -> `added.amount`
  - `added.utxoEntry.blockDaaScore` -> `added.blockDaaScore`

2. `content/docs/cookbook/wallets/create-wallet.mdx`
- Replaced 24-word-only requirement wording with 12/24-word BIP-39 support wording.

3. `content/docs/sdks/rust-crates.mdx`
- Corrected RPC field in Rust sample:
  - `info.network_name` -> `info.network`

4. `content/docs/sdks/wasm-sdk.mdx`
- Corrected `utxos-changed` event entry access:
  - `entry.utxoEntry.amount` -> `entry.amount`

5. `content/docs/wallets/wallet-api.mdx`
- Added missing JS import for `Resolver` in the wallet creation snippet.
- Corrected `accountsEnumerate()` usage to object shape with `accountDescriptors`.
- Updated dependent account-id usage in `accountsCreateNewAddress`, `accountsSend`, and `accountsEstimate` examples to use `firstAccount.accountId` derived from `accounts.accountDescriptors[0]`.

## Residual UNVERIFIED resolved

1. `content/docs/integrations/exchange-integration.mdx`
- Removed fixed infrastructure sizing numbers (`8 GB RAM`, `100 GB SSD`) and replaced with workload-based capacity guidance.
- Replaced fixed confirmation/depth timing policy table with non-normative, risk-tier policy guidance.
- Removed specific external project recommendation (`simply-kaspa-indexer`) and replaced with neutral third-party indexer due-diligence guidance.

2. `content/docs/wallets/overview.mdx`
- Removed ecosystem-state product/support matrix and compatibility assertions tied to specific wallets/devices.
- Reframed wallet comparisons around stable categories (`Web Wallet`, `CLI Wallet`, `Hardware Wallets`).
- Replaced product-specific portability and dApp instructions with implementation-agnostic compatibility guidance.

## Files edited in this round
- `content/docs/cookbook/transactions/track-confirmation.mdx`
- `content/docs/cookbook/wallets/create-wallet.mdx`
- `content/docs/sdks/rust-crates.mdx`
- `content/docs/sdks/wasm-sdk.mdx`
- `content/docs/wallets/wallet-api.mdx`
- `content/docs/integrations/exchange-integration.mdx`
- `content/docs/wallets/overview.mdx`

## Notes
- No files outside the owned chunk scope were modified.
- Unrelated pre-existing worktree changes were intentionally left untouched.
