# Worker Log - core_ref_mining_sec_part_1 Round 3

Date: 2026-02-27
Scope source: `remediation/chunks/core_ref_mining_sec_part_1`
Validation input: `remediation/final_validation_core_ref_mining_sec_b.md`

## Objective
Remove or rewrite residual `UNVERIFIED` claims so content is either canonical-source-backed or explicitly out of canonical scope.

## Files Updated

1. `content/docs/mining/pool-mining.mdx`
- Rewrote worker-label text to make syntax explicitly pool-specific (operator-defined).
- Removed "Most pools provide a web dashboard" style ecosystem-generalization.
- Replaced dashboard feature claims with an explicit scope statement: pool dashboards/APIs are operator-managed and out of canonical protocol scope.

2. `content/docs/mining/solo-mining.mdx`
- Removed miner-vendor capability/convention assertions (GPU-miner support lists, typical flag naming table, miner-specific command templates).
- Replaced with canonical-safe guidance: configure payout address + `kaspad` gRPC endpoint, and defer exact flags to miner docs.
- Removed hardware-tuning claim tied to specific flag (`--gpu-threads-per-device`) and rewrote as implementation-specific/out-of-scope guidance.
- Reworked performance tips to node/RPC observability items rooted in `kaspad` operation.

3. `content/docs/protocol-evolution/kips-overview.mdx`
- Replaced convention-based lifecycle narrative (Draft/Review/Accepted workflow text) with repository-backed status model language.
- Kept canonical status labels aligned to KIPs index: `Draft`, `Proposed`, `Active`, `Implemented`, `Rejected`.
- Simplified submission/discussion sections to repository-first facts (PR + metadata tracking).

4. `content/docs/protocol-evolution/roadmap.mdx`
- Removed forward-looking property guarantees for DAGKnight.
- Rewrote section to factual repository status statement (`KIP-2` is `Proposed`) plus activation dependency on KIP + hardfork process.
- Removed speculative higher-BPS benefit claims and replaced with neutral status/activation language anchored to KIP-14 baseline.

5. `content/docs/security/responsible-disclosure.mdx`
- Removed process-detail claims dependent on mutable live GitHub workflow semantics.
- Reduced page to canonical entry points (`/security`, `/security/advisories`) and explicit note that GitHub flow text may change.
- Kept non-security issue routing to the public `rusty-kaspa` issues tracker.

6. `content/docs/security/staying-safe.mdx`
- Removed broad normative end-user security playbook content (seed handling, scam taxonomy, software verification checklists, browser hygiene guidance).
- Replaced with concise canonical-scope statement clarifying that operational wallet-security policy is out of protocol scope.
- Added canonical source links (`kaspanet` org, `kips`, `rusty-kaspa`) and internal security references.

## Notes
- Edits were limited to files in the requested chunk scope plus this worker log.
- No unrelated workspace changes were modified or reverted.
