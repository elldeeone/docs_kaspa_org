# Worker Remediation Log — core_ref_mining_sec_part_0

Date: 2026-02-27
Owner chunk: `remediation/chunks/core_ref_mining_sec_part_0`

## Scope handled
- Fixed all `ISSUE` entries for owned files covered in:
  - `audit/reports/core_concepts.md`
  - `audit/reports/mining_security.md`
  - `audit/reports/global_scope_consistency.md` (owned-file overlap)
- Resolved `UNVERIFIED` claims in owned files by softening/removal of unsupported absolutes and reframing implementation-specific content as conceptual where needed.
- Edited owned files only.

## File-by-file remediation
- `content/docs/core-concepts/addresses.mdx`
  - Corrected P2PK key-type wording to include support for 33-byte `PubKeyECDSA`.
  - Corrected address payload length validation list (`PubKey` 32, `PubKeyECDSA` 33, `ScriptHash` 32).

- `content/docs/core-concepts/blockdag.mdx`
  - Softened unverified parent-selection/fairness/first-confirmation guarantees.
  - Reframed confirmation wording around target interval vs probabilistic finality.

- `content/docs/core-concepts/dagknight.mdx`
  - Removed over-strong security language ("honest majority only", "no delay assumptions at all").
  - Reframed claims as model-dependent/theorem-level and added current status note: KIP-2 is `Proposed`, not mainnet-active.

- `content/docs/core-concepts/difficulty-adjustment.mdx`
  - Replaced selected-parent-only timestamp language with sampled-window wording (selected-parent context + eligible mergeset sampling).
  - Removed unsupported explicit dampening claim.
  - Corrected finality/pruning metric wording to blue-score depth.
  - Updated timestamp-source comparison row accordingly.

- `content/docs/core-concepts/emission-schedule.mdx`
  - Replaced inaccurate ~28.7B statement with ~28.376B current-schedule wording (+ small high-BPS rounding delta).
  - Reframed emission mutability as consensus-upgrade-dependent (hard fork).
  - Corrected DAA score description to avoid selected-parent-chain-only implication.

- `content/docs/core-concepts/fees-and-mass.mdx`
  - Distinguished consensus per-dimension block checks from mempool/policy `max(compute, transient, storage)` abstraction.
  - Removed fixed dust constants (`0.019/0.02 KAS`) as protocol facts; replaced with relay-policy-derived threshold guidance.
  - Replaced "fee_rate=1.0 mandatory" language with policy/baseline wording.
  - Corrected chained-tx statement: can chain in mempool, cannot be mined together in same block; timing depends on inclusion.

- `content/docs/core-concepts/ghostdag.mdx`
  - Reframed finality depth language as operational/probabilistic rather than absolute irreversibility.
  - Softened liveness/safety claims to model-assumption language.

- `content/docs/core-concepts/pruning.mdx`
  - Removed incorrect "every header kept indefinitely" and "full DAG topology preserved" claims.
  - Replaced with selective retention wording (active horizon header/proof/state data).
  - Updated sync and pruned-node descriptions to align with selective retention model.

- `content/docs/core-concepts/scripting.mdx`
  - Fixed KIP-10 contradiction by stating introspection + arithmetic-extension scope while many legacy disabled opcodes remain disabled.

- `content/docs/core-concepts/spv.mdx`
  - Resolved unverified implementation guarantees by marking page as conceptual guidance.
  - Softened client-behavior assertions (local GHOSTDAG, checkpoints, selective sync, storage figures) to design-dependent language.
  - Clarified UTXO commitment usage does not by itself replace full historical inclusion proofs.

- `content/docs/core-concepts/transactions.mdx`
  - Reworded subnetwork section to current validation reality (native/coinbase accepted in current mainline paths).
  - Removed out-of-scope "layer-2 protocols" phrasing in core context.
  - Corrected minimum-fee wording to relay policy vs consensus rule.
  - Corrected reward cadence wording to monthly chromatic reductions.

- `content/docs/core-concepts/utxo-model.mdx`
  - Softened SPV commitment claim to snapshot-validation support with additional trust/proof caveat.

- `content/docs/mining/block-rewards.mdx`
  - Corrected DAA score definition (consensus-time counter, not cumulative PoW).
  - Updated supply wording to ~28.38B current-schedule estimate.
  - Replaced absolute immutability claim with consensus-upgrade requirement.
  - Corrected "time to 50% mined" row to current-schedule order of magnitude (~1 year from schedule start).

- `content/docs/mining/difficulty-adjustment.mdx`
  - Corrected timestamp-processing description to implementation-faithful high-level behavior.
  - Corrected coinbase maturity unit to DAA score.
  - Corrected DAA score definition away from cumulative-difficulty claim.
  - Replaced single-formula hashrate claim with heuristic + node-estimator caveat.
  - Softened uncited "1-2 minute" adjustment claim.

- `content/docs/mining/hardware.mdx`
  - Resolved unverified volatile market/performance claims by removing hard benchmark/spec tables and year-by-year market assertions.
  - Reframed as stable operational guidance with explicit "verify live vendor/community data" warning.
  - Replaced hardcoded pool endpoint example with placeholder template.

- `content/docs/mining/kheavyhash.mdx`
  - Corrected matrix generation: derived from per-template `pre_pow_hash`, not MUHASH checkpoint/epoch schedule.
  - Replaced inaccurate finite-field matrix pseudocode with implementation-faithful high-level pipeline wording.
  - Softened optical-mining claims to forward-looking research framing.
  - Adjusted DAA context wording to avoid blue-score misuse and over-strong stabilization claims.

## Notes
- Worktree contains many unrelated edits outside this chunk; they were intentionally ignored.
- No unrelated files were modified by this remediation pass.
