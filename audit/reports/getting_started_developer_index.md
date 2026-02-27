# Getting Started + Developer Guide + Index Fact-Check Report

Date: 2026-02-27  
Scope:
- `content/docs/getting-started/first-transaction.mdx`
- `content/docs/getting-started/installation.mdx`
- `content/docs/getting-started/quick-start.mdx`
- `content/docs/getting-started/what-is-kaspa.mdx`
- `content/docs/getting-started/why-kaspa.mdx`
- `content/docs/developer-guide/building-apps.mdx`
- `content/docs/developer-guide/integration.mdx`
- `content/docs/index.mdx`

Primary sources used:
- `rusty-kaspa` code/docs (`/Users/luke/Projects/rusty-kaspa`)
- `kips` (`/Users/luke/Projects/kips`)
- Official Kaspa docs/site pages (including `kaspa.org`)

Notes on tooling:
- `brave-search` skill was selected for web verification, but `BRAVE_API_KEY` is not set in this environment; fallback validation used direct official web sources via `curl`.

## Status Summary

| File | Status | Notes |
|---|---|---|
| `content/docs/getting-started/first-transaction.mdx` | `ISSUES` | CLI command surface/defaults are outdated in multiple places. |
| `content/docs/getting-started/installation.mdx` | `ISSUES` | Default data directory path is imprecise for chain DB location. |
| `content/docs/getting-started/quick-start.mdx` | `ISSUES` | wRPC default behavior/JSON port usage is incorrect. |
| `content/docs/getting-started/what-is-kaspa.mdx` | `ISSUES` | Contains overstatements and an unqualified max-supply claim. |
| `content/docs/getting-started/why-kaspa.mdx` | `ISSUES` | Contains overstatements about rewards/energy/fairness. |
| `content/docs/developer-guide/building-apps.mdx` | `ISSUES` | Uses outdated virtual-chain subscription API names/signatures. |
| `content/docs/developer-guide/integration.mdx` | `ISSUES` | Address/case rules and mempool statement contain factual errors. |
| `content/docs/index.mdx` | `UNVERIFIED` | Most links validated; `/docs/cookbook` root route is not provable from file presence alone. |

---

## File Findings

### `content/docs/getting-started/first-transaction.mdx`
Status: `ISSUES`

Verified claims:
- `kaspa-wallet` is built from the rusty-kaspa workspace (`wallet/native` package exists): `rusty-kaspa/wallet/native/Cargo.toml:1-3`.
- Addresses and network prefixes: `kaspa`, `kaspatest`, `kaspasim`, `kaspadev`: `rusty-kaspa/crypto/addresses/src/lib.rs:86-90,117-120`.
- UTXO-index requirement for UTXO subscription/query RPCs: `rusty-kaspa/rpc/grpc/core/proto/rpc.proto:505-509,553-556,566-569`.

Issues:
1. Incorrect default wallet connection target.
- Claim: wallet defaults to local `127.0.0.1:17110` (`first-transaction.mdx:21`).
- Evidence: default wallet setting is `Server = "public"` (`rusty-kaspa/wallet/core/src/settings.rs:30-32`), and `connect` resolves to public node when setting is `public`/unset (`rusty-kaspa/cli/src/modules/connect.rs:13-22`).
- Proposed fix: change wording to "default is public resolver-backed node; use `server 127.0.0.1:17110` (or equivalent) to force local node".

2. Command examples do not match current CLI command surface.
- Claims: top-level `create`, `import`, `balance`, `compound` commands (`first-transaction.mdx:29,91,140,150,159-166`).
- Evidence: top-level handlers are registered in `rusty-kaspa/cli/src/modules/mod.rs:55-63`; there is no `balance` or `compound` handler. Wallet creation/import are subcommands under `wallet` (`rusty-kaspa/cli/src/modules/wallet.rs:39-55,104-120`). Consolidation command is `sweep` (`rusty-kaspa/cli/src/modules/sweep.rs:3-5`).
- Proposed fix: update command examples to:
  - `wallet create`
  - `wallet import`
  - balance via `list` / account context tooling
  - consolidation via `sweep` (or remove manual command section).

