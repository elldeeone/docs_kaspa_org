# Node Operations Fact-Check Report
Date: 2026-02-27 (UTC)
Scope: `audit/chunks/node_operations.txt`
Primary sources: `rusty-kaspa` code/docs + official node-operation docs (`docs.kas.fyi`)

## Status Summary
| File | Status | Notes |
|---|---|---|
| `content/docs/node-operations/configuration.mdx` | **ISSUES** | Multiple defaults/paths are outdated; `--sanity` behavior is misdescribed. |
| `content/docs/node-operations/docker.mdx` | **ISSUES** | Official prebuilt image claim is incorrect; healthcheck example is inconsistent with Dockerfile. |
| `content/docs/node-operations/monitoring.mdx` | **ISSUES** | RPC method field descriptions are incorrect for `GetInfo` / `GetSyncStatus`; some log examples are outdated. |
| `content/docs/node-operations/running-a-node.mdx` | **ISSUES** | Default data directory paths are outdated; mining/UTXO wording is too strong. |
| `content/docs/node-operations/simnet.mdx` | **ISSUES** | Simnet PoW behavior is mischaracterized as "low difficulty" instead of simulated/disabled PoW. |
| `content/docs/node-operations/testnet.mdx` | **ISSUES** | Current node implementation only supports testnet suffix `10`; `testnet-11` is not supported in consensus params. |
| `content/docs/node-operations/troubleshooting.mdx` | **UNVERIFIED** | Most operational heuristics are plausible but not provable from primary sources as written. |
| `content/docs/node-operations/upgrading.mdx` | **UNVERIFIED** | Core Crescendo facts are correct; compatibility/process guarantees are stated too broadly without source backing. |

## File Findings

### `content/docs/node-operations/configuration.mdx` — **ISSUES**
**Verified**
- Flag presence and core defaults for `--rpclisten`, `--listen`, `--rpcmaxclients`, `--utxoindex`, `--archival`, `--testnet`, `--simnet`, `--devnet` are consistent with current CLI definitions. [E1]
- gRPC binds loopback by default; wRPC endpoints are only started when `--rpclisten-borsh` / `--rpclisten-json` are provided. [E4][E9][E8]

**Issues**
- The page implies a typical auto-loaded config file (`kaspad.conf` in data dir). Current code reads config only when `--configfile`/`-C` is explicitly supplied. [E2]
- `--outpeers` is documented as “default varies by network”; current default is fixed at `8`. [E1]
- `--perf-metrics-interval-sec` default is documented as `1`; current default is `10`. [E1]
- `--sanity` is documented as toggling extra checks, but `apply_to_config` currently enables sanity checks unconditionally (`true`). [E3]
- Data directory example shows `datadir2` and `kaspad.pid`; current default DB path uses `datadir`, and no PID-file behavior is evidenced in current daemon sources/startup logs. [E4][E21]
- Network directory naming omits testnet suffix; current path pattern is `kaspa-<network-id>` (e.g., `kaspa-testnet-10`). [E6][E7]

**Proposed fixes**
1. Rewrite config-file section to require explicit `--configfile` and show TOML key-value examples.
2. Update defaults: `outpeers=8`, `perf-metrics-interval-sec=10`.
3. Replace `--sanity` text with current behavior note (or remove until flag semantics are restored).
4. Replace directory tree with `.../kaspa-mainnet/datadir/...` and testnet note `kaspa-testnet-10`.

---

### `content/docs/node-operations/docker.mdx` — **ISSUES**
**Verified**
- Building a custom image from source is supported (official repo includes Dockerfiles/build scripts). [E20]

**Issues**
- “Official rusty-kaspa repository does not publish pre-built Docker images” is incorrect. Official docs instruct `docker pull kaspanet/rusty-kaspad:latest`, and Docker Hub shows active tags. [E18][E19]
- Healthcheck uses `nc -z`, but the provided runtime image example does not install netcat; this check fails unless the image is modified. [E20]
- Compose example publishes `17110/18110` without enabling corresponding wRPC listeners in `command`; this is operationally inconsistent. wRPC is disabled unless explicitly enabled. [E8][E9]

