globalThis.WebSocket = require("websocket").w3cwebsocket;

const kaspa = require("../kaspa-wasm32-sdk/nodejs/kaspa");
const { RpcClient, Resolver, Encoding } = kaspa;

const networkId = "mainnet";
const rpcUrl = undefined;
const startHash = undefined;

(async () => {
  const rpc = new RpcClient({
    networkId,
    encoding: Encoding.Borsh,
    ...(rpcUrl ? { url: rpcUrl } : { resolver: new Resolver() }),
  });

  try {
    await rpc.connect();

    const { pruningPointHash } = await rpc.getBlockDagInfo();

    const response = await rpc.getVirtualChainFromBlockV2({
      startHash: startHash ?? pruningPointHash,
      minConfirmationCount: 10,
      dataVerbosityLevel: "High",
    });

    // rollback previously ingested txs that are tied to no longer accepted blocks
    for (const removedBlockHash of response.removedChainBlockHashes) {
      // Here: handle rollback
      console.log(`block ${removedBlockHash} is no longer accepted`);
    }

    response.removedChainBlockHashes;

    for (const block of response.chainBlockAcceptedTransactions) {
      for (const tx of block.acceptedTransactions) {
        console.log(
          block.chainBlockHeader.hash,
          tx.verboseData?.transactionId,
          tx.payload,
        );
      }
    }

    const nextCheckpoint =
      response.addedChainBlockHashes[
        response.addedChainBlockHashes.length - 1
      ] ??
      startHash ??
      pruningPointHash;

    console.log("Next checkpoint:", nextCheckpoint);
  } finally {
    await rpc.disconnect().catch(() => {});
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
