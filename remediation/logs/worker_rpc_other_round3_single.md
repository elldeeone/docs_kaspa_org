# Worker Remediation Log — rpc_other (Round 3 Single)

Date: 2026-02-27
Owner chunk: `remediation/chunks/rpc_other.txt`
Validation target: `final_validation_rpc_other`

## Scope handled
- Single residual `ISSUES` item from final validation.
- Scope file only: `content/docs/rpc/subscriptions/utxos-changed.mdx`.

## Change applied
- `content/docs/rpc/subscriptions/utxos-changed.mdx`
  - Replaced invalid sample address `kaspa:qzu8yngf4ross8dylan5en8hy9emr3vysjq0hpve5yhnf87s3hq7qv6lvl9` in the subscribe example.
  - Inserted valid-format mainnet address example: `kaspa:qrcz0ha5krc2y3snq6vm6quyqdh7fcs8gkx0f5z5v4ld0s32l4p850cvk8udv`.

## Result
- Removed the residual address-validation contradiction in `utxos-changed` subscribe sample.
- No other files were edited.
