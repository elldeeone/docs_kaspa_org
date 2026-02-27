# Reference + Protocol Evolution Fact-Check (reference.txt + protocol_evolution.txt)

Date: 2026-02-27

## Scope
Audited files:
1. `content/docs/reference/api-reference.mdx`
2. `content/docs/reference/emission-schedule.mdx`
3. `content/docs/reference/glossary.mdx`
4. `content/docs/reference/network-params.mdx`
5. `content/docs/reference/research-papers.mdx`
6. `content/docs/reference/specifications.mdx`
7. `content/docs/protocol-evolution/crescendo.mdx`
8. `content/docs/protocol-evolution/kip-index.mdx`
9. `content/docs/protocol-evolution/kips-overview.mdx`
10. `content/docs/protocol-evolution/roadmap.mdx`

Primary evidence used:
- `rusty-kaspa` source under `/Users/luke/Projects/rusty-kaspa`
- `kips` source under `/Users/luke/Projects/kips`
- Official research-paper records (IACR ePrint/ACM/DBLP URLs cited below)

Status definitions:
- `VERIFIED`: all factual claims in the file were confirmed from primary sources.
- `ISSUES`: at least one factual claim is contradicted by primary sources.
- `UNVERIFIED`: at least one factual claim could not be proven from available primary sources.

## Status Summary
| File | Status |
|---|---|
| `content/docs/reference/api-reference.mdx` | `ISSUES` |
| `content/docs/reference/emission-schedule.mdx` | `UNVERIFIED` |
| `content/docs/reference/glossary.mdx` | `ISSUES` |
| `content/docs/reference/network-params.mdx` | `ISSUES` |
| `content/docs/reference/research-papers.mdx` | `ISSUES` |
| `content/docs/reference/specifications.mdx` | `ISSUES` |
| `content/docs/protocol-evolution/crescendo.mdx` | `UNVERIFIED` |
| `content/docs/protocol-evolution/kip-index.mdx` | `ISSUES` |
| `content/docs/protocol-evolution/kips-overview.mdx` | `UNVERIFIED` |
| `content/docs/protocol-evolution/roadmap.mdx` | `UNVERIFIED` |

---

## 1) `content/docs/reference/api-reference.mdx` — `ISSUES`

### A. “Comprehensive reference of all Kaspa RPC methods” is inaccurate
- Claim: `api-reference.mdx:3`
- Evidence: many RPC methods exist in code but are absent from this page (e.g., `GetMetrics`, `GetSystemInfo`, `GetServerInfo`, `GetSyncStatus`, `GetCurrentNetwork`, `GetVirtualChainFromBlockV2`, etc.) in `rpc/core/src/api/ops.rs:59-143`.
- Proposed fix: change title/description to “Selected/common RPC methods” or expand page to include full method surface.

### B. Method names use deprecated “virtual selected parent” terminology where API uses “sink”
- Claim: `api-reference.mdx:255`, `api-reference.mdx:274`, `api-reference.mdx:328`, `api-reference.mdx:461`
- Evidence:
  - Ops enum uses `NotifySinkBlueScoreChanged` and `GetSinkBlueScore`: `rpc/core/src/api/ops.rs:42`, `rpc/core/src/api/ops.rs:116`
  - Request/response types are `NotifySinkBlueScoreChangedRequest` and `GetSinkBlueScore*`: `rpc/core/src/model/message.rs:3250-3252`, `rpc/core/src/model/message.rs:1403-1423`
- Proposed fix: rename docs to `notifySinkBlueScoreChanged` and `getSinkBlueScore`; keep a compatibility note if older names are still supported in some clients.

### C. `getBlockDagInfo` response schema is incomplete/mismatched
- Claim: `api-reference.mdx:40-49`
- Evidence: response struct fields are `network`, `block_count`, `header_count`, `tip_hashes`, `difficulty`, `past_median_time`, `virtual_parent_hashes`, `pruning_point_hash`, `virtual_daa_score`, `sink` in `rpc/core/src/model/message.rs:1041-1053`.
- Proposed fix:
  - Replace `networkName` with `network`
  - Add missing `sink`
  - Keep field naming in camelCase for JSON (`network`, `blockCount`, ..., `sink`).

