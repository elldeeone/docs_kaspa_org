# Post-Remediation Validation Audit - core_ref_mining_sec_a

## Scope
- `content/docs/core-concepts/addresses.mdx`
- `content/docs/core-concepts/blockdag.mdx`
- `content/docs/core-concepts/dagknight.mdx`
- `content/docs/core-concepts/difficulty-adjustment.mdx`
- `content/docs/core-concepts/emission-schedule.mdx`
- `content/docs/core-concepts/fees-and-mass.mdx`
- `content/docs/core-concepts/ghostdag.mdx`
- `content/docs/core-concepts/pruning.mdx`
- `content/docs/core-concepts/scripting.mdx`
- `content/docs/core-concepts/spv.mdx`
- `content/docs/core-concepts/transactions.mdx`
- `content/docs/core-concepts/utxo-model.mdx`
- `content/docs/mining/block-rewards.mdx`
- `content/docs/mining/difficulty-adjustment.mdx`
- `content/docs/mining/hardware.mdx`
- `content/docs/mining/kheavyhash.mdx`

## Sources Checked
- `/Users/luke/Projects/rusty-kaspa`
- `/Users/luke/Projects/kips`

## Status Table

| File | Status |
|---|---|
| `content/docs/core-concepts/addresses.mdx` | **UNVERIFIED** |
| `content/docs/core-concepts/blockdag.mdx` | **UNVERIFIED** |
| `content/docs/core-concepts/dagknight.mdx` | **UNVERIFIED** |
| `content/docs/core-concepts/difficulty-adjustment.mdx` | **ISSUES** |
| `content/docs/core-concepts/emission-schedule.mdx` | **ISSUES** |
| `content/docs/core-concepts/fees-and-mass.mdx` | **ISSUES** |
| `content/docs/core-concepts/ghostdag.mdx` | **VERIFIED** |
| `content/docs/core-concepts/pruning.mdx` | **VERIFIED** |
| `content/docs/core-concepts/scripting.mdx` | **VERIFIED** |
| `content/docs/core-concepts/spv.mdx` | **UNVERIFIED** |
| `content/docs/core-concepts/transactions.mdx` | **ISSUES** |
| `content/docs/core-concepts/utxo-model.mdx` | **VERIFIED** |
| `content/docs/mining/block-rewards.mdx` | **ISSUES** |
| `content/docs/mining/difficulty-adjustment.mdx` | **VERIFIED** |
| `content/docs/mining/hardware.mdx` | **UNVERIFIED** |
| `content/docs/mining/kheavyhash.mdx` | **UNVERIFIED** |

## Counts
- **VERIFIED:** 5
- **ISSUES:** 5
- **UNVERIFIED:** 6
- **TOTAL:** 16

## Residual Issue Claims

### `content/docs/core-concepts/difficulty-adjustment.mdx` (ISSUES)
- `:86` claims DAA uses median timestamps for time-span calculation. Current sampled DAA implementation uses min/max sampled timestamps and average target, not median-timestamp span (`consensus/src/processes/difficulty.rs:230-246`).

### `content/docs/core-concepts/emission-schedule.mdx` (ISSUES)
- `:93-97` states coinbase outputs in a block distribute that block's reward directly to miner address(es). In implementation, coinbase outputs pay mergeset rewards (blue rewards to each block's reported script; red rewards aggregated to merging block miner), while current block subsidy is encoded in coinbase payload (`consensus/src/processes/coinbase.rs:97-141`).
- `:118-123` overstates direct blue-block self-payment semantics. Reward payout is materialized through later merging coinbase construction, not as a guaranteed immediate self-payment output in the same block (`consensus/src/processes/coinbase.rs:107-132`).

### `content/docs/core-concepts/fees-and-mass.mdx` (ISSUES)
- `:127` asserts a hard output-to-input ratio rule (e.g., 1-to-10 rejected). No such explicit ratio rule is present in current standardness/consensus checks; enforcement is via mass limits and policy checks (`consensus/core/src/mass/mod.rs`, `mining/src/mempool/check_transaction_standard.rs:64-70,175-177`).

### `content/docs/core-concepts/transactions.mdx` (ISSUES)
- `:128` says coinbase outputs distribute the block reward to the miner directly in that block. Current coinbase template pays mergeset-based rewards; payout routing differs from this simplification (`consensus/src/processes/coinbase.rs:97-141`).
- `:138` says block miner still receives block reward when a conflicting tx is rejected. This is not universally true for red blocks (red rewards are redirected to merging block miner) (`consensus/src/processes/coinbase.rs:117-132`).

### `content/docs/mining/block-rewards.mdx` (ISSUES)
- `:8` states each block's coinbase creates new KAS and pays it to that block's miner directly. Current implementation builds coinbase outputs from mergeset reward data, with red reward redirection and subsidy carried in payload (`consensus/src/processes/coinbase.rs:97-141`).
- `:42-44` is directionally correct on red reward forfeiture, but framed as immediate per-block coinbase ownership rather than mergeset-based payout construction (`consensus/src/processes/coinbase.rs:117-132`).

## Residual Unverified Claims

### `content/docs/core-concepts/addresses.mdx` (UNVERIFIED)
- `:103` "SLIP-44 registered coin type" claim not verifiable from provided sources (`rusty-kaspa`, `kips`) alone.
- `:132` Bech32 "detect up to 4 character errors" bound not established in provided sources.

### `content/docs/core-concepts/blockdag.mdx` (UNVERIFIED)
- `:47` simpa-specific parameter claim (`delta=0.05`, `max_block_parents ~ 0.66*k`) not verified in provided sources.

### `content/docs/core-concepts/dagknight.mdx` (UNVERIFIED)
- `:44-71` theorem-level optimality/security statements rely on external paper model; not directly verifiable from `rusty-kaspa` + `kips` only (beyond KIP-2 proposed status).

### `content/docs/core-concepts/spv.mdx` (UNVERIFIED)
- `:44-58`, `:61-66`, `:91-120` are conceptual SPV design/behavior claims without a canonical implementation/spec in provided sources.

### `content/docs/mining/hardware.mdx` (UNVERIFIED)
- Market/vendor/hardware-economics assertions are operational and external; not verifiable from `rusty-kaspa` + `kips`.

### `content/docs/mining/kheavyhash.mdx` (UNVERIFIED)
- `:10`, `:64-73` photonic/optical motivation and forward-looking hardware claims are external/research-directional and not established in provided sources.
