# RPC REST Fact-Check Report
Date: 2026-02-27 (UTC)
Scope: files listed in `audit/chunks/rpc_rest.txt`

## Status Summary
| File | Status | Notes |
|---|---|---|
| `content/docs/rpc/rest/addresses.mdx` | **ISSUES** | Pagination params, multi-address query model, and error semantics are incorrect/outdated. |
| `content/docs/rpc/rest/blocks.mdx` | **ISSUES** | `lowHash` semantics/defaults and several field/type descriptions are incorrect/outdated. |
| `content/docs/rpc/rest/network-info.mdx` | **ISSUES** | `/info/hashrate` params/units are incorrect; some operational claims are not evidenced. |
| `content/docs/rpc/rest/transactions.mdx` | **ISSUES** | Some mass/field/error descriptions do not match current behavior/spec. |
| `content/docs/rpc/rest/virtual-chain.mdx` | **ISSUES** | Describes non-existent REST endpoint; content matches wRPC method semantics instead. |

## File Findings

### `content/docs/rpc/rest/addresses.mdx` — **ISSUES**
**Verified**
- `/addresses/{kaspaAddress}/balance`, `/utxos`, `/full-transactions`, `/full-transactions-page`, and `/transactions-count` exist in current REST spec. [E1]
- `limit` default for `/full-transactions` is `50`, `offset` exists, and previous-outpoint mode supports `light`/`full` (plus `no`). [E2]
- Balance is based on unspent outputs; core RPC API documents balance as total in unspent transactions. [E3]
- Sompi unit conversion (`1 KAS = 100,000,000 sompi`) is correct. [E4][E5]

**Issues**
- `/full-transactions-page` does **not** use `page`; it uses `before`/`after` cursor-like params, and `limit` default is `50` (not `25`). [E6][E7]
- `/full-transactions-page` response is an array with pagination headers (`x-next-page-before`) rather than a metadata-wrapped page object as documented. [E8]
- Multi-address comma-separated path (`/addresses/a,b,c/balance`) is incorrect; current API uses POST `/addresses/balances` and POST `/addresses/utxos`. [E9][E10]
- Invalid address format returns `422` validation error (not `400`), and error body shape is `{"detail":...}` (not `{"error":...}`). [E10]
- Example typing is stale in places (e.g., `utxoEntry.blockDaaScore` is currently a string). [E11]

**Unverified**
- Public rate-limit policy details (`per IP`, guaranteed `429`, retry guidance) are plausible but not documented in the OpenAPI and were not provable from primary sources in this pass. [E12]

---

### `content/docs/rpc/rest/blocks.mdx` — **ISSUES**
**Verified**
- `/blocks/{blockId}` and `/blocks` exist; `/blocks/{blockId}` supports `includeTransactions` and `includeColor`. [E13]
- There is no `/blocks/tip` path in current REST OpenAPI; using `/info/blockdag` for tip hashes is valid. [E13][E14]
- `404` for unknown-but-well-formed block hash is observed. [E10]

**Issues**
- Docs say `lowHash` is exclusive; current behavior includes the provided hash in `blockHashes` (inclusive). [E15]
- Docs state `includeBlocks` default is `true`; spec default is `false`. [E13]
- Several field type claims are outdated: block header/verbose values like `timestamp`, `nonce`, `daaScore`, `blueScore` are currently strings in responses. [E16][E17]
- `verboseData.isHeaderOnly` is documented but not present in current block response schema/sample. [E16]
- Error table omits current validation behavior (`422` for malformed hash) and uses `400` for format issues. [E10][E13]

**Unverified**
- Statement that `verboseData` is computed/not serialized is technically plausible but not explicitly stated in the REST spec itself. [E13]

---

### `content/docs/rpc/rest/network-info.mdx` — **ISSUES**
**Verified**
- `/info/blockdag`, `/info/network`, `/info/coinsupply`, `/info/coinsupply/circulating`, `/info/coinsupply/total`, `/info/fee-estimate`, `/info/health`, `/info/virtual-chain-blue-score` exist. [E14]
- `/info/network` is explicitly an alias of `/info/blockdag` and marked deprecated in OpenAPI. [E14]
- Coin supply endpoints and response formats match current behavior (`coinsupply` JSON, circulating/total as plain text numeric). [E14][E18]
- Fee-estimate and health response structures match documented shape at high level. [E18]
- Max supply and smooth yearly half-life emission statement is consistent with official Kaspa tokenomics page. [E19]

**Issues**
- `/info/hashrate` does not accept `windowSize`; current query param is `stringOnly`. [E20]
- Hashrate unit is documented by API as `TH/s`, not hashes-per-second. [E20][E21]
- Error section is incomplete/outdated for current validation behavior (`422` on invalid query in endpoints that validate strict params). [E6][E20]

