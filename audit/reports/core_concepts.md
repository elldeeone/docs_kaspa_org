# Core Concepts Fact-Check Report

Date: 2026-02-27
Scope source: `/Users/luke/Projects/docs_kaspa_org/audit/chunks/core_concepts.txt`

Method:
- Reviewed every scoped doc file line-by-line.
- Verified claims against primary sources in:
  - `/Users/luke/Projects/rusty-kaspa`
  - `/Users/luke/Projects/kips`
  - Official research references (where available), including SLIP-44 registry for coin type.
- Marked each file as `VERIFIED`, `ISSUES`, or `UNVERIFIED`.

## Status Summary

| File | Status |
|---|---|
| `content/docs/core-concepts/addresses.mdx` | ISSUES |
| `content/docs/core-concepts/blockdag.mdx` | UNVERIFIED |
| `content/docs/core-concepts/dagknight.mdx` | ISSUES |
| `content/docs/core-concepts/difficulty-adjustment.mdx` | ISSUES |
| `content/docs/core-concepts/emission-schedule.mdx` | ISSUES |
| `content/docs/core-concepts/fees-and-mass.mdx` | ISSUES |
| `content/docs/core-concepts/ghostdag.mdx` | UNVERIFIED |
| `content/docs/core-concepts/pruning.mdx` | ISSUES |
| `content/docs/core-concepts/scripting.mdx` | ISSUES |
| `content/docs/core-concepts/spv.mdx` | UNVERIFIED |
| `content/docs/core-concepts/transactions.mdx` | ISSUES |
| `content/docs/core-concepts/utxo-model.mdx` | UNVERIFIED |

---

## 1) `content/docs/core-concepts/addresses.mdx` — ISSUES

### Issue A: “Kaspa uses x-only public keys rather than compressed public keys (33 bytes)” is over-broad
- Doc claim: `addresses.mdx:55-57`
- Primary evidence:
  - Address versions include both `PubKey` and `PubKeyECDSA`: `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:138-145`
  - Lengths are `PubKey=32`, `PubKeyECDSA=33`, `ScriptHash=32`: `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:160-166`
  - Script generation supports both 32-byte Schnorr and 33-byte ECDSA pubkeys: `/Users/luke/Projects/rusty-kaspa/crypto/txscript/src/standard.rs:17-29,40-45`

### Issue B: Address validation lengths are incomplete
- Doc claim: `addresses.mdx:130`
- Primary evidence:
  - Validation-relevant payload sizes include 33-byte `PubKeyECDSA`: `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:160-166`

### Proposed fixes
- Replace the callout at `55-57` with:
  - “Kaspa’s default P2PK flow uses 32-byte x-only Schnorr keys. The protocol also supports 33-byte ECDSA pubkey addresses (`PubKeyECDSA`).”
- Replace validation bullet `130` with:
  - “Data length check: `PubKey`=32 bytes, `PubKeyECDSA`=33 bytes, `ScriptHash`=32 bytes.”

### Verified (no issue)
- Network prefixes (`kaspa`, `kaspatest`, `kaspasim`, `kaspadev`) match source: `/Users/luke/Projects/rusty-kaspa/crypto/addresses/src/lib.rs:65-90,115-120`
- Coin type `111111` is implemented in wallet derivation path and registered in SLIP-44:
  - `/Users/luke/Projects/rusty-kaspa/wallet/keys/src/derivation/gen1/hd.rs:178-205`
  - `https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0044.md` (`Kaspa` line in local copy: `/tmp/core_src_nl/slip-0044.md:1367`)

---

## 2) `content/docs/core-concepts/blockdag.mdx` — UNVERIFIED

