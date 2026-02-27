# Post-Remediation Validation Audit — node_guides_getting_dev

Date: 2026-02-27
Scope source: `/Users/luke/Projects/docs_kaspa_org/remediation/chunks/node_guides_getting_dev.txt`
Validation sources: `/Users/luke/Projects/rusty-kaspa`, `/Users/luke/Projects/kips`

## Status Table

| File | Status |
|---|---|
| `content/docs/developer-guide/building-apps.mdx` | `VERIFIED` |
| `content/docs/developer-guide/integration.mdx` | `VERIFIED` |
| `content/docs/getting-started/first-transaction.mdx` | `VERIFIED` |
| `content/docs/getting-started/installation.mdx` | `VERIFIED` |
| `content/docs/getting-started/quick-start.mdx` | `VERIFIED` |
| `content/docs/getting-started/what-is-kaspa.mdx` | `UNVERIFIED` |
| `content/docs/getting-started/why-kaspa.mdx` | `UNVERIFIED` |
| `content/docs/guides/build-payment-gateway.mdx` | `VERIFIED` |
| `content/docs/guides/build-wallet-app.mdx` | `VERIFIED` |
| `content/docs/guides/dev-environment.mdx` | `ISSUES` |
| `content/docs/guides/first-transaction.mdx` | `UNVERIFIED` |
| `content/docs/guides/kaspad-to-rusty-kaspa.mdx` | `VERIFIED` |
| `content/docs/guides/monitoring-setup.mdx` | `VERIFIED` |
| `content/docs/guides/production-node.mdx` | `VERIFIED` |
| `content/docs/guides/testnet-development.mdx` | `UNVERIFIED` |
| `content/docs/index.mdx` | `VERIFIED` |
| `content/docs/node-operations/configuration.mdx` | `VERIFIED` |
| `content/docs/node-operations/docker.mdx` | `UNVERIFIED` |
| `content/docs/node-operations/monitoring.mdx` | `VERIFIED` |
| `content/docs/node-operations/running-a-node.mdx` | `UNVERIFIED` |
| `content/docs/node-operations/simnet.mdx` | `VERIFIED` |
| `content/docs/node-operations/testnet.mdx` | `UNVERIFIED` |
| `content/docs/node-operations/troubleshooting.mdx` | `UNVERIFIED` |
| `content/docs/node-operations/upgrading.mdx` | `VERIFIED` |

## Counts

| Status | Count |
|---|---|
| `VERIFIED` | 15 |
| `ISSUES` | 1 |
| `UNVERIFIED` | 8 |
| **Total** | **24** |

## Residual `ISSUES`

| File | Residual claim |
|---|---|
| `content/docs/guides/dev-environment.mdx` | Uses `wallet> create` (`:68`), but current CLI registers wallet creation under `wallet create` subcommand (`rusty-kaspa/cli/src/modules/mod.rs`, `rusty-kaspa/cli/src/modules/wallet.rs`). |

## Residual `UNVERIFIED` Claims

| File | Residual unverifiable claim(s) from allowed sources |
|---|---|
| `content/docs/getting-started/what-is-kaspa.mdx` | Marketing/historical assertions not provable from `rusty-kaspa`/`kips` alone (e.g., “fastest proof-of-work cryptocurrency”, “no ICO/pre-mine/dev tax/token allocation”, fair-launch history statements). |
| `content/docs/getting-started/why-kaspa.mdx` | Cross-chain timing/finality comparison table (Bitcoin/Ethereum/Litecoin) and broad evaluative claims are not established by `rusty-kaspa`/`kips`. |
| `content/docs/guides/first-transaction.mdx` | Faucet endpoint/canonicality and Discord fallback guidance are ecosystem-operational claims not evidenced in `rusty-kaspa`/`kips`. |
| `content/docs/guides/testnet-development.mdx` | Community faucet process and “confirmation is nearly instant” phrasing are not directly source-backed in `rusty-kaspa`/`kips`. |
| `content/docs/node-operations/docker.mdx` | Community image assertions (`supertypo/rusty-kaspad` maintenance/tracking claims) are external to `rusty-kaspa`/`kips`. |
| `content/docs/node-operations/running-a-node.mdx` | `rusty-dnsseeder` “under testing” ecosystem status claim is external to `rusty-kaspa`/`kips`. |
| `content/docs/node-operations/testnet.mdx` | Faucet availability/process and comparative mining-difficulty characterization are not directly evidenced by `rusty-kaspa`/`kips`. |
| `content/docs/node-operations/troubleshooting.mdx` | Several operational heuristics are not directly provable from primary sources as written (for example deterministic HDD impact language and generic root-cause assertions). |
