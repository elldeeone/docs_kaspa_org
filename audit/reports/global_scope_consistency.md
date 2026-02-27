# Global Scope & Consistency Audit

Scope audited: `audit/chunks/all.txt` (145 docs)
Date: 2026-02-27

## 1) Out-of-scope ecosystem mentions (L2 / Kasplex / related)

### Direct matches requested

- `content/docs/core-concepts/transactions.mdx:59` — "layer-2 protocols"
- `content/docs/reference/glossary.mdx:146` — "layer-2 protocols"
- `content/docs/reference/specifications.mdx:122` — "Layer 2 subnetwork protocols"
- `content/docs/integrations/third-party-protocols.mdx:28` — "KRC-20 Token Standard (Kasplex)"
- `content/docs/integrations/third-party-protocols.mdx:30` — Kasplex protocol description
- `content/docs/integrations/third-party-protocols.mdx:35` — Kasplex indexer mint rules
- `content/docs/integrations/third-party-protocols.mdx:37` — Kasplex indexer consensus statement
- `content/docs/integrations/third-party-protocols.mdx:43` — Kasplex website link
- `content/docs/integrations/third-party-protocols.mdx:44` — Kasplex docs link

`igra`: no standalone matches found.

### Other out-of-scope ecosystem references (same scope sweep)

- `content/docs/integrations/third-party-protocols.mdx:26` — Ordinals / BRC-20 comparison
- `content/docs/integrations/third-party-protocols.mdx:45` — Coinchimp KRC-20 apps
- `content/docs/integrations/third-party-protocols.mdx:46` — Kasia Indexer (K-Kluster)
- `content/docs/sdks/community-sdks.mdx:52` — kaspa-js (K-Kluster)
- `content/docs/sdks/community-sdks.mdx:60` — Kasia (K-Kluster)
- `content/docs/sdks/community-sdks.mdx:62` — Kasia protocol description
- `content/docs/sdks/community-sdks.mdx:64` — Kasia Indexer description

### Suggested fixes

- If these ecosystems are out of scope for canonical docs, move them into a clearly labeled `Ecosystem / Third-Party` area and add a persistent disclaimer at page top.
- In core/reference pages, replace "layer-2 protocols" wording with neutral protocol wording such as "future extensions" unless L2 is intentionally in scope.

---

## 2) Stale Go-`kaspad` references that should point to current `rusty-kaspa` behavior

### Confirmed stale/inaccurate items

1. Old default data directories (Go-era `.kaspad`) still documented as current defaults:
- `content/docs/node-operations/running-a-node.mdx:92`
- `content/docs/node-operations/running-a-node.mdx:93`
- `content/docs/node-operations/running-a-node.mdx:94`
- `content/docs/node-operations/upgrading.mdx:33`

Why stale:
- `rusty-kaspa` default app dir is `.rusty-kaspa` on non-Windows and `rusty-kaspa` on Windows local data dir.
  - Source: `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:82-87`
- Runtime DB path is built under `<appdir>/<network.to_prefixed()>/datadir`.
  - Source: `/Users/luke/Projects/rusty-kaspa/kaspad/src/daemon.rs:325`

2. RPC transport attribution implies gRPC is tied to old `kaspad` while wRPC is tied to Rust node:
- `content/docs/reference/api-reference.mdx:10`
- `content/docs/reference/glossary.mdx:194`

Why stale/inaccurate:
- Current `kaspad` (from `rusty-kaspa`) exposes gRPC and wRPC endpoints.
  - Source: `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:239-270`

### Suggested fixes

