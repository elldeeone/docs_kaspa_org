# Guides Fact-Check Report

Date: 2026-02-27  
Scope: `audit/chunks/guides.txt` (8 guide files)

Primary validation sources used:
- `rusty-kaspa` source/docs
- `kips` (KIP-14)
- Official `kaspad` repository/docs (for Go-node migration claims)

## Status Summary

| File | Status | Notes |
|---|---|---|
| `content/docs/guides/build-payment-gateway.mdx` | `UNVERIFIED` | Core SDK/API claims are correct; confirmation-depth policy thresholds are not protocol-defined. |
| `content/docs/guides/build-wallet-app.mdx` | `UNVERIFIED` | Core derivation/UTXO/fee-model claims are correct; fiat-denominated fee claim is not source-verifiable. |
| `content/docs/guides/dev-environment.mdx` | `ISSUES` | Contains an invalid API field usage (`getInfo().networkId`). |
| `content/docs/guides/first-transaction.mdx` | `UNVERIFIED` | Transaction flow and ports are correct; Deno support and faucet canonicality are not fully verified from primary sources. |
| `content/docs/guides/kaspad-to-rusty-kaspa.mdx` | `UNVERIFIED` | Deprecation and 1-BPS-vs-10-BPS migration rationale are supported; performance numbers are not source-backed. |
| `content/docs/guides/monitoring-setup.mdx` | `UNVERIFIED` | Exporter pattern is valid; operational thresholds are heuristic, not protocol/source constants. |
| `content/docs/guides/production-node.mdx` | `ISSUES` | States HDD is "not viable"; official Rust docs provide an HDD-optimized operating path. |
| `content/docs/guides/testnet-development.mdx` | `ISSUES` | Instructs running `--netsuffix=11`; current `rusty-kaspa` params reject testnet suffixes other than `10`. |

---

## File Findings

### `content/docs/guides/build-payment-gateway.mdx`
Status: `UNVERIFIED`

