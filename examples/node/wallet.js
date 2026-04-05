globalThis.WebSocket = require("websocket").w3cwebsocket;

const path = require("path");
const kaspa = require("../kaspa-wasm32-sdk/nodejs/kaspa");
const { Wallet, Resolver, AccountKind, setDefaultStorageFolder, kaspaToSompi } =
  kaspa;

const walletSecret = "replace-with-wallet-secret";
const filename = "wallet-example";
const networkId = "mainnet";
const recipient = "kaspatest:replace-with-recipient";
const payload = new TextEncoder().encode("order:1337");
const broadcast = false;

(async () => {
  setDefaultStorageFolder(path.join(__dirname, "wallet-data"));

  const wallet = new Wallet({
    resident: false,
    networkId,
    resolver: new Resolver(),
  });

  try {
    if (!(await wallet.exists(filename))) {
      await wallet.walletCreate({
        walletSecret,
        filename,
        title: "Wallet example",
      });
    } else {
      await wallet.walletOpen({
        walletSecret,
        filename,
        accountDescriptors: false,
      });
    }

    await wallet.accountsEnsureDefault({
      walletSecret,
      type: new AccountKind("bip32"),
    });

    wallet.addEventListener(({ type, data }) => {
      if (
        ["balance", "discovery", "error", "pending", "maturity"].includes(type)
      ) {
        console.log("[wallet-event]", type, data);
      }
    });

    await wallet.connect({ blockAsyncConnect: true });
    await wallet.start();

    const { accountDescriptors } = await wallet.accountsEnumerate({});
    const account = accountDescriptors[0];

    await wallet.accountsActivate({
      accountIds: [account.accountId],
    });

    console.log("Send from:", String(account.receiveAddress));

    if (broadcast) {
      const result = await wallet.accountsSend({
        accountId: account.accountId,
        walletSecret,
        priorityFeeSompi: 0n,
        destination: [
          {
            address: recipient,
            amount: kaspaToSompi("1"),
          },
        ],
        payload,
      });

      console.log(result);
    } else {
      const result = await wallet.accountsEstimate({
        accountId: account.accountId,
        priorityFeeSompi: 0n,
        destination: [
          {
            address: recipient,
            amount: kaspaToSompi("1"),
          },
        ],
        payload,
      });

      console.log(result);
      console.log(
        "Set broadcast = true in this file to submit the transaction.",
      );
    }
  } finally {
    await wallet.stop().catch(() => {});
    await wallet.disconnect().catch(() => {});
    await wallet.walletClose({}).catch(() => {});
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
