# Worker Remediation Log — core_ref_mining_sec_part_0 (Round 2)

Date: 2026-02-27
Owner chunk: `remediation/chunks/core_ref_mining_sec_part_0`
Validation input: `remediation/validation_core_ref_mining_sec_a.md`

## Scope handled
- Targeted residual remediation for files in `core_ref_mining_sec_part_0` only.
- Fixed remaining `ISSUES` and resolved residual `UNVERIFIED` claims via implementation-aligned wording or non-normative softening/removal.
- Kept language aligned with current behavior in `rusty-kaspa` and proposal status in `kips`.

## Residual ISSUES fixed
- `content/docs/core-concepts/difficulty-adjustment.mdx`
  - Replaced incorrect median-timespan wording with sampled-window timestamp-span wording aligned to current DAA implementation.
- `content/docs/core-concepts/emission-schedule.mdx`
  - Rewrote coinbase section to mergeset-based payout semantics.
  - Removed immediate self-payment framing; clarified blue/red reward routing and payload role.
- `content/docs/core-concepts/fees-and-mass.mdx`
  - Removed unsupported hard output/input ratio rule claim.
  - Reframed constraints as emergent from mass + policy checks.
- `content/docs/core-concepts/transactions.mdx`
  - Replaced direct-per-block coinbase payout claim with mergeset-aware coinbase description.
  - Removed universal "miner still receives reward" claim for rejected conflicting tx context.
- `content/docs/mining/block-rewards.mdx`
  - Replaced immediate direct-miner payout wording with mergeset reward-construction wording.
  - Updated blue/red reward explanation to match current coinbase behavior.

## Residual UNVERIFIED resolved
- `content/docs/core-concepts/addresses.mdx`
  - Softened SLIP-44 registry assertion to tooling-convention wording.
  - Removed specific Bech32 "detect up to 4 errors" numeric claim; kept checksum robustness wording.
- `content/docs/core-concepts/blockdag.mdx`
  - Removed simpa-specific numeric parameter claim (`delta=0.05`, `~0.66*k`) and kept generic simulation-parameter caveat.
- `content/docs/core-concepts/dagknight.mdx`
  - Removed theorem-level optimality/security assertions as mainnet-fact wording.
  - Reframed as research/KIP scope and retained explicit `KIP-2 Proposed` status.
- `content/docs/core-concepts/spv.mdx`
  - Softened prescriptive SPV behavior claims to design-dependent conceptual guidance.
  - Kept no-canonical-spec framing and trust-model-dependent verification language.
- `content/docs/mining/hardware.mdx`
  - Removed vendor/model-specific market assertions and timeline claims.
  - Kept stable operator guidance with explicit live-data verification caveats.
- `content/docs/mining/kheavyhash.mdx`
  - Removed photonic/optical forward-looking claims from protocol description.
  - Kept implementation-oriented kHeavyHash and DAA-context wording.

## Files edited in this round
- `content/docs/core-concepts/addresses.mdx`
- `content/docs/core-concepts/blockdag.mdx`
- `content/docs/core-concepts/dagknight.mdx`
- `content/docs/core-concepts/difficulty-adjustment.mdx`
- `content/docs/core-concepts/emission-schedule.mdx`
- `content/docs/core-concepts/fees-and-mass.mdx`
- `content/docs/core-concepts/spv.mdx`
- `content/docs/core-concepts/transactions.mdx`
- `content/docs/mining/block-rewards.mdx`
- `content/docs/mining/hardware.mdx`
- `content/docs/mining/kheavyhash.mdx`

## Notes
- Only owned in-scope files were modified.
- Unrelated worktree changes outside this scope were intentionally untouched.