Verified claims:
- Kaspa HD derivation with coin type `111111` is consistent with Rust SDK key derivation internals ([hd.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/keys/src/derivation/gen1/hd.rs#L178-L199)).
- `UtxoContext.trackAddresses()` and `UtxoProcessor` event usage (`"balance"`, `"reorg"`) align with wallet event definitions ([utxo/context.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/utxo/context.rs#L124-L126), [events.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/events.rs#L374-L380)).
- DAA-based tracking is supported by `virtualDaaScore` in `getBlockDagInfo` and DAA-based maturity logic ([rpc wasm message](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/wasm/message.rs#L161-L171), [utxo/reference.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/utxo/reference.rs#L35-L45)).
- `createTransactions` can produce batched/compound chains; later transactions depend on outputs from earlier ones ([generator docs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/tx/generator/generator.rs#L111-L119), [createTransactions return](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/tx/utils.rs#L65-L74)).

Unverified claim:
- Depth policy values ("10 low-value", "100+ high-value") are operational guidance, not protocol constants.

Proposed fix:
- Label these thresholds as example risk-policy defaults and link to operator policy guidance, not as generalized network truth.

---

### `content/docs/guides/build-wallet-app.mdx`
Status: `UNVERIFIED`

Verified claims:
- BIP-44/BIP-39 style derivation flow with Kaspa coin type `111111` matches SDK internals ([hd.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/keys/src/derivation/gen1/hd.rs#L178-L199)).
- `1 KAS = 100,000,000 sompi` is correct ([constants.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/consensus/core/src/constants.rs#L12-L14)).
- Fee model is mass-based (sompi per mass), not account-gas style ([mass.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/tx/mass.rs#L18-L33)).
- `summary.fees` exposure in generator summary is correct ([summary.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/tx/generator/summary.rs#L30-L33)).

Unverified claim:
- "Fees are extremely low -- typically fractions of a cent" is fiat-price/time dependent and not stable protocol truth.

Proposed fix:
- Reword to: "Fees are mass-based and typically low in sompi terms; fiat cost varies with market price." 

---

### `content/docs/guides/dev-environment.mdx`
Status: `ISSUES`

Issue 1:
- Claim/code uses `info.networkId` from `rpc.getInfo()` ([dev-environment.mdx:100-102](/Users/luke/Projects/docs_kaspa_org/content/docs/guides/dev-environment.mdx:100)).
- `GetInfoResponse` does not include `networkId`; fields are `p2pId`, `mempoolSize`, `serverVersion`, `isUtxoIndexed`, `isSynced`, etc. ([rpc wasm message](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/wasm/message.rs#L267-L277), [core model](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/model/message.rs#L266-L273)).

Proposed fix:
- Replace with one of:
  - `const net = await rpc.getCurrentNetwork(); console.log("Network:", net.network);` ([IGetCurrentNetworkResponse](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/wasm/message.rs#L990-L992))
  - Or log `rpc.networkId` getter ([client.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/wrpc/wasm/src/client.rs#L340-L343)).

Additional note (unverified):
- Build-time estimate and storage estimate are environment-dependent and should be labeled as approximate.

---

### `content/docs/guides/first-transaction.mdx`
Status: `UNVERIFIED`

Verified claims:
- Resolver + `networkId` pattern and testnet/manual ports match current SDK/node defaults ([client docs](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/wrpc/wasm/src/client.rs#L176-L210), [args help](https://github.com/kaspanet/rusty-kaspa/blob/master/kaspad/src/args.rs#L246-L269)).
- Transaction flow (`UtxoProcessor`, `trackAddresses`, `createTransactions`, `submit`) is aligned with SDK API surface ([utxo/context.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/utxo/context.rs#L124-L126), [tx utils](https://github.com/kaspanet/rusty-kaspa/blob/master/wallet/core/src/wasm/tx/utils.rs#L85-L110)).

Unverified claims:
- "Works in Node.js, browsers, and Deno" is not confirmed in primary SDK docs (SDK docs explicitly cover Node.js/Web) ([wasm README](https://github.com/kaspanet/rusty-kaspa/blob/master/wasm/README.md#L9-L10), [Node/Web sections](https://github.com/kaspanet/rusty-kaspa/blob/master/wasm/README.md#L125-L149)).
- Faucet URL as canonical current source is not guaranteed by primary repos.

Proposed fixes:
- Change runtime statement to "Node.js and browsers" unless Deno support is explicitly documented upstream.
- Mark faucet URL as "current at time of writing" and include fallback discovery path.

---

### `content/docs/guides/kaspad-to-rusty-kaspa.mdx`
Status: `UNVERIFIED`

Verified claims:
- Go `kaspad` is explicitly marked deprecated in official repo README ([kaspad README](https://github.com/kaspanet/kaspad/blob/master/README.md#deprecated)).
- Rusty Kaspa is the recommended implementation ([rusty-kaspa README](https://github.com/kaspanet/rusty-kaspa/blob/master/README.md#L5-L6)).
- Migration rationale around 1-BPS-era Go defaults vs Crescendo 10-BPS ecosystem is supported:
  - Go defaults include `defaultTargetTimePerBlock = 1s`, `defaultGHOSTDAGK = 18` ([consensus_defaults.go](https://github.com/kaspanet/kaspad/blob/master/domain/dagconfig/consensus_defaults.go#L43-L74)).
  - Crescendo/KIP-14 defines the 1->10 BPS transition ([kip-0014.md](https://github.com/kaspanet/kips/blob/master/kip-0014.md#L14-L33)).

Unverified claims:
- Hard numeric comparisons in table (`8-12 GB`, `4-6 GB`, `12-24h`, `2-4h`) are not tied to reproducible benchmark artifacts in cited primary sources.

Proposed fix:
- Replace hard numbers with benchmark-qualified language (hardware profile + dataset + node version), or remove numeric ranges.

---

### `content/docs/guides/monitoring-setup.mdx`
Status: `UNVERIFIED`

Verified claims:
- Exporter can correctly derive metrics from `getInfo`, `getBlockDagInfo`, `getConnectedPeerInfo` fields used in the snippet ([IGetInfoResponse](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/wasm/message.rs#L267-L277), [IGetBlockDagInfoResponse](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/wasm/message.rs#L161-L171), [GetConnectedPeerInfoResponse model](https://github.com/kaspanet/rusty-kaspa/blob/master/rpc/core/src/model/message.rs#L594-L600)).
- 10 BPS framing is consistent with Crescendo/network params ([kip-0014.md](https://github.com/kaspanet/kips/blob/master/kip-0014.md#L31-L33), [bps.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/consensus/core/src/config/bps.rs#L23-L54)).

Unverified claims:
- Alert thresholds (`peer_count < 5`, specific durations) are operational heuristics, not protocol constants.

Proposed fix:
- Label alert values as starter defaults and link to SLO-driven tuning guidance.

---

### `content/docs/guides/production-node.mdx`
Status: `ISSUES`

Issue 1:
- The guide states SSD is mandatory and HDD is not viable ([production-node.mdx:18](/Users/luke/Projects/docs_kaspa_org/content/docs/guides/production-node.mdx:18)).
- Official Rust docs provide HDD-optimized operating guidance for nodes via `--rocksdb-preset=hdd` and include expected HDD sync behavior ([archival.md](https://github.com/kaspanet/rusty-kaspa/blob/master/docs/archival.md#L1-L4), [minimum reqs include HDD](https://github.com/kaspanet/rusty-kaspa/blob/master/docs/archival.md#L19-L23), [expected HDD sync rate](https://github.com/kaspanet/rusty-kaspa/blob/master/docs/archival.md#L324-L326)).

Proposed fix:
- Replace absolute statement with: "SSD/NVMe strongly recommended for general production workloads; HDD is possible with HDD-oriented RocksDB tuning but has slower sync and tighter operational limits."

Additional note (unverified):
- "Re-sync in 2-4 hours" is hardware/network dependent and should be marked as approximate.

---

### `content/docs/guides/testnet-development.mdx`
Status: `ISSUES`

Issue 1:
- The guide instructs running a local node with `--testnet --netsuffix=11` ([testnet-development.mdx:51-53](/Users/luke/Projects/docs_kaspa_org/content/docs/guides/testnet-development.mdx:51)).
- Current `rusty-kaspa` consensus params only map testnet suffix `10`; other suffixes panic as unsupported ([params.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/consensus/core/src/config/params.rs#L517-L520), [testnet params suffix 10](https://github.com/kaspanet/rusty-kaspa/blob/master/consensus/core/src/config/params.rs#L605)).

Proposed fix:
- Remove/replace local `netsuffix=11` node instructions.
- If testnet-11 mention is retained, scope it to remote/public endpoint availability only, and explicitly state local `kaspad` support status for current release.

Additional verified note:
- `--testnet` default suffix is `10` ([args.rs](https://github.com/kaspanet/rusty-kaspa/blob/master/kaspad/src/args.rs#L119-L121)).

---

## Priority Fixes (Recommended Order)

1. Fix `dev-environment.mdx` `getInfo().networkId` usage (breaks example code).
2. Fix `testnet-development.mdx` `--netsuffix=11` local-node instructions.
3. Fix `production-node.mdx` absolute HDD prohibition language.
4. Convert hard performance/fiat/threshold claims across remaining files to benchmark- or policy-qualified wording.
