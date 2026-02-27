# Worker Remediation Log — core_ref_mining_sec_part_1

Date: 2026-02-27
Owner chunk: `remediation/chunks/core_ref_mining_sec_part_1`

## Scope handled
- Fixed all `ISSUE` entries for owned files covered in:
  - `audit/reports/reference_protocol.md`
  - `audit/reports/mining_security.md`
  - `audit/reports/global_scope_consistency.md` (owned-file overlap)
- Resolved `UNVERIFIED` claims in owned files via citation, softening, or removal of unsupported absolutes.
- Edited owned files only.

## File-by-file remediation
- `content/docs/reference/api-reference.mdx`
  - Changed "comprehensive" wording to a common-methods reference.
  - Corrected transport attribution: current `rusty-kaspa` exposes both gRPC and wRPC.
  - Fixed schema/name mismatches: `network` + `sink` in `getBlockDagInfo`, optional `lowHash`, `submitBlock.report`, `transactionId` for `getMempoolEntry`, `peerInfo` for `getConnectedPeerInfo`, optional/nullable UTXO `address`.
  - Replaced deprecated virtual-selected-parent method names with sink terminology (`notifySinkBlueScoreChanged`, `getSinkBlueScore`).

- `content/docs/reference/emission-schedule.mdx`
  - Removed unsourced supply-progression percentages table.
  - Reframed supply as current-consensus estimate (~28.38B KAS) and noted hardfork requirement for emission changes.
  - Removed unsupported absolute policy/governance language.

- `content/docs/reference/glossary.mdx`
  - Corrected transaction mass semantics: consensus per-dimension checks vs mempool `max(...)` simplification and standard-policy 100,000 cap.
  - Corrected DAA score definition (selected-parent score + DAA-eligible mergeset contribution).
  - Rewrote kHeavyHash description to implementation-faithful heavy-mixing wording.
  - Updated RPC transport wording to current `rusty-kaspa` (gRPC + wRPC).
  - Updated testnet entry to current supported `testnet-10` with historical suffix note.
  - Corrected pruning retention wording (required windows/state, not unconditional full-header retention).
  - Replaced out-of-scope "layer-2 protocols" phrasing with neutral extension wording.

- `content/docs/reference/network-params.mdx`
  - Corrected policy-vs-consensus labeling for max transaction mass and mass semantics.
  - Corrected `MAX_SOMPI` interpretation (transaction-amount bound, not emission cap) and added approximate consensus emission total wording.
  - Corrected relay fee unit to 1000 sompi per 1000 grams (1 kg) and clarified formula.
  - Updated active network tables to current set (mainnet/testnet-10/simnet/devnet); moved `testnet-11` to historical note.
  - Corrected P2P values: 1GB max message size, 120s protocol timeout, 4s version/verack wait, 8s ready wait.
  - Updated kHeavyHash section wording to avoid inaccurate GF(2^4) overspecification.

- `content/docs/reference/research-papers.mdx`
  - Corrected PHANTOM authorship (added Shai Wyborski).
  - Updated PHANTOM revision note to include 2021 updates.
  - Corrected DAGKnight authorship (Yonatan Sompolinsky, Michael Sutton).
  - Softened publication-status framing to distinguish preprints vs peer-reviewed related work.

- `content/docs/reference/specifications.mdx`
  - Corrected header `timestamp` type to `uint64`.
  - Corrected parent-reference wording to `maxBlockParents` rather than "all DAG tips".
  - Replaced generic block-hash wording with domain-separated `BlockHash` description.
  - Updated kHeavyHash wording to implementation-aligned heavy-mixing description.
  - Corrected script/opcode section: added `OP_SHA256`, `OP_CHECKSIGECDSA`, removed replacement claim.
  - Corrected P2PK-ECDSA template opcode to `OP_CHECKSIGECDSA`.
  - Corrected `SIGHASH_SINGLE` from `0x03` to `0x04`.
  - Replaced out-of-scope "Layer 2 subnetwork protocols" wording with neutral extension wording.

- `content/docs/protocol-evolution/crescendo.mdx`
  - Added explicit KIP-14 source anchor.
  - Softened timeline and ecosystem-impact language that was previously broad/operationally absolute.
  - Marked additional testnet suffix mentions as historical context.

- `content/docs/protocol-evolution/kip-index.mdx`
  - Added missing KIP-16 draft entry.
  - Aligned status taxonomy to canonical KIPs repository labels.
  - Updated KIP-15 title wording to current canonical naming.

- `content/docs/protocol-evolution/kips-overview.mdx`
  - Reframed lifecycle/process language as convention/practice rather than strict rule.
  - Added explicit pointer to canonical KIPs repository status labels.
  - Softened hardfork/softfork prevalence statements.

- `content/docs/protocol-evolution/roadmap.mdx`
  - Added present-state reference anchor to current parameter sources.
  - Reframed roadmap items as proposals/research directions rather than commitments.
  - Softened DAGKnight, block-rate, and governance absolutist language.
  - Removed brittle prototype-environment claim details.

- `content/docs/mining/pool-mining.mdx`
  - Removed volatile pool endpoint/fee/payout table and replaced with verification checklist + off-protocol warning.
  - Replaced miner-specific command snippets with neutral template syntax.
  - Softened operational heuristics and removed hardcoded fee/threshold figures presented as facts.

- `content/docs/mining/solo-mining.mdx`
  - Corrected `--utxoindex` guidance: not required for basic block-template solo mining; required for address/UTXO-index RPC workflows.
  - Removed uncited fixed storage-size recommendation and replaced with up-to-date guidance note.
  - Replaced version/tool-specific miner command examples with neutral templates and explicit version-doc caveat.

- `content/docs/security/responsible-disclosure.mdx`
  - Removed unsupported SLA and scope guarantees.
  - Reframed to currently published reporting path (`rusty-kaspa` GitHub security interface).
  - Replaced guaranteed timelines/recognition promises with non-absolute maintainer-process wording.

- `content/docs/security/security-model.mdx`
  - Removed conflicting reversal formula/table pair and replaced with model-dependent probability guidance.
  - Corrected pruning/finality relation wording (separate mechanisms; pruning depth vs finality depth).
  - Softened unsupported "effective attack threshold >50%" claim.

- `content/docs/security/staying-safe.mdx`
  - Corrected seed phrase wording to "12-word or 24-word".

## Notes
- Worktree contains many unrelated edits outside this chunk; they were intentionally ignored.
- No tests were run (documentation-only remediation).