**Unverified**
- Operational claim that minimum fee `1 sompi/gram` is "usually sufficient" under normal conditions is environment-dependent and not provable as a stable fact from primary specs. [E33]

---

### `content/docs/rpc/rest/transactions.mdx` — **ISSUES**
**Verified**
- `/transactions/{transaction_id}` exists with `inputs` and `outputs` query params defaulting to `true`; `resolve_previous_outpoints` supports `no|light|full`. [E23]
- `POST /transactions` exists, uses `SubmitTransactionRequest`, and returns `200/400/422` in spec. [E24]
- Submission schema requires signed input material (`signatureScript`, etc.), supporting the statement that signing must happen client-side before submit. [E24]
- Core definitions align with fee-rate-per-gram and multi-component mass model (compute/transient/storage). [E25][E26]

**Issues**
- Invalid transaction-id format returns `422` (not `400`). [E10][E23]
- Current responses can include `mass: null` (e.g., coinbase-related tx payloads), conflicting with strict "computed mass string" framing. [E27][E28]
- Error table includes statuses not evidenced in this audit (`429`, `500`) and misses observed validation semantics. [E10][E23][E24]

**Unverified**
- Some explanatory text in "Understanding Mass and Fees" is conceptually aligned but not formally specified in REST docs as strict endpoint contracts (presentation-level claim). [E25][E26]

---

### `content/docs/rpc/rest/virtual-chain.mdx` — **ISSUES**
**Verified**
- Current REST endpoint is `/virtual-chain` with `blueScoreGte`, `limit`, `resolveInputs`, `includeCoinbase`. [E29]
- Current REST response is an array of virtual-chain blocks/transactions (`VcBlockModel` shape). [E29][E30]

**Issues**
- Documented endpoint `/virtual-chain-from-block/{startHash}` is not present in REST OpenAPI and returns REST `404 Not Found`. [E22][E29]
- Documented request/response model (`removedChainBlockHashes`, `addedChainBlockHashes`, `includeAcceptedTransactionIds`) does not match REST `/virtual-chain`; it corresponds to core RPC/wRPC `get_virtual_chain_from_block` semantics. [E31][E32]
- Pagination guidance in this file (`repeat with last added hash`) is incompatible with current REST endpoint contract. [E29][E30]

**Unverified**
- Narrative claims about typical reorg depth ("1-2 blocks") are plausible but not established as protocol guarantees in primary sources used here. [E34]

## Evidence Index
- **[E1]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:15`
- **[E2]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:221`
- **[E3]** `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:325`
- **[E4]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/constants.rs:12`
- **[E5]** `/Users/luke/Projects/kips/kip-0009.md:86`
- **[E6]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:303`
- **[E7]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/status_code_probes.txt:5`
- **[E8]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/address_full_transactions_page_limit1.pretty.json:1`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/address_full_transactions_page_headers.txt:6`
- **[E9]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:160`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:434`
- **[E10]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/status_code_probes.txt:2`
- **[E11]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/address_utxos.pretty.json:8`
- **[E12]** `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/addresses.mdx:186`
- **[E13]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:655`
- **[E14]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:781`
- **[E15]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/blocks_lowhash_tip_check.txt:1`
- **[E16]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/block_tip.pretty.json:7`
- **[E17]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/block_tip.pretty.json:584`
- **[E18]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_coinsupply.pretty.json:1`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_coinsupply_circulating.txt:1`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_fee_estimate.pretty.json:1`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_health.pretty.json:1`
- **[E19]** `https://kaspa.org/tokenomics/` and local extraction `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/kaspa_tokenomics.md:3`
- **[E20]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:583`
- **[E21]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_hashrate.pretty.json:1`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/info_hashrate_string.txt:1`
- **[E22]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/status_code_probes.txt:20`
- **[E23]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:989`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:1307`
- **[E24]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:1140`, `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:1339`
- **[E25]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/tx.rs:474`, `/Users/luke/Projects/rusty-kaspa/wallet/core/src/wasm/api/message.rs:1404`
- **[E26]** `/Users/luke/Projects/rusty-kaspa/consensus/core/src/mass/mod.rs:150`
- **[E27]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/tx_tip0.pretty.json:5`
- **[E28]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/address_full_transactions_limit1.pretty.json:6`
- **[E29]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/openapi_snippets.txt:1231`
- **[E30]** `/Users/luke/Projects/docs_kaspa_org/audit/evidence/rpc_rest/virtual_chain_sample.pretty.json:1`
- **[E31]** `/Users/luke/Projects/rusty-kaspa/rpc/core/src/api/rpc.rs:245`
- **[E32]** `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/virtual-chain.mdx:18`
- **[E33]** `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/network-info.mdx:209`
- **[E34]** `/Users/luke/Projects/docs_kaspa_org/content/docs/rpc/rest/virtual-chain.mdx:90`
