globalThis.WebSocket = require("websocket").w3cwebsocket;

const kaspa = require("../kaspa-wasm32-sdk/nodejs/kaspa");
const { RpcClient, Resolver, Encoding } = kaspa;

const networkId = "mainnet";
const rpcUrl = undefined;

(async () => {
  const rpc = new RpcClient({
    networkId,
    encoding: Encoding.Borsh,
    ...(rpcUrl ? { url: rpcUrl } : { resolver: new Resolver() }),
  });

  try {
    await rpc.connect();

    const dagInfo = await rpc.getBlockDagInfo();
    console.log(dagInfo);
    console.log("Pruning point:", dagInfo.pruningPointHash);
  } finally {
    await rpc.disconnect().catch(() => {});
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