### D. `getBlocks.lowHash` is optional, not required
- Claim: `api-reference.mdx:77`
- Evidence: `low_hash: Option<RpcHash>` in `rpc/core/src/model/message.rs:936-939`.
- Proposed fix: mark `lowHash` as optional.

### E. `submitBlock` return shape is wrong
- Claim: `api-reference.mdx:123-126`
- Evidence: response is `SubmitBlockResponse { report: SubmitBlockReport }` with `Success` or `Reject(reason)` in `rpc/core/src/model/message.rs:78-96`.
- Proposed fix: document `report` enum/object rather than `rejectReason: string`.

### F. `getConnectedPeerInfo` response field name is wrong
- Claim: `api-reference.mdx:358`
- Evidence: response field is `peer_info` (JSON: `peerInfo`) in `rpc/core/src/model/message.rs:592-596`.
- Proposed fix: rename documented field from `infos` to `peerInfo`.

### G. `getMempoolEntry` parameter name is wrong
- Claim: `api-reference.mdx:236`
- Evidence: request field is `transaction_id` (JSON: `transactionId`) in `rpc/core/src/model/message.rs:447-451`.
- Proposed fix: replace `txId` with `transactionId`.

### H. UTXO entry `address` is optional
- Claim: `api-reference.mdx:158`
- Evidence: `address: Option<RpcAddress>` in `rpc/core/src/model/address.rs:10-13`.
- Proposed fix: document as nullable/optional.

---

## 2) `content/docs/reference/emission-schedule.mdx` — `UNVERIFIED`

Verified portions:
- Chromatic monthly factor concept and table mechanism align with code (`SUBSIDY_BY_MONTH_TABLE`, month-based subsidy logic): `consensus/src/processes/coinbase.rs:222-254`, `consensus/src/processes/coinbase.rs:279+`
- Red/blue reward handling aligns with code: `consensus/src/processes/coinbase.rs:107-131`
- Coinbase maturity scaling to `1000` at 10 BPS is consistent with BPS constants: `consensus/core/src/config/bps.rs:119-121`

Unverified/insufficiently sourced claims:
- Supply progression percentages table (`emission-schedule.mdx:62-69`) is not traceable to a canonical published calculation in the scoped primary sources.
- “No foundation allocation / no pre-mine / no developer tax” (`emission-schedule.mdx:72`) is not directly provable from `rusty-kaspa` and `kips` alone.
- “Hardcoded and cannot be changed” phrasing (`emission-schedule.mdx:72`) is governance-sensitive and not strictly provable from code snapshots.

Proposed fix:
- Add explicit derivation notes and source links for each numeric supply claim.
- Rephrase absolutes to protocol-rule language (e.g., “under current consensus rules”).

---

## 3) `content/docs/reference/glossary.mdx` — `ISSUES`

### A. Transaction mass definition conflates mempool simplification with consensus rules
- Claim: `glossary.mdx:118-119`
- Evidence:
  - Code explicitly says `max(...)` mass has no consensus meaning: `consensus/core/src/mass/mod.rs:163-166`, `consensus/core/src/mass/mod.rs:188-191`
  - Consensus checks compute/transient/storage limits independently: `consensus/src/pipeline/body_processor/body_validation_in_isolation.rs:82-90`
  - `100,000` per-transaction cap is standardness policy in mempool: `mining/src/mempool/check_transaction_standard.rs:36-39`, `mining/src/mempool/check_transaction_standard.rs:65-70`, `mining/src/mempool/check_transaction_standard.rs:175-177`
- Proposed fix: split “consensus block mass limits” from “mempool standard transaction policy”.

### B. DAA score definition is inaccurate
- Claim: `glossary.mdx:170`
- Evidence: DAA score increments by selected-parent DAA score plus DAA-eligible mergeset contribution, not simply “number of selected-parent-chain blocks”: `consensus/src/processes/difficulty.rs:31-34`, `consensus/src/processes/difficulty.rs:210-214`.
- Proposed fix: describe DAA score as a monotonic consensus clock including selected parent + eligible mergeset increments.

### C. kHeavyHash description does not match implementation details
- Claim: `glossary.mdx:158`
- Evidence: implementation uses 4-bit matrix-generated values with integer accumulation/bit-shift mixing + XOR + `KHeavyHash`, not a strict GF(2^4) linear algebra spec: `consensus/pow/src/matrix.rs:47`, `consensus/pow/src/matrix.rs:101-125`.
- Proposed fix: rewrite as “matrix-derived heavy-mixing step over 4-bit-expanded hash data,” avoiding strict GF claim unless formally specified.

