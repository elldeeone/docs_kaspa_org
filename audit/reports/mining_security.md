# Mining + Security Fact-Check Report

Date: 2026-02-27
Scope:
- `content/docs/mining/block-rewards.mdx`
- `content/docs/mining/difficulty-adjustment.mdx`
- `content/docs/mining/hardware.mdx`
- `content/docs/mining/kheavyhash.mdx`
- `content/docs/mining/pool-mining.mdx`
- `content/docs/mining/solo-mining.mdx`
- `content/docs/security/responsible-disclosure.mdx`
- `content/docs/security/security-model.mdx`
- `content/docs/security/staying-safe.mdx`

Primary sources used:
- `/Users/luke/Projects/rusty-kaspa` (`15cee1a4`)
- `/Users/luke/Projects/kips` (`2a77c95`)
- Official/public docs pages referenced in citations

## Status Summary

| File | Status | Summary |
|---|---|---|
| `content/docs/mining/block-rewards.mdx` | **ISSUES** | Core reward mechanics mostly match consensus, but supply cap/time-to-50% and immutability claims are inaccurate. |
| `content/docs/mining/difficulty-adjustment.mdx` | **ISSUES** | Core constants are right; DAA-score definition, coinbase-maturity unit, timestamp-trimming description, and hashrate formula are inaccurate. |
| `content/docs/mining/hardware.mdx` | **UNVERIFIED** | Hardware models/specs/prices/timeline are off-chain, fast-changing, and uncited; not verifiable from required primary sources. |
| `content/docs/mining/kheavyhash.mdx` | **ISSUES** | PoW pipeline partially correct, but matrix derivation/rotation and matrix math description do not match implementation. |
| `content/docs/mining/pool-mining.mdx` | **UNVERIFIED** | Pool URLs/fees/payout methods and miner CLI flags are operational and volatile; no source-of-truth citations provided. |
| `content/docs/mining/solo-mining.mdx` | **ISSUES** | `--utxoindex` claimed as required for mining is incorrect; several operational values/commands are uncited and version-sensitive. |
| `content/docs/security/responsible-disclosure.mdx` | **ISSUES** | Includes concrete policy/SLA/scope claims that are not supported by the project’s published security policy state. |
| `content/docs/security/security-model.mdx` | **ISSUES** | Some constants are correct; reversal math table conflicts with its own formula, pruning/finality wording is incorrect, and several security-threshold claims are unsupported. |
| `content/docs/security/staying-safe.mdx` | **ISSUES** | Main practices are sound, but “24-word seed phrase” is too strict/inaccurate (Kaspa ecosystem supports 12 and 24 words). |

---

## 1) `content/docs/mining/block-rewards.mdx` — **ISSUES**

### Verified
- Red/blue reward handling is consistent with consensus coinbase construction (blue rewards to blue blocks; red rewards aggregated to merging block). [R1]
- Coinbase subsidy is validated against DAA score by nodes. [R2]
- Coinbase maturity is 100 seconds * BPS, i.e. `1000` at 10 BPS. [R3]

### Issues
1. **DAA score is described as “cumulative proof-of-work.”**
- Claim location: `block-rewards.mdx:30`
- Why issue: in implementation, DAA score is incremented by DAA-eligible block count in mergeset context, not presented as cumulative PoW. [R4]
- Proposed fix: rewrite as “DAA score is a consensus-time counter used for subsidy/locks.”

2. **Supply cap value is inaccurate.**
- Claim location: `block-rewards.mdx:95` (“~28.7 billion KAS”).
- Why issue: deriving from consensus constants/table yields ~**28.376B KAS** total emission schedule (mainnet post-Crescendo rounding keeps same order with minor delta). [R5]
- Proposed fix: replace with “~28.38B KAS under current consensus schedule.”

3. **“No governance/protocol change can alter supply/emission” is absolute and false.**
- Claim location: `block-rewards.mdx:98`
- Why issue: consensus parameters and reward mechanism logic are changed by hardfork process (e.g., Crescendo/KIP-14). [K1]
- Proposed fix: “Supply/emission are enforced by consensus rules at a given protocol version; changing them requires a consensus upgrade (hardfork).”

