# Worker Log — core_ref_min_sec_b_round2

Date: 2026-02-27
Scope: `remediation/chunks/core_ref_mining_sec_part_1`
Validation input: `remediation/validation_core_ref_mining_sec_b.md`
Sources used for hard alignment: `/Users/luke/Projects/rusty-kaspa`, `/Users/luke/Projects/kips`

## Summary

Completed targeted residual remediation for all files listed as `ISSUES` or `UNVERIFIED` in the validation report.
Approach used per instruction:
- Added direct source-backed citations where claims are consensus/mechanics facts.
- Softened or removed operational/community-process assertions that are off-protocol or not canonical in scoped repos.
- Kept edits strictly within owned scope files.

## File-by-File Actions

### `content/docs/reference/emission-schedule.mdx`
- Fixed month-boundary explanation from `30 days` approximation to consensus definition using `SECONDS_PER_MONTH = 2,629,800`.
- Added source links to `coinbase.rs` month constant and subsidy month computation path.

### `content/docs/reference/glossary.mdx`
- Corrected Blue Score definition to selected-parent score + current `mergeset_blues` length.
- Added source links to GHOSTDAG blue-score computation and mergeset initialization behavior.

### `content/docs/reference/specifications.mdx`
- Reworked mass section to reflect consensus semantics:
  - Separate compute/transient/storage dimensions.
  - `max(...)` explicitly documented as mempool/template simplification only.
  - Block validation limits documented per dimension.
- Added source links to consensus mass docs and block body validation logic.

### `content/docs/mining/pool-mining.mdx`
- Removed/softened vendor- and operator-specific assertions that were off-repo.
- Reframed recommendations as operational tradeoffs and pool-policy-dependent guidance.
- Replaced fixed claims (e.g., failover counts, payout behavior, optimization percentages) with conditional wording.

### `content/docs/mining/solo-mining.mdx`
- Removed specific miner software list/version assumptions.
- Softened probabilistic/output-interpretation claims; emphasized miner-specific telemetry labeling and node/wallet confirmation as canonical.

### `content/docs/protocol-evolution/crescendo.mdx`
- Removed uncited fixed latency assertion (sub-second confirmations as typical guarantee).
- Softened timeline/testing phrasing to avoid unverifiable environment claims.
- Added explicit KIP-14 / `rusty-kaspa` anchor language in post-fork state section.

### `content/docs/protocol-evolution/kips-overview.mdx`
- Removed non-canonical process claims (e.g., explicit "KIP editor assigns number").
- Reframed lifecycle/process text as repository-driven conventions.
- Aligned status wording with current canonical labels in KIPs index.

### `content/docs/protocol-evolution/roadmap.mdx`
- Removed external prototype references and non-canonical assertions.
- Recast roadmap items as KIP/repository-grounded themes with explicit KIP links where applicable.
- Softened speculative long-horizon claims into non-guaranteed research directions.

### `content/docs/reference/research-papers.mdx`
- Replaced broad external bibliography metadata with KIP-cited paper mapping only.
- Removed author/publication-status assertions not verifiable from scoped repos.
- Added context callout tied to KIP status state (`Active`/`Proposed`).

### `content/docs/security/responsible-disclosure.mdx`
- Removed UI-specific, time-sensitive reporting path assumptions.
- Reframed to point users at canonical `rusty-kaspa` security pages and advisory entry points with “follow current flow” guidance.

### `content/docs/security/security-model.mdx`
- Removed fixed practical confirmation-depth table values that were policy/advice claims without canonical source table.
- Replaced with risk-policy framing and finality-depth anchored recommendation.

### `content/docs/security/staying-safe.mdx`
- Removed specific ecosystem service assertions (e.g., fixed official web-wallet URL claims).
- Generalized verification guidance to canonical project sources and public/verifiable support channels.

## Key Source Anchors Used

- `rusty-kaspa/consensus/src/processes/coinbase.rs` (`SECONDS_PER_MONTH`, subsidy-month computation)
- `rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs` (blue score computation)
- `rusty-kaspa/consensus/src/model/stores/ghostdag.rs` (`mergeset_blues` initialization)
- `rusty-kaspa/consensus/core/src/mass/mod.rs` (`max(...)` has no consensus meaning)
- `rusty-kaspa/consensus/src/pipeline/body_processor/body_validation_in_isolation.rs` (per-dimension block mass checks)
- `kips/README.md` (canonical status labels)
- `kips/kip-0002.md`, `kips/kip-0009.md`, `kips/kip-0010.md`, `kips/kip-0013.md`, `kips/kip-0014.md` (roadmap/protocol-evolution alignment)

## Notes

- No files outside the requested scope were edited.
- Existing unrelated workspace modifications were not touched or reverted.