3. Mnemonic word count is incorrect.
- Claim: wallet creation/import uses 24-word mnemonic (`first-transaction.mdx:32,35,153`).
- Evidence: wallet creation wizard sets `WordCount::Words12` (`rusty-kaspa/cli/src/wizards/wallet.rs:26`).
- Proposed fix: change to "12-word by default (BIP39), depending on wallet/import source".

4. Send flow confirmation prompt text is not aligned with current CLI behavior.
- Claim: explicit `Confirm (y/n)` before broadcast (`first-transaction.mdx:110-117`).
- Evidence: current `send` flow parses args, asks secrets, submits, prints summary; no explicit y/n confirmation prompt in handler (`rusty-kaspa/cli/src/modules/send.rs:14-45`).
- Proposed fix: replace with actual send flow output, or state "you will be asked for wallet/payment secrets".

Unverified claims:
- Fixed timing guarantees like "full confirmation ~10 seconds" (`first-transaction.mdx:125`) are policy/conditions dependent; not a protocol constant.
- Fiat-denominated fee statement (`first-transaction.mdx:120`) is market-price dependent.

---

### `content/docs/getting-started/installation.mdx`
Status: `ISSUES`

Verified claims:
- Rusty-kaspa is recommended node software: `rusty-kaspa/README.md:5-6`.
- `--utxoindex` flag exists: `rusty-kaspa/kaspad/src/args.rs:338`.
- gRPC default port 16110 / testnet 16210: `rusty-kaspa/kaspad/src/args.rs:239-247`, `rusty-kaspa/consensus/core/src/network.rs:42-49`.
- Default app dir roots: non-Windows `~/.rusty-kaspa`, Windows local appdata: `rusty-kaspa/kaspad/src/daemon.rs:82-87`.

Issue:
1. Data directory path for chain DB is imprecise.
- Claim: blockchain data default shown as `~/.rusty-kaspa/kaspa-mainnet/` (`installation.mdx:111-113`).
- Evidence: actual DB path is `app_dir / network.to_prefixed() / datadir` (`rusty-kaspa/kaspad/src/daemon.rs:325`), with `network.to_prefixed()` = `kaspa-mainnet` (`rusty-kaspa/consensus/core/src/network.rs:265-268`).
- Proposed fix: specify DB location as `~/.rusty-kaspa/kaspa-mainnet/datadir/` (and optionally mention logs under `.../logs/`).

Unverified claims:
- Hardware/time guidance values (`installation.mdx:133-137`) are operational heuristics, not protocol constants.

---

### `content/docs/getting-started/quick-start.mdx`
Status: `ISSUES`

Verified claims:
- Mainnet P2P default port 16111: `rusty-kaspa/consensus/core/src/network.rs:244-245`.
- gRPC default on 16110: `rusty-kaspa/consensus/core/src/network.rs:42-45`.
- `getInfoRequest`, `getBlockDagInfoRequest`, `getConnectedPeerInfoRequest` message types exist: `rusty-kaspa/rpc/grpc/core/proto/messages.proto:17,27,43`.
- `GetInfoResponse` fields (`p2pId`, `mempoolSize`, `serverVersion`, `isUtxoIndexed`, `isSynced`) exist: `rusty-kaspa/rpc/grpc/core/proto/rpc.proto:702-710`.

Issues:
1. wRPC default enablement is stated incorrectly.
- Claim: wRPC listens on `127.0.0.1:17110` by default (`quick-start.mdx:16`).
- Evidence: wRPC subsystem is disabled by default (`rusty-kaspa/README.md:348-363`), default args set `rpclisten_borsh/json` to `None` (`rusty-kaspa/kaspad/src/args.rs:107-109`), and wRPC services are only registered when listen args are present (`rusty-kaspa/kaspad/src/daemon.rs:724-744`).
- Proposed fix: explicitly require `--rpclisten-borsh=default` (or explicit address) before using wRPC.