### D. Testnet statement is stale vs current `Params` support
- Claim: `glossary.mdx:215`
- Evidence: `Params::from(NetworkId)` currently supports only `testnet-10`; other suffixes panic: `consensus/core/src/config/params.rs:517-520`.
- Proposed fix: state currently supported consensus testnet in `rusty-kaspa` is `testnet-10`; mention other testnet suffixes only as historical/contextual.

### E. Pruning description overstates header retention
- Claim: `glossary.mdx:227`
- Evidence: pruning path can delete headers and related stores: `consensus/src/pipeline/pruning_processor/processor.rs:535-538`, `consensus/src/pipeline/pruning_processor/processor.rs:515-533`.
- Proposed fix: “Pruned nodes retain the headers/state required by consensus and pruning-point rules; old headers/bodies are pruned beyond retained windows.”

---

## 4) `content/docs/reference/network-params.mdx` — `ISSUES`

### A. “Derived directly from rusty-kaspa” conflicts with testnet-11 presentation as active param set
- Claim: `network-params.mdx:13`, `network-params.mdx:226-246`
- Evidence: current `Params::from(NetworkId)` supports `testnet-10` only: `consensus/core/src/config/params.rs:517-520`.
- Proposed fix: mark testnet-11 rows as historical/non-current, or remove from “current params” tables.

### B. “Maximum transaction mass 100,000” presented as protocol rule
- Claim: `network-params.mdx:58`
- Evidence: 100,000 is mempool standardness policy (`MAXIMUM_STANDARD_TRANSACTION_MASS`), not a consensus protocol constant: `mining/src/mempool/check_transaction_standard.rs:36-39`, `mining/src/mempool/check_transaction_standard.rs:65-70`.
- Proposed fix: relabel as “standard mempool policy limit”.

### C. Effective mass `max(compute, transient, storage)` is documented as consensus rule
- Claim: `network-params.mdx:67-77`
- Evidence: code states this max has no consensus meaning; consensus enforces separate per-dimension block limits: `consensus/core/src/mass/mod.rs:163-166`, `consensus/core/src/mass/mod.rs:188-191`, `consensus/src/pipeline/body_processor/body_validation_in_isolation.rs:82-90`.
- Proposed fix: clarify this max is for mempool/block-template simplification, not consensus validation.

### D. `MAX_SOMPI` is misrepresented as monetary supply cap
- Claim: `network-params.mdx:154`
- Evidence: `MAX_SOMPI` is used as max transaction amount/range constraint: `consensus/core/src/constants.rs:23-24`, `consensus/src/processes/transaction_validator/tx_validation_in_isolation.rs:138-150`.
- Proposed fix: rename to “maximum allowed transaction output/total amount bound,” and separate from emission schedule.

### E. Relay fee unit is wrong
- Claim: `network-params.mdx:194`
- Evidence: default is `1000` sompi per **1kg (1000 grams)**: `mining/src/mempool/config.rs:17-20`; fee calculation divides by 1000 and applies floor: `mining/src/mempool/check_transaction_standard.rs:220-224`.
- Proposed fix: change wording to “1000 sompi per 1000 grams (kg) of mass.”

### F. P2P protocol table has incorrect message-size and timeout values
- Claim: `network-params.mdx:276-277`
- Evidence:
  - max message size is 1GB: `protocol/p2p/src/core/connection_handler.rs:45`
  - default protocol timeout is 120s: `protocol/p2p/src/common.rs:8`
  - handshake phase waits are 4s (version/verack) and 8s (ready): `protocol/p2p/src/handshake.rs:30`, `protocol/p2p/src/handshake.rs:50`, `protocol/p2p/src/handshake.rs:64`
- Proposed fix: update table to real values and separate “global protocol timeout” from per-phase handshake waits.

---

## 5) `content/docs/reference/research-papers.mdx` — `ISSUES`

### A. PHANTOM authorship is incomplete
- Claim: `research-papers.mdx:14`
- Evidence: ePrint record lists Yonatan Sompolinsky, Shai Wyborski, Aviv Zohar: https://eprint.iacr.org/2018/104
- Proposed fix: add Shai Wyborski to PHANTOM authors.

