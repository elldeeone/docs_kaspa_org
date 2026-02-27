# Worker Remediation Log: node_guides_getting_dev

Date: 2026-02-27
Owner chunk: `remediation/chunks/node_guides_getting_dev.txt`

## Scope handled
- Applied remediation for all owned files referenced by:
  - `audit/reports/node_operations.md`
  - `audit/reports/guides.md`
  - `audit/reports/getting_started_developer_index.md`
  - `audit/reports/global_scope_consistency.md` (owned-file overlap only)
- Fixed all `ISSUE` claims in owned scope.
- Resolved `UNVERIFIED` claims by converting to non-normative guidance, removing unsupported absolutes/comparison tables, or adding explicit qualifiers.
- Normalized network/path/flag details to current `rusty-kaspa` behavior in owned files.
- Edited owned files only.

## File-by-file remediation

### Developer guide / index
- `content/docs/developer-guide/building-apps.mdx`
  - Replaced outdated virtual-chain subscription API:
    - `subscribeVirtualSelectedParentChainChanged({...})` -> `subscribeVirtualChainChanged(true)`
    - `virtual-selected-parent-chain-changed` -> `virtual-chain-changed`
  - Reframed confirmation depths (10/100) as operator-policy examples, not consensus constants.

- `content/docs/developer-guide/integration.mdx`
  - Clarified wRPC is not default-exposed; explicit `--rpclisten-borsh` / `--rpclisten-json` required.
  - Qualified supply wording to approximate emission (`~28.7B`) with `maxSompi` caveat.
  - Replaced incomplete first-character address mapping with versioned types (`PubKey`, `PubKeyECDSA`, `ScriptHash`).
  - Corrected address casing guidance to canonical lowercase.
  - Corrected mempool/finality statement (Kaspa has mempool; pending until policy depth).
  - Marked hardware and confirmation tables as operational policy defaults.

- `content/docs/index.mdx`
  - Replaced unverified cookbook root route link:
    - `/docs/cookbook` -> `/docs/cookbook/transactions/send-kas`
  - Softened “instant confirmations” phrasing to “fast first confirmations”.

### Getting started
- `content/docs/getting-started/first-transaction.mdx`
  - Corrected wallet default server behavior (`server=public`, resolver-backed).
  - Updated commands to current CLI surface:
    - `wallet create`, `wallet open`, `wallet import`, `list`, `sweep`, `wallet close`
  - Corrected mnemonic wording to current 12-word default wizard behavior.
  - Removed stale explicit `Confirm (y/n)` send prompt assumption.
  - Reworded fee and confirmation timing statements as non-fixed operational guidance.

