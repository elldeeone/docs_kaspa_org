# RPC Overview Live Checks

Date: 2026-02-27

## api.kaspa.org OpenAPI (method inventory)
Source: `https://api.kaspa.org/openapi.json`

```
/addresses/{kaspaAddress}/balance	get
/addresses/utxos	post
/transactions/search	post
/transactions	post
...
```

`/transactions` operation summary:

```
Submit A New Transaction
```

## api.kaspa.org CORS header
Source: `curl -I -H 'Origin: https://example.com' https://api.kaspa.org/info/network`

```
access-control-allow-origin: *
access-control-allow-credentials: true
access-control-expose-headers: X-Data-Source, X-Page-Count, X-Next-Page-After, X-Next-Page-Before
```

## pnn.kaspa.stream availability
Source: `curl -I https://pnn.kaspa.stream`

```
HTTP/2 200
```

## npm package existence
Source: `npm view kaspa-wasm name version --json`

```json
{
  "name": "kaspa-wasm",
  "version": "0.13.0"
}
```

## PyPI package metadata
Source: `https://pypi.org/pypi/kaspa/json`

```
summary: Kaspa Python SDK
project_urls.Source: https://github.com/aspectron/rusty-kaspa/tree/python/python
classifier: Programming Language :: Rust
```