### B. PHANTOM update date is stale
- Claim: `research-papers.mdx:16`
- Evidence: ePrint history includes 2021 revisions: https://eprint.iacr.org/2018/104
- Proposed fix: update to “updated through 2021” (or “multiple revisions”).

### C. DAGKnight authors are incorrect
- Claim: `research-papers.mdx:46`
- Evidence: ePrint record lists Yonatan Sompolinsky and Michael Sutton: https://eprint.iacr.org/2022/1494
- Proposed fix: replace author list accordingly.

### D. “Peer-reviewed leading venues” overstates publication status for core Kaspa papers
- Claim: `research-papers.mdx:8`
- Evidence: PHANTOM and DAGKnight links provided are ePrint preprints (not venue proceedings pages): https://eprint.iacr.org/2018/104, https://eprint.iacr.org/2022/1494
- Proposed fix: rephrase to “research preprints and peer-reviewed related literature,” distinguishing venue-published works from ePrint manuscripts.

Supporting checks for related-work entries:
- CCS 2016 paper appears in ACM accepted papers list: https://www.sigsac.org/ccs/CCS2016/program/accepted-papers.html
- Inclusive Block Chain Protocols listed at FC 2015 (DBLP): https://dblp.org/rec/conf/fc/LewenbergSZ15.html
- Bitcoin Backbone listed at EUROCRYPT 2015 (DBLP): https://dblp.org/rec/conf/eurocrypt/GarayKL15.html

---

## 6) `content/docs/reference/specifications.mdx` — `ISSUES`

### A. Header timestamp type is wrong
- Claim: `specifications.mdx:25` (`int64`)
- Evidence: header timestamp is `u64`: `consensus/core/src/header.rs:141-143`.
- Proposed fix: change type to `uint64`.

### B. “Must reference all current DAG tips” is not always valid
- Claim: `specifications.mdx:37`
- Evidence: max direct parents is capped (`<=16`), and code comments explicitly note situations where not all tips are referenced: `consensus/core/src/config/bps.rs:57-73`.
- Proposed fix: “block references up to `maxBlockParents`; implementations target high tip coverage.”

### C. Block hash description omits domain-separated hasher details
- Claim: `specifications.mdx:48-53`
- Evidence: header hash uses `BlockHash` hasher domain (`b"BlockHash"`) and structured serialization path: `consensus/core/src/hashing/header.rs:8-35`, `crypto/hashes/src/hashers.rs:24-28`.
- Proposed fix: specify domain-separated block hash function, not generic `Blake2b(serialized_header)`.

### D. kHeavyHash algorithm description is overspecified/inaccurate
- Claim: `specifications.mdx:62`, `specifications.mdx:264-266`
- Evidence: current implementation uses generated 4-bit matrix + integer accumulation/shift/XOR + KHeavyHash; not strict GF(2^4) matrix algebra as written: `consensus/pow/src/matrix.rs:47`, `consensus/pow/src/matrix.rs:101-125`.
- Proposed fix: align wording with implementation semantics.

### E. Script opcode section says Blake2b replaces SHA-256 opcodes, but `OP_SHA256` exists
- Claim: `specifications.mdx:214-215`
- Evidence: `OpSHA256` is implemented: `crypto/txscript/src/opcodes/mod.rs:725-730`.
- Proposed fix: remove replacement claim; document both available crypto opcodes and standard script templates.

### F. P2PK-ECDSA script template uses wrong opcode
- Claim: `specifications.mdx:242`
- Evidence: ECDSA path uses `OpCheckSigECDSA` (`0xab`): `crypto/txscript/src/opcodes/mod.rs:745-746`; script-class detector for ECDSA expects this opcode: `crypto/txscript/src/script_class.rs:68-72`.
- Proposed fix: change template to `... OP_CHECKSIGECDSA`.

### G. `SIGHASH_SINGLE` value is wrong
- Claim: `specifications.mdx:278`
- Evidence: `SIG_HASH_SINGLE = 0x04`: `consensus/core/src/hashing/sighash_type.rs:8`.
- Proposed fix: replace `0x03` with `0x04`.

---