4. **“Time to 50% supply mined similar to Bitcoin (~4 years)” is not supported by current schedule math.**
- Claim location: `block-rewards.mdx:89`
- Why issue: using current constants/table, 50% emission is reached in roughly ~1 year from genesis-time schedule, not ~4 years. [R5]
- Proposed fix: remove row or replace with computed value and methodology note.

---

## 2) `content/docs/mining/difficulty-adjustment.mdx` — **ISSUES**

### Verified
- DAA duration and sparse sampling constants are correct: duration `2641s`, sample interval `4s`, sampled window size `661`, sample rate `40` blocks at 10 BPS. [R6][K2]

### Issues
1. **Timestamp trimming description does not match implementation.**
- Claim location: `difficulty-adjustment.mdx:16-17`
- Why issue: implementation chooses min/max timestamps and removes only the min-timestamp block from target averaging; no generalized “sorted and trimmed outliers” step as described. [R7]
- Proposed fix: describe exact `min_ts/max_ts + average_target over internal window` behavior.

2. **Coinbase maturity unit is wrong (“measured in blue score”).**
- Claim location: `difficulty-adjustment.mdx:45`
- Why issue: maturity check is against **DAA score** (`entry.block_daa_score + coinbase_maturity > pov_daa_score`). [R8]
- Proposed fix: replace “blue score” with “DAA score.”

3. **DAA score definition is inaccurate (“cumulative difficulty”).**
- Claim location: `difficulty-adjustment.mdx:42`
- Why issue: code increments DAA score by DAA-eligible mergeset count; this is not documented as cumulative work metric. [R4]
- Proposed fix: define as consensus-time/ordering score used by subsidy and timelocks.

4. **Hashrate formula is not the one used by node estimation logic.**
- Claim location: `difficulty-adjustment.mdx:63`
- Why issue: node-side estimation uses blue-work delta over measured window time, not `difficulty / target_interval`. [R9]
- Proposed fix: either remove formula or label it as rough heuristic and add the node’s actual estimation method.

5. **“Visible adjustment within one to two minutes” is uncited heuristic.**
- Claim location: `difficulty-adjustment.mdx:34`
- Status: unverified from primary consensus specs.
- Proposed fix: mark as empirical expectation, or remove.

---

## 3) `content/docs/mining/hardware.mdx` — **UNVERIFIED**

### Why unverified
- Contains many fast-changing operational claims that are not in consensus/KIP/whitepaper sources:
  - GPU hashrate/power tables (`hardware.mdx:20-41`)
  - ASIC model specs (`hardware.mdx:73-85`)
  - Market timeline/profitability/pricing thresholds (`hardware.mdx:113-157`)
- No source links with as-of dates are provided.

### Proposed fix
1. Add per-row citations to manufacturer datasheets and pool/benchmark sources with `Last verified: YYYY-MM-DD`.
2. Move volatile figures to an externally maintained “live benchmarks” page.
3. Keep this doc focused on stable guidance (units, method, risk factors), not numeric market snapshots.

---

## 4) `content/docs/mining/kheavyhash.mdx` — **ISSUES**

### Verified
- cSHAKE domains and two hash stages (`ProofOfWorkHash` then `HeavyHash`) are correct. [R10]
- Pipeline shape `pre_pow -> matrix heavy step -> final cSHAKE` is directionally correct. [R11]

### Issues
1. **Matrix derivation/rotation claim is incorrect.**
- Claim location: `kheavyhash.mdx:52-56` (MUHASH checkpoint / epoch periodic matrix)
- Why issue: matrix is generated from each block’s `pre_pow_hash` (`Matrix::generate(pre_pow_hash)`), i.e., effectively per-header context, not epoch/MUHASH committed schedule. [R11][R12]
- Proposed fix: describe matrix as derived from `pre_pow_hash` and stable for that header template while nonce-searching.

