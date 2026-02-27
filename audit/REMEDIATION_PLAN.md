# Remediation Plan

Date: 2026-02-27

## Scope
- Audited corpus: all `content/docs/**/*.mdx` + `README.md` (146 files).
- Current status: 104 files with `ISSUES`, 33 files `UNVERIFIED`, 9 files `VERIFIED`.
- Source of truth for findings: `audit/reports/*.md` and `audit/final_status_by_file.tsv`.

## Fix Order (Highest Risk First)
1. RPC contract correctness (breaking/wrong API docs)
2. Node operation and network-parameter drift
3. Wallet/SDK sample code correctness
4. Core-concept and protocol-status overstatements
5. Security/disclosure policy wording and unsupported guarantees
6. Scope cleanup (L2/Kasplex and other out-of-scope ecosystem references)
7. Unverified claims cleanup with citation-or-softening pass

## Workstream 1: RPC Contract Corrections
- Files: all RPC pages with `ISSUES` (`rpc/wrpc`, `rpc/rest`, `rpc/grpc`, `rpc/subscriptions`, `rpc/connecting.mdx`, `rpc/overview.mdx`).
- Why first: These cause direct implementation failures for integrators.
- Must-fix patterns:
  - Required/optional field mismatches in request schemas.
  - Wrong response field names/types (example objects that do not exist).
  - Methods documented as implemented when currently `NotImplemented`.
  - Wrong network-id formatting (`kaspa-mainnet` vs `mainnet`/`testnet-10`).
  - Unsafe-RPC assumptions for admin methods (`shutdown`, conflict resolution).
- Validation gate: compare each RPC page against current `rusty-kaspa` model/proto/service files before merge.

## Workstream 2: Node Ops + Network Constants
- Files: `node-operations/*.mdx`, `guides/testnet-development.mdx`, `guides/production-node.mdx`, `reference/network-params.mdx`, `reference/glossary.mdx`.
- Must-fix patterns:
  - Replace stale default paths (`.kaspad`) with `rusty-kaspa` paths.
  - Correct testnet support to current suffix set (10 only in current params).
  - Fix defaults/flags/ports from current `kaspad` args and daemon behavior.
  - Correct simnet behavior wording (simulated/disabled PoW framing).
- Validation gate: all defaults/flags/ports map to live code constants.

## Workstream 3: Wallet + SDK + Cookbook Code Samples
- Files: most of `cookbook/*`, `wallets/*.mdx`, `sdks/*.mdx`, integration docs with code snippets.
- Must-fix patterns:
  - Replace non-existent API calls and invalid field accesses.
  - Correct mnemonic assumptions (12/24 support) and CLI command surface.
  - Fix UTXO/mempool object shapes and tx-tracking examples.
- Validation gate: run snippet lint/tests against current SDK typings where possible.

## Workstream 4: Core Concepts + Protocol Evolution Accuracy
- Files: `core-concepts/*.mdx`, `protocol-evolution/*.mdx`, `reference/*` conceptual pages.
- Must-fix patterns:
  - Remove or qualify absolute claims not guaranteed by primary sources.
  - Clearly label proposal-stage items (e.g., DAGKnight/KIP status).
  - Align emission/supply wording with constants and KIP context.
- Validation gate: every quantitative statement must have line-cited source.

## Workstream 5: Security/Policy Language
- Files: `security/*.mdx`, relevant RPC/security notes in other pages.
- Must-fix patterns:
  - Remove unsupported SLA/scope commitments unless formally published.
  - Fix strict wording that conflicts with supported wallet/key options.
- Validation gate: policy claims must cite official published policy docs.

## Workstream 6: Scope Enforcement
- Files: especially `integrations/third-party-protocols.mdx`, plus any core/reference L2 references.
- Must-fix patterns:
  - Move L2/Kasplex/third-party protocol content to clearly scoped ecosystem pages or remove per editorial policy.
  - Keep core docs focused on L1 canonical behavior and officially maintained tooling.
- Validation gate: no out-of-scope references in core/concepts/reference pages.

## Workstream 7: UNVERIFIED Backlog
- Files: see `audit/unverified_files.txt` (33 files).
- Resolution rule per claim:
  - Add an authoritative citation, or
  - Rewrite as non-normative guidance, or
  - Remove claim.

## Execution Mechanics
- Create one tracking ticket per file in `audit/issue_files.txt` with linked source evidence row from `audit/reports/*.md`.
- Apply changes in section-sized PRs (RPC first) to keep review focused.
- For each PR include:
  - list of corrected claims,
  - source citations used,
  - before/after snippet diffs for code examples,
  - follow-up items for remaining `UNVERIFIED` statements.

## Done Criteria
- `audit/final_status_by_file.tsv` has zero `ISSUES`.
- Every remaining non-VERIFIED statement is either cited or explicitly labeled as guidance.
- Global scope scan has no out-of-scope references in canonical core docs.
