# RPC wRPC Post-Remediation Validation Audit

- Date: 2026-02-27
- Scope: `/Users/luke/Projects/docs_kaspa_org/remediation/chunks/rpc_wrpc_0_39.txt`
- Files audited: 40
- Primary sources:
  - `/Users/luke/Projects/rusty-kaspa/rpc/core/src/model/message.rs`
  - `/Users/luke/Projects/rusty-kaspa/rpc/service/src/service.rs`
  - Supporting implementation sources in `rusty-kaspa` (consensus, mempool, address manager, sysinfo, network models)
  - `/Users/luke/Projects/kips/kip-0014.md` (DAA/time semantics where applicable)
  - Official Kaspa docs where needed: `https://kaspa.org/tokenomics/`

## Status Table

| File | Status |
|---|---|
| `content/docs/rpc/wrpc/add-peer.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/ban.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/estimate-network-hashes-per-second.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-balance-by-address.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-balance-by-addresses.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-block-count.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-block-dag-info.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-block-template.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-block.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-blocks.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-coin-supply.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-connected-peer-info.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-connections.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-current-block-color.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-current-network.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-daa-score-timestamp-estimate.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-fee-estimate-experimental.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-fee-estimate.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-headers.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-info.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-mempool-entries-by-addresses.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-mempool-entries.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-mempool-entry.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-metrics.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-peer-addresses.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-server-info.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-sink-blue-score.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-sink.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-subnetwork.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-sync-status.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-system-info.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-utxos-by-addresses.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/get-virtual-chain-from-block.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/ping.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/resolve-finality-conflict.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/shutdown.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/submit-block.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/submit-transaction-replacement.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/submit-transaction.mdx` | VERIFIED |
| `content/docs/rpc/wrpc/unban.mdx` | VERIFIED |

## Counts

- VERIFIED: 40
- ISSUES: 0
- UNVERIFIED: 0

## Residual Issues / Unverified Claims

- None.