- Replace old default paths with current defaults:
  - Linux/macOS root: `~/.rusty-kaspa/`
  - Windows root: `%LOCALAPPDATA%\rusty-kaspa\`
  - Per-network subdir examples should include `network.to_prefixed()` naming (e.g. `kaspa-mainnet`, `kaspa-testnet-10`).
- Update RPC wording to:
  - "`rusty-kaspa` exposes both gRPC and wRPC; wRPC is generally preferred for new app integrations."

---

## 3) Major global constants validation

## Validation matrix

| Constant | Docs state | Primary-source evidence | Verdict |
|---|---|---|---|
| Block rate | Mainnet 10 BPS, 100 ms target | `TenBps` config and `target_time_per_block = 1000/BPS` in `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:24,31-33,49-54`; KIP-14 BPS transition in `/Users/luke/Projects/kips/kip-0014.md:31-33` | ✅ Correct |
| GHOSTDAG K | K=124 at 10 BPS | `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:40`; KIP-14 `/Users/luke/Projects/kips/kip-0014.md:37` | ✅ Correct |
| Finality/pruning depths | 432,000 / 1,080,000 at 10 BPS | Durations in `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/constants.rs:70,73`; depth formulas in `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/bps.rs:92-107` | ✅ Correct |
| Network IDs/names | Docs frequently treat `testnet-11` as active alongside `testnet-10` | Consensus params only support suffix `10`: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:517-520`; CLI default suffix is 10: `/Users/luke/Projects/rusty-kaspa/kaspad/src/args.rs:120`; network name comes from `to_prefixed()`: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/config/params.rs:417-418` | ❌ Drift in docs |
| Emission cap/horizon wording | Docs mostly say "~28.7B"; one page calls `MAX_SOMPI` hard cap at 29B | `MAX_SOMPI` is max tx amount constant, not explicit emission-cap semantic: `/Users/luke/Projects/rusty-kaspa/consensus/core/src/constants.rs:23-24`; subsidy schedule table runs until zero subsidy (`426` months table): `/Users/luke/Projects/rusty-kaspa/consensus/src/processes/coinbase.rs:25,275-280` | ⚠️ Inconsistent wording |

### Emission evidence run (from primary source code)

Command run:

```bash
cargo test --release --package kaspa-consensus --lib \
  processes::coinbase::tests::calc_high_bps_total_rewards_delta -- --nocapture
```

Observed output:

```text
Total rewards: 2837624239795181400 sompi => 28376242397 KAS
Total high bps rewards: 2837624244967998000 sompi => 28376242449 KAS
Delta: 5172816600 sompi => 51 KAS
```

Interpretation:
- Consensus emission total is ~28.376B KAS range (depending on pre/post-Crescendo rounding path), not a precise 28.700B number.
- `29B` from `MAX_SOMPI` should not be presented as the emission hard cap without explicit qualification.

## Network-name drift locations to fix (docs)

`testnet-11` appears in these scope files and should be reviewed against current supported network IDs:

- `content/docs/guides/dev-environment.mdx:125`
- `content/docs/guides/testnet-development.mdx:3,12,49,126`
- `content/docs/protocol-evolution/crescendo.mdx:61` (historical mention; keep as historical if retained)
- `content/docs/reference/glossary.mdx:215`
- `content/docs/reference/network-params.mdx:245`
- `content/docs/rpc/connecting.mdx:437,447,483`
- `content/docs/rpc/grpc/overview.mdx:33`
- `content/docs/rpc/wrpc/get-current-network.mdx:14`
- `content/docs/sdks/community-sdks.mdx:104`
- `content/docs/sdks/overview.mdx:87`
- `content/docs/sdks/wasm-sdk.mdx:234,236`
- `content/docs/wallets/wallet-sdk.mdx:52`

`kaspa-testnet` (without suffix) also appears and should be aligned with runtime naming:

- `content/docs/node-operations/configuration.mdx:94`
- `content/docs/node-operations/testnet.mdx:43,77`

---

## Concrete, prioritized fix set

1. **Correct default data-dir docs to `rusty-kaspa` paths**
- Update `running-a-node.mdx` and `upgrading.mdx` path examples away from `.kaspad`.

2. **Fix RPC transport attribution language**
- Update `reference/api-reference.mdx` and `reference/glossary.mdx` to reflect that `rusty-kaspa` supports both gRPC and wRPC.

3. **Normalize active network naming to current supported set**
- Treat `testnet-10` as current supported public testnet in operational docs.
- Keep `testnet-11` only where clearly marked historical/contextual.
- Update directory/name examples to suffixed forms (e.g., `kaspa-testnet-10`).

4. **Unify emission-cap wording**
- Stop presenting `MAX_SOMPI` as the monetary hard cap.
- Pick one canonical docs phrasing for supply (with explicit "approximate" and source note), and keep it consistent across reference/core/mining/RPC docs.