No hard contradictions found in core constants/structure checks, including:
- `k=124` at 10 BPS: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:38-41`
- `max_block_parents` clamp to `[10,16]`: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:57-73`
- Network delay bound and tail delta constants: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/constants.rs:12-17`

### Unverified claims requiring stronger sourcing
- Behavioral/performance claims such as fairness effects and implied confirmation UX (`blockdag.mdx:54-57,79-80`) are not directly established by consensus constants/code alone.
- Parent selection randomness/diversity explanation (`blockdag.mdx:18`) should cite the specific implementation path and/or formal analysis.

### Proposed fixes
- Keep protocol-constant claims as-is, but add citations for performance/fairness statements (benchmark/research references), or soften wording to “can/typically” instead of deterministic guarantees.

---

## 3) `content/docs/core-concepts/dagknight.mdx` — ISSUES

### Issue A: Security assumption wording is too strong (“Honest majority only”, “no delay assumptions at all”)
- Doc claims: `dagknight.mdx:8-12,27,56-61`
- Primary evidence:
  - KIP-2 status is `Proposed` (not active): `/Users/luke/Projects/kips/README.md:7-9`, `/Users/luke/Projects/kips/kip-0002.md:7`
  - KIP-2 explicitly notes additional work around global max latency for difficulty/minting/pruning: `/Users/luke/Projects/kips/kip-0002.md:20-21`
  - KIP-2 also states local confirmation policy incorporates effective `k`: `/Users/luke/Projects/kips/kip-0002.md:10-12`

### Proposed fixes
- Replace absolute statements with:
  - “DAGKnight removes fixed network-wide `k` from consensus ordering and adapts confirmation policy to observed conditions; integration with other protocol functions (difficulty/pruning/minting) still requires explicit engineering assumptions.”
- In “Current Status”, explicitly note:
  - “KIP-2 is currently `Proposed` and DAGKnight is not active on mainnet.”

---

## 4) `content/docs/core-concepts/difficulty-adjustment.mdx` — ISSUES

### Issue A: “DAA uses selected parent chain timestamps only” is inaccurate
- Doc claims: `difficulty-adjustment.mdx:35,52,90,104`
- Primary evidence:
  - Difficulty window sampling includes selected parent plus sampled mergeset blocks, not just a single linear chain:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/window.rs:296-317`

### Issue B: “Applied with dampening” is unsupported as written
- Doc claim: `difficulty-adjustment.mdx:49`
- Primary evidence:
  - Current formula uses sampled-window averaging and measured/expected duration ratio, with no explicit dampening coefficient term:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/difficulty.rs:230-247`

### Issue C: Finality/pruning measured in DAA score is incorrect
- Doc claim: `difficulty-adjustment.mdx:69`
- Primary evidence:
  - Pruning/finality depth checks are blue-score based in processing paths:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/pruning_processor/processor.rs:654-658`

### Proposed fixes
- Replace selected-chain-only language with sampled-window language:
  - “DAA samples from the selected-parent context and eligible mergeset blocks according to the configured sample rate.”
- Remove “dampening” term unless a concrete algorithmic dampening parameter is introduced/cited.
- Replace “Finality and pruning thresholds are measured in DAA score” with “...measured in blue score depth.”

---

## 5) `content/docs/core-concepts/emission-schedule.mdx` — ISSUES

### Issue A: Total supply cap value is incorrect
- Doc claims: `emission-schedule.mdx:50-62`
- Primary evidence:
  - Mainnet pre-deflationary params: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:576-583`
  - Deflationary monthly subsidy table: `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/coinbase.rs:280-299`
  - 10-BPS rounding note: total increase about 51 KAS: `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/coinbase.rs:72-75`
- Audit calculation from those constants/tables:
  - Baseline total: `28,376,242,397.9518 KAS`
  - With 10-BPS rounding: `28,376,242,449.6800 KAS`
  - Delta: `+51.7282 KAS`

### Issue B: DAA score wording implies selected-parent-chain-only progression
- Doc claim: `emission-schedule.mdx:66`
- Primary evidence:
  - DAA score increment includes mergeset size minus non-DAA subset:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/difficulty.rs:31-34,201-214`

### Proposed fixes
- Replace “~28.7B hard cap” with the computed total and note rounding delta explicitly.
- Reword DAA score description to include mergeset contribution (not just selected parent chain advancement).

---

## 6) `content/docs/core-concepts/fees-and-mass.mdx` — ISSUES