**Unverified**
- Resource minimums in this page (8 GB / 4 cores) are not backed by primary node-operation docs and conflict with official run-node guide minimums. [E18]

**Proposed fixes**
1. Replace “no official image” with official image usage (`kaspanet/rusty-kaspad`) and pin-tag guidance.
2. Either install netcat in Dockerfile example or change healthcheck to an available probe.
3. Add `--rpclisten-borsh` / `--rpclisten-json` when documenting exposed 17110/18110 ports.
4. Align resource recommendations with official docs or label them as environment-specific estimates.

---

### `content/docs/node-operations/monitoring.mdx` — **ISSUES**
**Verified**
- `GetInfo`, `GetMetrics`, and `GetSyncStatus` methods exist. [E10][E11]

**Issues**
- `GetInfo` is documented as returning network name and virtual DAA score; it does not. Those fields are in `GetServerInfo`. [E10][E11]
- `GetSyncStatus` is documented with phase details (header/UTXO/body sync); current response is only `isSynced`. [E11]
- `GetMetrics` section includes “known addresses” metric not present in current metrics schema/implementation. [E11][E12]
- Example log markers (`[INF] Blue score:`, `[INF] Accepted block`) do not match current primary monitor/perf log patterns. [E13][E14][E21]

**Unverified**
- “Healthy ranges” and “overhead is negligible” claims are operational guidance, not source-backed invariants.

**Proposed fixes**
1. Move network/virtual-DAA content from `GetInfo` to `GetServerInfo`.
2. Rewrite `GetSyncStatus` section to `isSynced` semantics only.
3. Update log examples to current emitted messages (e.g., “Processed X blocks and Y headers…”).
4. Mark threshold tables as starting recommendations, not protocol facts.

---

### `content/docs/node-operations/running-a-node.mdx` — **ISSUES**
**Verified**
- Build/start commands are valid; prebuilt binaries are available via releases. [E24]
- Default gRPC/P2P ports are correct for mainnet. [E5]

**Issues**
- Default data directory table is outdated (`~/.kaspad`, macOS Application Support path, `%APPDATA%`). Current defaults use `.rusty-kaspa` (non-Windows) and `LocalAppData/rusty-kaspa` (Windows), with `.../<network>/datadir`. [E4][E21]
- Testnet directory naming should include suffix (`kaspa-testnet-10`). [E6][E7]
- “`--utxoindex` required for solo mining” is overstated; primary docs only assert wallet necessity, and node RPC mining paths do not enforce utxoindex as a hard prerequisite. [E24][E12]

**Unverified**
- Hardware minimums and sync-time estimates are not provable as fixed facts from primary sources; official docs currently recommend materially higher minimums. [E18][E22]

**Proposed fixes**
1. Replace platform path table with current `rusty-kaspa` paths.
2. Soften UTXO-index wording to “required for wallet/address-indexed queries; commonly enabled for miner/wallet stacks.”
3. Reframe hardware/sync-time as environment-dependent ranges with source citation.

---

### `content/docs/node-operations/simnet.mdx` — **ISSUES**
**Verified**
- Simnet isolation, default ports, and address prefix are correct. [E5][E15][E17]
- `kaspad` has no `--mining-address` flag (correct). [E1]

**Issues**
- Mining description frames simnet as “minimal/relaxed difficulty”; current simnet config sets `skip_proof_of_work: true` (simulated PoW), which is a stronger/different behavior. [E17]

**Unverified**
- Performance-style statements (“as fast as your CPU can produce”) are plausible but not source-guaranteed.

**Proposed fixes**
1. Replace “low/minimal difficulty” wording with “PoW is simulated (`skip_proof_of_work=true`) on simnet.”
2. Keep mining walkthrough but label throughput claims as approximate.

---

### `content/docs/node-operations/testnet.mdx` — **ISSUES**
**Verified**
- `--testnet` flag and default testnet-10 ports are correct (`16210`, `16211`, `17210`, `18210`). [E1][E5]
- `kaspatest:` prefix is correct. [E15]