- `content/docs/getting-started/installation.mdx`
  - Corrected default chain DB paths to include `datadir`:
    - `~/.rusty-kaspa/kaspa-mainnet/datadir/`
    - `%LOCALAPPDATA%\rusty-kaspa\kaspa-mainnet\datadir\`
  - Added logs sibling-directory note.
  - Softened sync/hardware guidance to approximate language.

- `content/docs/getting-started/quick-start.mdx`
  - Corrected wRPC default behavior (disabled unless explicitly enabled).
  - Enabled JSON wRPC in examples with `--rpclisten-json=default`.
  - Corrected JSON WebSocket ports:
    - mainnet `18110`
    - testnet `18210` (when JSON enabled)
  - Removed incorrect implication that `GetInfo` includes network name.
  - Renamed subsection to websocat-based usage.

- `content/docs/getting-started/what-is-kaspa.mdx`
  - Softened overstatements (“no wasted energy”, strict proportionality).
  - Qualified supply wording (`~28.7B` + `maxSompi` caveat).
  - Removed uncited cross-chain comparison table.
  - Reworded launch/community claims to avoid unverifiable absolutes.

- `content/docs/getting-started/why-kaspa.mdx`
  - Reframed “no orphan blocks” and energy claims to reduced orphan-loss effects.
  - Softened strict proportional-reward language.
  - Removed uncited cross-chain comparison table.
  - Softened evaluative decentralization superlative wording.

### Guides
- `content/docs/guides/build-payment-gateway.mdx`
  - Converted 10/100 confirmation thresholds into operator risk-policy guidance.

- `content/docs/guides/build-wallet-app.mdx`
  - Replaced fiat-fixed fee claim with mass-based + market-dependent fee wording.

- `content/docs/guides/dev-environment.mdx`
  - Fixed invalid `getInfo().networkId` usage:
    - now uses `getCurrentNetwork()` for network output.
  - Removed `testnet-11` reference; retained `testnet-10`.
  - Clarified mainnet 17110 usage requires explicit `--rpclisten-borsh`.
  - Softened disk estimate wording.

- `content/docs/guides/first-transaction.mdx`
  - Removed unsupported Deno runtime claim.
  - Marked faucet URL as time-bound and non-canonical.
  - Reframed confirmation speed as depth-policy dependent.

- `content/docs/guides/kaspad-to-rusty-kaspa.mdx`
  - Replaced hard performance numeric ranges with environment-dependent qualitative comparison.

- `content/docs/guides/monitoring-setup.mdx`
  - Marked scrape interval and alert thresholds as tuning defaults, not constants.

- `content/docs/guides/production-node.mdx`
  - Replaced absolute HDD prohibition with supported-but-slower guidance.
  - Added `--rocksdb-preset=hdd` mention.
  - Softened fixed re-sync duration wording.

- `content/docs/guides/testnet-development.mdx`
  - Removed unsupported local `--netsuffix=11` instructions.
  - Consolidated testnet guidance to current local-node support (`testnet-10`).
  - Updated network comparison table accordingly.

### Node operations
- `content/docs/node-operations/configuration.mdx`
  - Rewrote config-file section to explicit `--configfile` usage with TOML example.
  - Updated defaults:
    - `outpeers=8`
    - `perf-metrics-interval-sec=10`
  - Corrected `--sanity` semantics to current behavior caveat.
  - Updated directory layout:
    - `datadir` (not `datadir2`)
    - removed `kaspad.pid`
    - suffixed testnet path naming (`kaspa-testnet-10`).
  - Softened `--utxoindex` requirement wording to wallet/address-indexed queries.

- `content/docs/node-operations/docker.mdx`
  - Corrected prebuilt image claim to official `kaspanet/rusty-kaspad` availability.
  - Added official pull example.
  - Made healthcheck example consistent by installing `netcat-openbsd` in runtime image.
  - Added missing wRPC listener flags in compose examples when publishing 17110/18110.
  - Reframed resource values as starting points.

- `content/docs/node-operations/monitoring.mdx`
  - Corrected RPC method semantics:
    - `GetInfo` no longer documented with network/virtualDAA fields
    - added `GetServerInfo` for `networkId` + `virtualDaaScore`
    - `GetSyncStatus` documented as `isSynced` boolean
  - Removed unsupported “known addresses” metric claim.
  - Updated log examples to current-style processing output.
  - Softened healthy ranges/overhead statements to operator guidance.

- `content/docs/node-operations/running-a-node.mdx`
  - Updated default paths to current `.rusty-kaspa/.../datadir` layout.
  - Softened `--utxoindex` mining prerequisite language.
  - Reframed hardware and sync timing as estimates.

- `content/docs/node-operations/simnet.mdx`
  - Corrected PoW behavior from “low difficulty” to simulated PoW (`skip_proof_of_work=true`).
  - Softened throughput certainty wording.
  - Updated custom appdir example to `.rusty-kaspa-sim2` naming.

- `content/docs/node-operations/testnet.mdx`
  - Removed operational framing for `testnet-11`; set current local support to `testnet-10`.
  - Updated directory names to `kaspa-testnet-10`.
  - Softened faucet/reset operational certainty claims.

- `content/docs/node-operations/troubleshooting.mdx`
  - Removed hard numeric bandwidth threshold.
  - Softened dependency and validation-frequency assertions to conditional guidance.

- `content/docs/node-operations/upgrading.mdx`
  - Corrected backup path to `.rusty-kaspa/.../datadir`.
  - Replaced fixed reset duration with environment-dependent wording.
  - Replaced broad compatibility guarantees with release-note-driven guidance.

## Consistency checks run
- Pattern sweeps across owned files for stale markers:
  - `testnet-11`, `--netsuffix=11`, `.kaspad`, `datadir2`, `kaspad.pid`, outdated virtual-chain API names, `is_synced` casing.
- Spot validation against `rusty-kaspa` sources for:
  - RPC/wRPC ports and enablement behavior
  - config defaults (`outpeers`, perf interval)
  - testnet suffix support and network naming
  - simnet `skip_proof_of_work`
  - `GetInfo` / `GetServerInfo` / `GetSyncStatus` field semantics

## Notes
- Worktree contains unrelated pre-existing modifications outside this ownership chunk; these were intentionally ignored.