2. JSON-over-WebSocket example targets Borsh default port.
- Claim/example: JSON messages to `ws://127.0.0.1:17110` (`quick-start.mdx:47,59,87,100,114`).
- Evidence: JSON wRPC default port is 18110 (testnet 18210), Borsh is 17110 (testnet 17210): `rusty-kaspa/kaspad/src/args.rs:257,269`, `rusty-kaspa/consensus/core/src/network.rs:51-67`.
- Proposed fix: for JSON examples use `--rpclisten-json=default` and `ws://127.0.0.1:18110` (or use Borsh-capable client instead of raw JSON).

3. Testnet wRPC default port claim misses the same enablement caveat.
- Claim: testnet wRPC runs on 17210 by default (`quick-start.mdx:136`).
- Evidence: port mapping is correct, but service is still disabled unless explicitly enabled (same sources as Issue #1).
- Proposed fix: add "when `--rpclisten-borsh` is enabled".

Unverified claims:
- Sync duration estimate (`quick-start.mdx:125`) is environment-dependent.

---

### `content/docs/getting-started/what-is-kaspa.mdx`
Status: `ISSUES`

Verified claims:
- Crescendo changed blockrate 1 BPS -> 10 BPS: `rusty-kaspa/README.md:13-16`, `kips/kip-0014.md:14,31-33`.
- 10 BPS implies 100 ms target time: `rusty-kaspa/consensus/core/src/config/bps.rs:48-54`; mainnet uses 10 BPS params: `rusty-kaspa/consensus/core/src/config/params.rs:588-594`.
- `k=124` at 10 BPS: `rusty-kaspa/consensus/core/src/config/bps.rs:38-41`.
- Launch/fair-launch/no pre-mine/no ICO/no allocations claims are reflected in official Kaspa site pages:
  - `https://kaspa.org/features/` ("November 7, 2021" and "No pre-mine, no ICO, no pre-sales, and no coin allocations")
  - `https://kaspa.org/mining-kaspa/`
  - `https://kaspa.org/tokenomics/`.

Issues:
1. Max supply is presented as an unqualified hard number.
- Claim: "Maximum supply 28.7 billion KAS" (`what-is-kaspa.mdx:65`).
- Evidence: protocol hardcoded max is `MAX_SOMPI = 29,000,000,000 * 1e8` (`rusty-kaspa/consensus/core/src/constants.rs:24`), and RPC proto explicitly notes actual max supply expected to deviate up to `-5%` (`rusty-kaspa/rpc/grpc/core/proto/rpc.proto:761-763`).
- Proposed fix: reword to "approximately 28.7B KAS (protocol maxSompi hardcap is 29B KAS-equivalent; effective circulating max is lower)".

2. Reward/fairness statements are overstated.
- Claims include "no wasted work/energy" and strict proportional reward framing (`what-is-kaspa.mdx:16,22`).
- Evidence: reward handling excludes/adjusts for non-DAA contexts (`rusty-kaspa/consensus/src/processes/coinbase.rs:103-127`), and KIP text discusses reward regulation effects (`kips/kip-0003.md:40,53`).
- Proposed fix: qualify with "Kaspa includes parallel blocks in consensus ordering, reducing traditional orphan-loss effects; reward realization still depends on protocol reward rules (DAA/mergeset context)."

Unverified claims:
- "No venture capital funding / no insider allocation / no developer treasury" and "founding team mined with same public software" (`what-is-kaspa.mdx:36`) are not directly evidenced in code/KIPs.
- "No foundation / no corporate entity" (`what-is-kaspa.mdx:51`) not provable from protocol repositories.
- Cross-chain comparison entries and "smart contracts in development" (`what-is-kaspa.mdx:71-80`) need explicit external citations.

---

### `content/docs/getting-started/why-kaspa.mdx`
Status: `ISSUES`

Verified claims:
- 10 BPS / 100 ms target framing: `rusty-kaspa/consensus/core/src/config/bps.rs:48-54`, `rusty-kaspa/consensus/core/src/config/params.rs:588-594`.
- Max block mass 500,000: `rusty-kaspa/consensus/core/src/config/params.rs:572`.
- kHeavyHash matrix computation implementation exists in consensus PoW code (`rusty-kaspa/consensus/pow/src/matrix.rs`) and official docs describe 64x64/optical motivation (`content/docs/mining/kheavyhash.mdx:28,62-70`).

Issues:
1. "No orphan blocks => no wasted energy" is overstated.
- Claims: `why-kaspa.mdx:37,41,59`.
- Evidence: reward realization includes DAA-window and mergeset nuances (`rusty-kaspa/consensus/src/processes/coinbase.rs:103-127`), and KIP discussion acknowledges reward regulation edge behavior (`kips/kip-0003.md:40,53`).
- Proposed fix: replace absolute language with "reduces traditional orphan-loss inefficiency by including parallel blocks in DAG ordering; rewards/security accounting still follow protocol rules."

2. Strict proportional-reward guarantees are overstated.
- Claim: small miners will earn approximately proportional rewards without orphan variance penalties (`why-kaspa.mdx:39`).
- Evidence: protocol-level reward treatment is more nuanced than unconditional proportional payout (`coinbase.rs` and `kip-0003` sources above).
- Proposed fix: present as tendency, not guarantee.

Unverified claims:
- Comparative table values for other chains (`why-kaspa.mdx:72-82`) need external primary citations.
- Statements like "one of the most permissionlessly decentralized networks in operation" (`why-kaspa.mdx:91`) are evaluative and not source-verifiable as protocol facts.

---

### `content/docs/developer-guide/building-apps.mdx`
Status: `ISSUES`

Verified claims:
- UTXO model and `createTransactions`/compound-chain behavior align with wallet SDK transaction generation model.
- `subscribeUtxosChanged`, `subscribeBlockAdded`, `subscribeVirtualDaaScoreChanged` APIs/events exist in current WASM client.

Issues:
1. Outdated virtual-chain subscription method and event names.
- Claims/examples use `subscribeVirtualSelectedParentChainChanged` and event `virtual-selected-parent-chain-changed` (`building-apps.mdx:220,224,384,394`).
- Evidence: current WASM API is `subscribeVirtualChainChanged`/`unsubscribeVirtualChainChanged` (`rusty-kaspa/rpc/wrpc/wasm/src/client.rs:851-868`), and event name is `virtual-chain-changed` (`rusty-kaspa/rpc/wrpc/wasm/src/notify.rs:20,54`).
- Proposed fix:
  - replace method with `await rpc.subscribeVirtualChainChanged(true)`
  - replace event with `rpc.addEventListener("virtual-chain-changed", ...)`.

2. Subscription argument shape is outdated.
- Claim/example passes object `{ includeAcceptedTransactionIds: true }` (`building-apps.mdx:220-222,390-392`).
- Evidence: current method expects a boolean argument (`client.rs:852-857`).
- Proposed fix: pass boolean directly.

Unverified claims:
- Confirmation policy values (`10+`, `100+`) are integration-policy guidance, not consensus constants.

---

### `content/docs/developer-guide/integration.mdx`
Status: `ISSUES`

Verified claims:
- `1 KAS = 10^8 sompi`: `rusty-kaspa/consensus/core/src/constants.rs:13`.
- Network address prefixes: `kaspa`, `kaspatest`, `kaspasim`, `kaspadev`: `rusty-kaspa/crypto/addresses/src/lib.rs:86-90`.
- `--utxoindex` needed for address-UTXO/balance calls: `rusty-kaspa/rpc/grpc/core/proto/rpc.proto:505-509,553-556,566-569`.

Issues:
1. wRPC default exposure statement is incomplete/inaccurate.
- Claim: node "exposes" wRPC on 17110 (`integration.mdx:49-53`).
- Evidence: wRPC disabled by default unless `--rpclisten-borsh/json` provided (`rusty-kaspa/README.md:348-363`, `rusty-kaspa/kaspad/src/args.rs:107-109`, `rusty-kaspa/kaspad/src/daemon.rs:724-744`).
- Proposed fix: "gRPC is on by default; wRPC must be explicitly enabled."

2. Address type mapping by first character is incomplete.
- Claim: `q = P2PK`, `p = P2SH` (`integration.mdx:86-92`).
- Evidence: address versions include `PubKey`, `PubKeyECDSA`, `ScriptHash` (`rusty-kaspa/crypto/addresses/src/lib.rs:138-145,175-178`).
- Proposed fix: document all supported versions and avoid oversimplified one-character mapping.

3. Case-insensitive address claim is incorrect for parser behavior.
- Claim: "Kaspa addresses are case-insensitive for Bech32 portion" (`integration.mdx:117`).
- Evidence: prefix parsing is strict lowercase matches (`rusty-kaspa/crypto/addresses/src/lib.rs:115-126`), and payload decode uses lowercase charset mapping without normalization (`rusty-kaspa/crypto/addresses/src/bech32.rs:3-10,110-124`).
- Proposed fix: state that canonical lowercase should be used and mixed/uppercase forms are not guaranteed valid by parser.

4. "No pending states like Ethereum mempool" is factually wrong.
- Claim: `integration.mdx:455`.
- Evidence: Kaspa RPC exposes mempool entry APIs (`rusty-kaspa/rpc/grpc/core/proto/messages.proto:16,32,55`; `rpc.proto` mempool messages; `GetInfoResponse` includes `mempoolSize`, `rpc.proto:704`).
- Proposed fix: replace with "Kaspa has a mempool; once included in DAG, acceptance confidence increases rapidly with depth."

5. Max supply is unqualified.
- Claim: `28.7 billion KAS` (`integration.mdx:23`).
- Evidence: same as prior max-supply issue (`constants.rs:24`, `rpc.proto:761-763`).
- Proposed fix: qualify as approximate and explain hardcoded maxSompi vs effective circulation.

Unverified claims:
- Fixed node hardware minimum/recommended table (`integration.mdx:56-63`) is operational guidance, not protocol-defined.
- Confirmation depth table values (`integration.mdx:241-247`) are risk-policy defaults, not protocol constants.

---

### `content/docs/index.mdx`
Status: `UNVERIFIED`

Verified claims:
- Most linked target pages exist in docs source:
  - e.g., `content/docs/getting-started/what-is-kaspa.mdx`, `content/docs/developer-guide/building-apps.mdx`, `content/docs/integrations/exchange-integration.mdx`, etc.

Unverified items:
- `/docs/cookbook` root-link resolution cannot be proven from file existence alone (there is no `content/docs/cookbook.mdx` or `content/docs/cookbook/index.mdx`; only section metadata and child pages).
- "instant confirmations" phrasing is qualitative marketing language and should be tied to explicit target-time wording where precision is needed.

Proposed fixes:
- If `/docs/cookbook` is intended to be directly routable, add a dedicated landing page (`cookbook/index.mdx`) or confirm/generated route behavior in CI.
- Consider wording card description as "~100ms target first-confirmation latency".

---

## Highest-Priority Fixes

1. Fix outdated CLI usage in `getting-started/first-transaction.mdx` (`wallet create/import`, remove `balance`/`compound` assumptions).
2. Fix wRPC enablement and JSON-port usage in `getting-started/quick-start.mdx`.
3. Fix outdated virtual-chain subscription API usage in `developer-guide/building-apps.mdx`.
4. Fix address-case/type and mempool inaccuracies in `developer-guide/integration.mdx`.
5. Add max-supply qualifiers where `28.7B` is currently asserted as an absolute hard cap.