2. **Matrix arithmetic description is inaccurate.**
- Claim location: `kheavyhash.mdx:28-33`
- Why issue: implementation is not expressed as simple GF(16) `mod 2^4` matrix multiply in documentation terms; it performs nibble expansion, accumulations, shifts, recomposition, XOR with original hash, then `KHeavyHash`. [R12]
- Proposed fix: replace pseudocode with implementation-faithful pseudocode.

3. **Optical-mining assertions are uncited in required primary sources.**
- Claim location: `kheavyhash.mdx:62-70`
- Status: unverified from provided code/KIP corpus.
- Proposed fix: either add explicit whitepaper/research citations or mark as speculative background.

---

## 5) `content/docs/mining/pool-mining.mdx` — **UNVERIFIED**

### Why unverified
- Pool endpoints/fees/payout methods are operational and change frequently (`pool-mining.mdx:26-32`).
- Miner commands/flags are version-specific (`pool-mining.mdx:51-92`) and not sourced.
- No citation links with tested versions/dates.

### Proposed fix
1. Replace hardcoded pool table with “example pools” plus official source links and verification date.
2. Annotate miner commands with tested miner version and source docs.
3. Add explicit warning that pool policy is off-protocol and must be checked at pool site.

---

## 6) `content/docs/mining/solo-mining.mdx` — **ISSUES**

### Issues
1. **`--utxoindex` required for mining is incorrect.**
- Claim location: `solo-mining.mdx:45-49`
- Why issue: block-template RPC path does not gate on `utxoindex`; `utxoindex` is checked for address/UTXO index RPC methods. [R13][R14]
- Proposed fix: change to “`--utxoindex` is required for address/UTXO-indexed wallet RPC queries, not for basic block-template mining.”

2. **Several miner CLI examples are tool/version dependent and uncited.**
- Claim locations: `solo-mining.mdx:106-120`
- Status: unverified.
- Proposed fix: label as examples with tested versions and upstream docs links.

3. **Storage recommendation is uncited (`>=50 GB`).**
- Claim location: `solo-mining.mdx:27`
- Status: unverified from consensus/KIP sources.
- Proposed fix: cite current node-ops requirement page or remove hard number.

---

## 7) `content/docs/security/responsible-disclosure.mdx` — **ISSUES**

### Issues
1. **Published policy/SLA claims are unsupported.**
- Claim locations: scope table and 72h acknowledgment (`responsible-disclosure.mdx:24-32,55,63-70`).
- Why issue: repository security page currently shows no security policy and no advisories. [O1]
- Proposed fix: avoid guaranteed SLA/scope claims unless backed by an official published policy URL.

2. **Scope includes non-repo assets without authoritative policy doc.**
- Claim location: `responsible-disclosure.mdx:29-31`
- Status: unverified.
- Proposed fix: separate “officially covered by published policy” vs “best-effort contact paths.”

---

## 8) `content/docs/security/security-model.mdx` — **ISSUES**

### Verified
- `k=124` at 10 BPS with `D=5`, `delta=0.01` is consistent with current parameterization. [R15][K1]
- Finality depth at 10 BPS is `432,000` blue score (12 hours). [R3][K1]

### Issues
1. **Reversal probability table conflicts with stated formula.**
- Claim location: formula and table (`security-model.mdx:56-70`)
- Why issue: applying `P ≈ (q/(1-q))^d < 0.001` yields much smaller `d` than table values (e.g. q=0.1 gives d≈4, not ~7).
- Proposed fix: either correct formula+table pair, or remove both and link to formal analysis source.

2. **“Pruning removes old data below finality point” is incorrect wording.**
- Claim location: `security-model.mdx:78`
- Why issue: pruning is based on **pruning depth** (configured deeper than finality depth), not finality depth itself. [R3]
- Proposed fix: replace with “pruning operates relative to pruning point/depth; finality is a separate depth notion used in virtual chain selection.”