### Issue A: Mass model presentation conflates mempool simplification with consensus enforcement
- Doc claim: `fees-and-mass.mdx:31-38`
- Primary evidence:
  - `max(compute, transient, storage)` is documented as mempool-level simplification (no consensus meaning):
    - `/Users/luke/Projects/rusty-kaspa/consensus/core/src/mass/mod.rs:163-166,188-193`
  - Block validation enforces each mass dimension independently against block limit:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/body_processor/body_validation_in_isolation.rs:82-90`

### Issue B: Hard-coded dust thresholds (`0.019/0.02 KAS`) are incorrect as protocol facts
- Doc claims: `fees-and-mass.mdx:134-137,222-232,311`
- Primary evidence:
  - Dust is policy-calculated from output size and minimum relay fee, not a fixed KAS protocol constant:
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/check_transaction_standard.rs:107-163`
  - Default relay fee basis: `1000 sompi/kg`:
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/config.rs:17-20`

### Issue C: “fee_rate=1.0 minimum mandatory by network” is inaccurate
- Doc claim: `fees-and-mass.mdx:158`
- Primary evidence:
  - Minimum relay fee is mempool policy; currently minimum-fee check is compute-mass-based (`TODO` notes broader mass):
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/check_transaction_standard.rs:201-205,213-231`

### Issue D: “chained tx require at least one DAA score interval per tx” is overstated
- Doc claim: `fees-and-mass.mdx:262-263`
- Primary evidence:
  - Mempool allows chained dependencies:
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/mod.rs:36-39`
  - Same block cannot contain chained spends:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/body_processor/body_validation_in_isolation.rs:105-116`

### Proposed fixes
- Distinguish clearly:
  - Consensus block limits: independent per-mass checks.
  - Mempool tx-selection/feerate simplification: `max(...)`.
- Replace fixed dust thresholds with the policy formula and note dependence on relay fee/script size.
- Replace “mandatory 1.0” language with “default minimum relay policy target is derived from `minimum_relay_transaction_fee`.”
- Replace chained-tx claim with: “Dependent txs can chain in mempool but cannot be mined in the same block.”

---

## 7) `content/docs/core-concepts/ghostdag.mdx` — UNVERIFIED

No direct contradictions found for core algorithm descriptions checked against code:
- Selected parent by highest blue work: `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:99-106,129-131`
- Blue/red coloring with k-cluster checks: `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:108-118,142-150`
- Blue score/work accumulation logic: `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:153-163`

### Unverified claims requiring stronger sourcing
- Security/liveness probability statements that rely on formal proofs (`ghostdag.mdx:89-94`) should cite the exact PHANTOM/GHOSTDAG theorem sections.
- “Blocks beyond depth are considered final” wording should be explicitly framed as protocol finality-depth rule and probabilistic security model, not absolute mathematical irreversibility.

### Proposed fixes
- Add direct whitepaper citations for theorem-level claims.
- Tighten wording around probabilistic finality.

---

## 8) `content/docs/core-concepts/pruning.mdx` — ISSUES

### Issue A: “Every block header is kept indefinitely” is incorrect
- Doc claim: `pruning.mdx:30`
- Primary evidence:
  - Pruning processor can delete headers for non-retained blocks:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/pruning_processor/processor.rs:535-538`

### Issue B: “Full DAG topology preserved through headers” is incorrect
- Doc claim: `pruning.mdx:33`
- Primary evidence:
  - Reachability/relations/ghostdag/status data are pruned for fully pruned blocks:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/pruning_processor/processor.rs:515-533`

### Proposed fixes
- Replace retention section with:
  - “Pruned nodes retain sufficient header/proof/state data for current consensus operation, but not all historical header relations/topology indefinitely.”
- Clarify that retention is selective (pruning-point-related/header subsets), not full historical DAG metadata preservation.

---

## 9) `content/docs/core-concepts/scripting.mdx` — ISSUES

### Issue A: Internal contradiction on KIP-10 effect
- Doc conflicting claims:
  - “KIP-10 reactivated many opcodes disabled in Bitcoin”: `scripting.mdx:13`
  - “Rather than reactivating previously disabled opcodes ... introduced introspection”: `scripting.mdx:63,75`
- Primary evidence:
  - Many legacy ops remain disabled (`OP_CAT`, `OP_LSHIFT`, `OP_RSHIFT`, `OP_MUL`, `OP_DIV`, `OP_MOD`):
    - `/Users/luke/Projects/rusty-kaspa/crypto/txscript/src/opcodes/mod.rs:518-521,629-633`
  - Introspection ops are present (`OP_TXINPUTCOUNT`, `...OUTPUTSPK`):
    - `/Users/luke/Projects/rusty-kaspa/crypto/txscript/src/opcodes/mod.rs:911-919,932,945-957,973-985`
  - KIP-10 scope is introspection + enhanced arithmetic support:
    - `/Users/luke/Projects/kips/kip-0010.md:12,26-40`

