# Post-Remediation Validation Audit — core_ref_mining_sec_part_1

Date: 2026-02-27
Scope source: `remediation/chunks/core_ref_mining_sec_part_1`
Validation sources: `/Users/luke/Projects/rusty-kaspa`, `/Users/luke/Projects/kips`

## Status Table

| File | Status |
|---|---|
| `content/docs/mining/pool-mining.mdx` | `UNVERIFIED` |
| `content/docs/mining/solo-mining.mdx` | `UNVERIFIED` |
| `content/docs/protocol-evolution/crescendo.mdx` | `UNVERIFIED` |
| `content/docs/protocol-evolution/kip-index.mdx` | `VERIFIED` |
| `content/docs/protocol-evolution/kips-overview.mdx` | `UNVERIFIED` |
| `content/docs/protocol-evolution/roadmap.mdx` | `UNVERIFIED` |
| `content/docs/reference/api-reference.mdx` | `VERIFIED` |
| `content/docs/reference/emission-schedule.mdx` | `ISSUES` |
| `content/docs/reference/glossary.mdx` | `ISSUES` |
| `content/docs/reference/network-params.mdx` | `VERIFIED` |
| `content/docs/reference/research-papers.mdx` | `UNVERIFIED` |
| `content/docs/reference/specifications.mdx` | `ISSUES` |
| `content/docs/security/responsible-disclosure.mdx` | `UNVERIFIED` |
| `content/docs/security/security-model.mdx` | `UNVERIFIED` |
| `content/docs/security/staying-safe.mdx` | `UNVERIFIED` |

## Counts

- `VERIFIED`: 3
- `ISSUES`: 3
- `UNVERIFIED`: 9
- Total: 15

## Residual ISSUES / UNVERIFIED Claims Only

### `content/docs/reference/emission-schedule.mdx` — `ISSUES`
- `:30-34` states a month-at-10-BPS approximation of `25,920,000` blocks (`30 days * 10 BPS`). Consensus subsidy logic uses `SECONDS_PER_MONTH = 2,629,800` (30.4375 days), so emission month boundaries are not 30-day-based (`rusty-kaspa/consensus/src/processes/coinbase.rs:21-24`, `:239-254`).

### `content/docs/reference/glossary.mdx` — `ISSUES`
- `:82` defines blue score as blue blocks on the selected-parent chain. In implementation, blue score is selected-parent blue score plus current mergeset blues (`rusty-kaspa/consensus/src/processes/ghostdag/protocol.rs:153`) and mergeset blues include selected parent plus additional blue mergeset blocks (`rusty-kaspa/consensus/src/model/stores/ghostdag.rs:95-99`).

### `content/docs/reference/specifications.mdx` — `ISSUES`
- `:140-153` presents transaction/block mass as a single `max(...)` transactional quantity and says block mass is sum of transaction masses capped at 500,000. Consensus validates compute/transient/storage limits separately at block level (`rusty-kaspa/consensus/src/pipeline/body_processor/body_validation_in_isolation.rs:63-90`), and source explicitly states `max(...)` has no consensus meaning (`rusty-kaspa/consensus/core/src/mass/mod.rs:163-166`, `:188-191`).

### `content/docs/mining/pool-mining.mdx` — `UNVERIFIED`
- Operational/miner-vendor claims remain source-external, e.g. `:70` (“Most ASIC miners support configuring up to three pool addresses for failover”), plus recommendation claims at `:133-134`. Not verifiable from `rusty-kaspa`/`kips`.

### `content/docs/mining/solo-mining.mdx` — `UNVERIFIED`
- Source-external operational claims remain, e.g. miner software list/version assumptions (`:24`) and miner behavior/generalized output interpretation (`:128`). These are not derivable from `rusty-kaspa`/`kips` alone.

### `content/docs/protocol-evolution/crescendo.mdx` — `UNVERIFIED`
- Impact/performance statements remain uncited to scoped sources, e.g. “first confirmations are typically observed on sub-second timescales” (`:97`) and broad ecosystem-impact framing (`:99`).

### `content/docs/protocol-evolution/kips-overview.mdx` — `UNVERIFIED`
- Process/governance workflow claims are partly community-practice assertions not directly represented in canonical `kips` metadata, e.g. “KIP editor will ... assign a number” (`:61`) and review venue assertions (`:88-90`).

### `content/docs/protocol-evolution/roadmap.mdx` — `UNVERIFIED`
- Forward-looking/prototype claims are intentionally non-consensus and not verifiable from scoped repositories, e.g. prototype references and properties (`:54-61`, `:79-87`, `:106-111`).

### `content/docs/reference/research-papers.mdx` — `UNVERIFIED`
- Paper bibliography metadata (authors/publication status/venue context) is mostly external to `rusty-kaspa`/`kips`; not fully verifiable using the constrained source set alone.

### `content/docs/security/responsible-disclosure.mdx` — `UNVERIFIED`
- Reporting-path statements depend on live GitHub security UI/policy state (`:24-27`, `:39`), which is not represented in the two local source repositories.

### `content/docs/security/security-model.mdx` — `UNVERIFIED`
- Practical confirmation-depth guidance values are policy/advice claims without a corresponding canonical table in scoped sources (`:100-104`).

### `content/docs/security/staying-safe.mdx` — `UNVERIFIED`
- User-security best-practice and ecosystem-service assertions are operational/off-repo claims (e.g., official web-wallet URL at `:42`) and are not verifiable from `rusty-kaspa`/`kips`.