3. **“Effective attack threshold higher than 50%” lacks formal source citation.**
- Claim location: `security-model.mdx:26`
- Status: unverified from cited primary material.
- Proposed fix: soften to “DAG structure improves honest-block utilization; attack analysis still depends on formal assumptions and model.”

---

## 9) `content/docs/security/staying-safe.mdx` — **ISSUES**

### Issues
1. **Seed-phrase length is overstated as always 24 words.**
- Claim location: `staying-safe.mdx:12`
- Why issue: Kaspa wallet stack supports both 12-word and 24-word mnemonics. [R16]
- Proposed fix: “Your 12- or 24-word mnemonic seed phrase...”

### Notes
- Most remaining guidance is best-practice security advice and does not conflict with consensus code.

---

## Recommended Remediation Order

1. Fix consensus-critical inaccuracies first:
   - `kheavyhash.mdx`, `difficulty-adjustment.mdx`, `block-rewards.mdx`, `solo-mining.mdx`, `security-model.mdx`
2. Replace unverifiable operational tables with sourced snapshots:
   - `hardware.mdx`, `pool-mining.mdx`
3. Normalize policy language to published facts only:
   - `responsible-disclosure.mdx`, `staying-safe.mdx`

---

## Evidence Index

### Rusty-Kaspa / KIPs
- [R1] `rusty-kaspa/consensus/src/processes/coinbase.rs:107-132` (blue/red reward allocation)
- [R2] `rusty-kaspa/consensus/src/pipeline/body_processor/body_validation_in_context.rs:63-74` (subsidy validation)
- [R3] `rusty-kaspa/consensus/core/src/config/constants.rs:69-73,90-91`; `rusty-kaspa/consensus/core/src/config/bps.rs:92-107,119-120` (finality/pruning/maturity constants)
- [R4] `rusty-kaspa/consensus/src/processes/difficulty.rs:31-34` (DAA score calculation path)
- [R5] `rusty-kaspa/consensus/core/src/config/bps.rs:131-137`; `rusty-kaspa/consensus/src/processes/coinbase.rs:21-27,280-299` (emission constants/table used for cap derivation)
- [R6] `rusty-kaspa/consensus/core/src/config/constants.rs:57-63`; `rusty-kaspa/consensus/core/src/config/bps.rs:114-117` (DAA duration/window/sample rate)
- [R7] `rusty-kaspa/consensus/src/processes/difficulty.rs:230-247` (difficulty target computation mechanics)
- [R8] `rusty-kaspa/consensus/src/processes/transaction_validator/tx_validation_in_utxo_context.rs:75-87` (coinbase maturity checked with DAA score)
- [R9] `rusty-kaspa/consensus/src/processes/difficulty.rs:46-67` (node hashrate estimation method)
- [R10] `rusty-kaspa/crypto/hashes/src/pow_hashers.rs:10-12,40-42,52-59` (cSHAKE domains and hash functions)
- [R11] `rusty-kaspa/consensus/pow/src/lib.rs:29-44` (pre_pow_hash -> matrix -> heavy hash flow)
- [R12] `rusty-kaspa/consensus/pow/src/matrix.rs:28-35,101-125`; `rusty-kaspa/consensus/core/src/hashing/header.rs:7-27` (matrix generation input and math)
- [R13] `rusty-kaspa/rpc/service/src/service.rs:359-386` (GetBlockTemplate path)
- [R14] `rusty-kaspa/rpc/service/src/service.rs:696-718` (`utxoindex` required for address/balance RPC)
- [R15] `rusty-kaspa/consensus/core/src/config/constants.rs:12-17`; `rusty-kaspa/consensus/core/src/config/bps.rs:38-41`
- [R16] `rusty-kaspa/wallet/bip32/src/mnemonic/phrase.rs:25-40`; `rusty-kaspa/cli/src/modules/account.rs:76-82`
- [K1] `kips/kip-0014.md:31-49,55-63,85-91`
- [K2] `kips/kip-0014.md:86-90`

### Official/Public Policy Page
- [O1] https://github.com/kaspanet/rusty-kaspa/security (shows “No security policy detected” and no advisories at audit time)
