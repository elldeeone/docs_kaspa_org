# Final Validation Audit — core_ref_mining_sec_a (Round 2)

- Date: 2026-02-27
- Scope: `/Users/luke/Projects/docs_kaspa_org/remediation/chunks/core_ref_mining_sec_part_0`
- Primary sources checked: `/Users/luke/Projects/rusty-kaspa`, `/Users/luke/Projects/kips`

## Counts

- VERIFIED: 15
- ISSUES: 0
- UNVERIFIED: 1

## Residual Issues / Unverified Claims

### `content/docs/core-concepts/addresses.mdx` — `UNVERIFIED`
- `:98` states "Kaspa's registered coin type". The checked primary sources verify that derivation path value `111111` is used in Kaspa wallet tooling (`wallet/keys/src/derivation/gen1/mod.rs:1`, `wallet/keys/src/derivation/gen1/hd.rs:179,198`), but they do not establish external SLIP-44 registration status.