## 7) `content/docs/protocol-evolution/crescendo.mdx` — `UNVERIFIED`

Verified portions:
- Core parameter transitions (10 BPS, K=124, parent cap 16, mergeset 248, sample-rate scaling, maturity scaling) align with code/KIP-14:
  - `consensus/core/src/config/bps.rs:40`, `consensus/core/src/config/bps.rs:57-86`, `consensus/core/src/config/bps.rs:109-121`
  - `consensus/core/src/config/constants.rs:57-63`
  - `consensus/core/src/config/params.rs:593`, `consensus/core/src/config/params.rs:648`
  - `/Users/luke/Projects/kips/kip-0014.md:31-54`, `/Users/luke/Projects/kips/kip-0014.md:85-90`

Unverified/insufficiently sourced claims:
- Timeline statements with broad operational assertions (`crescendo.mdx:58-63`, `crescendo.mdx:95-97`) are not fully provable from code/KIP metadata alone.
- Compatibility/business-impact claims (`crescendo.mdx:78-82`) are not directly testable from the scoped primary sources.

Proposed fix:
- Add dated release/announcement references for historical statements.
- Qualify ecosystem-impact language as expected outcomes unless backed by measured data.

---

## 8) `content/docs/protocol-evolution/kip-index.mdx` — `ISSUES`

### A. “Complete index of all KIPs” is currently false
- Claim: `kip-index.mdx:3`, `kip-index.mdx:8`
- Evidence: KIP-16 exists in canonical list (`Draft`) but is missing from the page: `/Users/luke/Projects/kips/README.md:18`.
- Proposed fix: add KIP-16 row in Draft/Proposed section.

### B. Lifecycle/status wording does not match canonical status vocabulary in current KIPs index
- Claim: `kip-index.mdx:8`, `kip-index.mdx:60-69`
- Evidence: canonical table currently uses statuses such as `Implemented`, `Proposed`, `Rejected`, `Active`, `Draft`: `/Users/luke/Projects/kips/README.md:7-18`.
- Proposed fix: either:
  - mirror canonical statuses exactly, or
  - keep process-stage terms but add explicit mapping to canonical status labels.

---

## 9) `content/docs/protocol-evolution/kips-overview.mdx` — `UNVERIFIED`

Reason:
- This page is mostly process/governance narrative. Multiple claims (e.g., expected lifecycle stages, submission/review mechanics, hardfork/softfork prevalence) are not fully codified in `rusty-kaspa` source and are only partially inferable from `kips` repo files.

Verified portions:
- KIP repository link and existence of listed notable KIPs align with `/Users/luke/Projects/kips/README.md`.

Proposed fix:
- Add explicit citation to a canonical governance/process source (if one exists) for lifecycle terminology and state transitions.
- Where process is convention (not strict rule), label it as convention.

---

## 10) `content/docs/protocol-evolution/roadmap.mdx` — `UNVERIFIED`

Reason:
- This page is predominantly forward-looking (research direction, anticipated upgrades, prototypes, long-term vision). These are not strictly verifiable factual statements from current consensus code.

Verified portions:
- Current-state baseline (10 BPS / GHOSTDAG K=124) is consistent with code: `consensus/core/src/config/bps.rs:40`, `consensus/core/src/config/bps.rs:49-54`.

Proposed fix:
- Add citations for concrete present-tense assertions.
- Mark speculative items consistently as proposals/research hypotheses.

---

## Consolidated Fix Checklist
1. `api-reference.mdx`: update sink-related method names/fields, schema mismatches, and “comprehensive” wording.
2. `glossary.mdx`: fix mass/DAA/pruning/testnet and kHeavyHash technical definitions.
3. `network-params.mdx`: correct policy-vs-consensus labels, fee units, P2P limits/timeouts, and testnet-11 presentation.
4. `research-papers.mdx`: correct PHANTOM/DAGKnight author metadata and publication-status wording.
5. `specifications.mdx`: fix timestamp type, sig hash constants, opcode/script details, and hash/pow wording.
6. `kip-index.mdx`: add missing KIP-16 and align status taxonomy with canonical KIPs listing.
7. `emission-schedule.mdx`, `crescendo.mdx`, `kips-overview.mdx`, `roadmap.mdx`: add source citations or qualify currently unverifiable assertions.