**Issues**
- The page states two actively maintained node testnets (`testnet-10` and `testnet-11`) for kaspad operation. Current consensus params accept only suffix `10`; other suffixes are unsupported in `Params::from(NetworkId)`. [E7]
- Directory naming omits suffix (should be `kaspa-testnet-10`). [E6][E7]

**Unverified**
- Faucet availability/process and reset cadence are ecosystem/ops facts not provable from primary code/docs in this audit.

**Proposed fixes**
1. Update network section to current supported testnet suffixes for `kaspad` (today: `10`).
2. Fix directory naming and remove unsupported `testnet-11` operational instructions unless/when params support it.

---

### `content/docs/node-operations/troubleshooting.mdx` — **UNVERIFIED**
**Verified**
- `--reset-db` behavior, `--rpclisten` default loopback, and network gRPC ports are consistent with current implementation. [E4][E5]
- `--ram-scale` bounds (`0.1..10.0`) are enforced. [E25]

**Unverified (no strong primary-source proof as stated)**
- Fixed bandwidth thresholds (e.g., “at least 10 Mbps”), expected sync speed outcomes, and “normality” of specific validation/log error frequencies.
- Dependency failure examples are platform/build-context dependent rather than stable runtime facts.

**Proposed fixes**
1. Keep this page, but relabel heuristics as “common causes” and remove hard numeric guarantees unless source-cited.
2. Add links to current release notes for version-specific failure modes.

---

### `content/docs/node-operations/upgrading.mdx` — **UNVERIFIED**
**Verified**
- Crescendo 1→10 BPS framing is correct; activation DAA score aligns with current params and project docs. [E22][E7]
- GHOSTDAG `k` values (1 BPS `18`, 10 BPS `124`) and subsidy-per-block scaling by BPS are consistent with code. [E23]

**Unverified**
- Broad compatibility guarantees (“minor versions generally backward-compatible”, reset expectations, rollback viability) are release-specific and not universally guaranteed by static sources.

**Proposed fixes**
1. Convert compatibility statements into release-note-driven guidance (“check target release notes for DB compatibility/reset requirements”).
2. Replace generic rollback guarantees with conditional language and explicit prechecks.

## Evidence Index
- **[E1]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:102`
- **[E2]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:214`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:474`
- **[E3]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:167`
- **[E4]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:67`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:325`, `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:551`
- **[E5]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:42`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:238`
- **[E6]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:266`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:327`
- **[E7]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:517`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:605`
- **[E8]** `/Users/luke/Projects/rusty-kaspa/README.md:348`
- **[E9]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:724`
- **[E10]** `/Users/luke/Projects/rusty-kaspa/rpc/core/src/model/message.rs:266`
- **[E11]** `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto:861`, `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto:882`, `/Users/luke/Projects/rusty-kaspa/rpc/grpc/core/proto/rpc.proto:895`
- **[E12]** `/Users/luke/Projects/rusty-kaspa/rpc/service/src/service.rs:1103`
- **[E13]** `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/monitor.rs:52`
- **[E14]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:590`
- **[E15]** `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:65`
- **[E16]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/network.rs:245`
- **[E17]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:679`
- **[E18]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/node_operations/docs_kas_fyi_run_a_node.md:149`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/node_operations/docs_kas_fyi_run_a_node.md:604`
- **[E19]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/node_operations/dockerhub_kaspanet_rusty_kaspad_tags_summary.json:1`
- **[E20]** `/Users/luke/Projects/rusty-kaspa/docker/Dockerfile.kaspad:2`, `/Users/luke/Projects/rusty-kaspa/docker/Dockerfile.kaspad:41`
- **[E21]** `/Users/luke/Projects/rusty-kaspa/prune-batching-tests/mainnet-2026-01-23.log:2`
- **[E22]** `/Users/luke/Projects/rusty-kaspa/docs/crescendo-guide.md:3`, `/Users/luke/Projects/rusty-kaspa/docs/crescendo-guide.md:7`
- **[E23]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:40`, `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:136`
- **[E24]** `/Users/luke/Projects/rusty-kaspa/README.md:282`, `/Users/luke/Projects/rusty-kaspa/README.md:302`
- **[E25]** `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:107`
