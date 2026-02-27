# Worker Remediation Log: node_guides_getting_dev (Round 2)

Date: 2026-02-27
Owner chunk: `remediation/chunks/node_guides_getting_dev.txt`
Validation input: `remediation/validation_node_guides_getting_dev.md`

## Scope handled
- Resolved the single residual `ISSUES` item.
- Resolved all residual `UNVERIFIED` entries listed in the validation report.
- Kept edits inside owned chunk files only.
- Rewrote unsupported ecosystem/history claims to either:
  - source-aligned technical wording (from `rusty-kaspa`/`kips`-compatible behavior), or
  - explicit non-normative operational guidance.

## File-by-file changes

### `content/docs/guides/dev-environment.mdx`
- Fixed CLI command surface per current wallet module behavior:
  - `wallet> create` -> `wallet create`
  - normalized the surrounding snippet to `wallet connect` / `wallet create` / `wallet address`.

### `content/docs/getting-started/what-is-kaspa.mdx`
- Removed unsupported superlative wording in frontmatter (`fastest proof-of-work cryptocurrency`).
- Replaced unsupported launch/distribution claims (`no ICO/pre-mine/dev tax/token allocation`) with neutral protocol-issuance wording.
- Replaced historical/fair-launch timeline section with protocol-evolution wording centered on KIP process and Crescendo.
- Removed `Pre-mine` table row to avoid unverifiable historical assertion.

### `content/docs/getting-started/why-kaspa.mdx`
- Removed cross-chain timing/finality comparison table (Bitcoin/Ethereum/Litecoin).
- Rewrote speed section to Kaspa-only behavior (`10 BPS`) plus application-level confirmation policy guidance.
- Softened broad evaluative absolutes to design-tradeoff language.

### `content/docs/guides/first-transaction.mdx`
- Removed canonical faucet endpoint assertion and Discord fallback guidance.
- Replaced with non-normative funding guidance (wallet transfer / community service availability may vary).
- Updated frontmatter description to remove faucet-specific claim.

### `content/docs/guides/testnet-development.mdx`
- Replaced faucet workflow and "nearly instant" confirmation claim with non-normative testnet funding options.
- Added explicit note that faucets/community services are external to `rusty-kaspa` and can change.
- Reworded mining comparison row from deterministic difficulty claim to operational-economics wording.

### `content/docs/node-operations/docker.mdx`
- Reframed community image section as third-party example.
- Removed unsupported maintenance/tracking assertion for `supertypo/rusty-kaspad`.
- Kept warning language to validate build inputs and pin tags.

### `content/docs/node-operations/running-a-node.mdx`
- Removed unverifiable ecosystem-status phrasing:
  - `rusty-dnsseeder` no longer described as "under testing".

### `content/docs/node-operations/testnet.mdx`
- Removed faucet-canonicality claims and rewrote funding section as operational guidance.
- Updated frontmatter and intro to remove faucet-access certainty.
- Replaced deterministic mining-difficulty comparison with non-normative mining-economics wording.

### `content/docs/node-operations/troubleshooting.mdx`
- Added explicit "heuristics, not guarantees" framing for the page.
- Softened deterministic HDD and root-cause phrasing to conditional troubleshooting guidance.
- Kept actionable remediation steps while removing over-assertive causal language.

## Notes
- No files outside `remediation/chunks/node_guides_getting_dev.txt` were edited.
- Unrelated worktree changes (if any) were not modified.
