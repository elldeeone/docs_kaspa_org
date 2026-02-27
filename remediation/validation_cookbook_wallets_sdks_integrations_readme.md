# Post-Remediation Validation Audit: cookbook_wallets_sdks_integrations_readme

## Status Table

| File | Status |
|---|---|
| `README.md` | VERIFIED |
| `content/docs/cookbook/node/check-node-status.mdx` | VERIFIED |
| `content/docs/cookbook/node/connect-grpc.mdx` | VERIFIED |
| `content/docs/cookbook/node/connect-wrpc.mdx` | VERIFIED |
| `content/docs/cookbook/node/query-utxos.mdx` | VERIFIED |
| `content/docs/cookbook/node/subscribe-blocks.mdx` | VERIFIED |
| `content/docs/cookbook/transactions/batch-transactions.mdx` | VERIFIED |
| `content/docs/cookbook/transactions/estimate-fees.mdx` | VERIFIED |
| `content/docs/cookbook/transactions/send-kas.mdx` | VERIFIED |
| `content/docs/cookbook/transactions/track-confirmation.mdx` | ISSUES |
| `content/docs/cookbook/transactions/utxo-consolidation.mdx` | VERIFIED |
| `content/docs/cookbook/wallets/create-wallet.mdx` | ISSUES |
| `content/docs/cookbook/wallets/generate-address.mdx` | VERIFIED |
| `content/docs/cookbook/wallets/get-balance.mdx` | VERIFIED |
| `content/docs/cookbook/wallets/restore-from-mnemonic.mdx` | VERIFIED |
| `content/docs/cookbook/wallets/sign-message.mdx` | VERIFIED |
| `content/docs/integrations/block-explorers.mdx` | VERIFIED |
| `content/docs/integrations/exchange-integration.mdx` | UNVERIFIED |
| `content/docs/integrations/payment-processing.mdx` | VERIFIED |
| `content/docs/integrations/third-party-protocols.mdx` | VERIFIED |
| `content/docs/sdks/community-sdks.mdx` | VERIFIED |
| `content/docs/sdks/overview.mdx` | VERIFIED |
| `content/docs/sdks/python-sdk.mdx` | VERIFIED |
| `content/docs/sdks/rust-crates.mdx` | ISSUES |
| `content/docs/sdks/wasm-sdk.mdx` | ISSUES |
| `content/docs/wallets/cli-wallet.mdx` | VERIFIED |
| `content/docs/wallets/hardware-wallets.mdx` | VERIFIED |
| `content/docs/wallets/hd-derivation.mdx` | VERIFIED |
| `content/docs/wallets/overview.mdx` | UNVERIFIED |
| `content/docs/wallets/wallet-api.mdx` | ISSUES |
| `content/docs/wallets/wallet-sdk.mdx` | VERIFIED |
| `content/docs/wallets/web-wallet.mdx` | VERIFIED |

## Counts

- VERIFIED: 25
- ISSUES: 5
- UNVERIFIED: 2
- TOTAL: 32

## Residual ISSUES Claims

1. `content/docs/cookbook/transactions/track-confirmation.mdx:82-87`
   - `utxos-changed` sample uses `added.utxoEntry.amount` / `added.utxoEntry.blockDaaScore`, but current WASM payload entries expose `amount` / `blockDaaScore` at top level (`added.amount`, `added.blockDaaScore`).

2. `content/docs/cookbook/wallets/create-wallet.mdx:11`
   - States wallet derivation as a 24-word mnemonic requirement; current wallet flows support both 12-word and 24-word mnemonic paths.

3. `content/docs/sdks/rust-crates.mdx:87`
   - Example uses `info.network_name`; current RPC struct field is `info.network`.

4. `content/docs/sdks/wasm-sdk.mdx:421`
   - `utxos-changed` sample uses `entry.utxoEntry.amount`; current entry shape exposes `entry.amount` (top-level entry getters).

5. `content/docs/wallets/wallet-api.mdx:50-56`
   - JS snippet constructs `new Resolver()` without importing `Resolver` in that snippet.

6. `content/docs/wallets/wallet-api.mdx:143-160`
   - `accountsEnumerate()` result is treated as array (`accounts[0]`), but API returns an object containing `accountDescriptors`.

## Residual UNVERIFIED Claims

1. `content/docs/integrations/exchange-integration.mdx`
   - Environment-sizing recommendations (`8 GB RAM`, `100 GB SSD`) and fixed confirmation/depth timing policy table (`100/1,000/10,000/432,000`) are operational claims not provable from `rusty-kaspa`/`kips` alone.
   - Community indexer recommendation (`simply-kaspa-indexer`) is an external project claim requiring external validation.

2. `content/docs/wallets/overview.mdx`
   - Product/support matrix and compatibility statements for KasVault, Ledger, Tangem, and mobile wallet availability are ecosystem-state claims outside canonical source repos and not validated here.
