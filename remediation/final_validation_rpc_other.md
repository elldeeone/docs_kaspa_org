# Final Validation Audit — RPC Other

Date: 2026-02-27
Scope: `remediation/chunks/rpc_other.txt` (19 files)

## Counts

- VERIFIED: 18
- ISSUES: 1
- UNVERIFIED: 0

## Residual ISSUES Claims

1. Invalid mainnet address example still present in `content/docs/rpc/subscriptions/utxos-changed.mdx`.
- Claim: The subscribe example includes `kaspa:qzu8yngf4ross8dylan5en8hy9emr3vysjq0hpve5yhnf87s3hq7qv6lvl9` (`utxos-changed.mdx:17`), which is shown as a concrete address input.
- Evidence: `api.kaspa.org` OpenAPI path validation requires `^kaspa:[a-z0-9]{61,63}$` for `{kaspaAddress}`; this sample has a shorter payload and returns HTTP `422` on `GET /addresses/{kaspaAddress}/balance`.

## Residual UNVERIFIED Claims

None.
