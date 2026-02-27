# Worker Remediation Log — core_ref_mining_sec_part_0 (Round 3 Single)

Date: 2026-02-27
Owner chunk: `remediation/chunks/core_ref_mining_sec_part_0`
Validation target: `core_ref_mining_sec_part_0`

## Scope handled
- Single residual `UNVERIFIED` wording adjustment requested for coin type language.
- Scope file only: `content/docs/core-concepts/addresses.mdx`.

## Change applied
- `content/docs/core-concepts/addresses.mdx`
  - Replaced unverified wording `Kaspa's registered coin type` with implementation-backed wording: `Coin type value used in Kaspa implementations`.
  - Tightened follow-up sentence to source-backed statement only: `Kaspa implementations use coin type 111111 for this BIP-44 derivation path.`

## Result
- Removed the residual unverified "registered" claim.
- Kept only implementation-backed coin type statement (`111111`).