### Proposed fixes
- Rewrite `scripting.mdx:13` callout to:
  - “KIP-10 primarily added transaction introspection opcodes and extended integer arithmetic support; many historically disabled opcodes remain disabled.”

---

## 10) `content/docs/core-concepts/spv.mdx` — UNVERIFIED

### Why UNVERIFIED
This page makes many implementation-specific client behavior claims (local GHOSTDAG execution in mobile clients, checkpoint distribution strategy, practical annual header storage targets, proof serving assumptions) without direct primary-source implementation/spec citations in `rusty-kaspa`/`kips`.

### Verified baseline facts
- Headers contain DAG parent structure and UTXO commitment fields:
  - `/Users/luke/Projects/rusty-kaspa/consensus/core/src/header.rs:133-141`
- UTXO commitment is actively validated during block processing:
  - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/virtual_processor/utxo_validation.rs:188-192`

### Proposed fixes
- Add explicit references to:
  - Concrete SPV/light-client protocol/spec docs (if available), or
  - RPC/proof APIs actually used by clients.
- Where such references are not available, mark sections as conceptual guidance rather than current implementation guarantees.

---

## 11) `content/docs/core-concepts/transactions.mdx` — ISSUES

### Issue A: Subnetwork framing overstates current activation
- Doc claim: `transactions.mdx:59`
- Primary evidence:
  - Non-native and non-coinbase subnetworks are currently rejected in isolation validation:
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/transaction_validator/tx_validation_in_isolation.rs:156-161`
  - Native and coinbase IDs are defined as expected:
    - `/Users/luke/Projects/rusty-kaspa/consensus/core/src/subnets.rs:130-137`

### Issue B: Reward cadence statement is wrong (“decreasing roughly once per year”)
- Doc claim: `transactions.mdx:130`
- Primary evidence:
  - Emission schedule is monthly-step table (chromatic):
    - `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/coinbase.rs:21-25,280-299`

### Issue C: Minimum-fee wording should distinguish policy vs consensus
- Doc claim: `transactions.mdx:113-114`
- Primary evidence:
  - Relay minimum is mempool policy (default config and standard checks), not a consensus field-level rule:
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/config.rs:17-20`
    - `/Users/luke/Projects/rusty-kaspa/mining/src/mempool/check_transaction_standard.rs:213-231`

### Proposed fixes
- Reword subnetwork section to current reality:
  - “Subnetwork ID is present in tx format; current mainline validation accepts native and coinbase subnetworks.”
- Replace annual reward-cadence sentence with monthly chromatic reduction description.
- Reword minimum fee as relay-policy behavior.

---

## 12) `content/docs/core-concepts/utxo-model.mdx` — UNVERIFIED

No direct contradictions found for core UTXO mechanics and MuHash basics:
- MuHash add/remove/normalize behavior:
  - `/Users/luke/Projects/rusty-kaspa/crypto/muhash/src/lib.rs:59-70,99-107`
- Header includes UTXO commitment:
  - `/Users/luke/Projects/rusty-kaspa/consensus/core/src/header.rs:140`
- Commitment is checked in validation:
  - `/Users/luke/Projects/rusty-kaspa/consensus/src/pipeline/virtual_processor/utxo_validation.rs:188-192`

### Unverified claims requiring stronger sourcing
- SPV-specific commitment usage (“verify existence of specific UTXOs”): `utxo-model.mdx:94-95` needs explicit protocol/mechanism citation.

### Proposed fixes
- Keep MuHash/commitment explanation, but add a concrete reference for any light-client proof flow, or soften to “can support” language.

---

## Cross-File Consistency Fixes (Recommended)

1. Standardize terminology around mass/fees:
- Distinguish consensus mass limits from mempool feerate/selection policy in both `transactions.mdx` and `fees-and-mass.mdx`.

2. Standardize finality/pruning metric language:
- Use “blue score depth” for pruning/finality discussions; reserve DAA score wording for DAA/locktime/emission contexts.

3. Standardize subnetwork status language:
- Mark non-native subnetworks as currently disabled in validation paths unless a network upgrade enables them.

4. Standardize DAGKnight status wording:
- Explicitly mention KIP-2 is `Proposed` in all DAGKnight references.

