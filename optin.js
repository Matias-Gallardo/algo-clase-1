const algosdk = require("algosdk");
const waitForConfirmation = require("./waitForConfirmation");
const config = require("dotenv").config();

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";
const algodToken = {
  "X-API-Key": config.parsed.ALGOKEY,
};

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const mnemonic =
  "health steak regular employ panel fragile during vibrant neck soldier into visit machine enact bracket oxygen sign today artefact nasty tone upgrade grant abstract thunder";
const creator = algosdk.mnemonicToSecretKey(mnemonic);

const mnemonicReceiver =
  "grant favorite tomato outdoor clinic bridge lock smooth sand you school join husband text useless cheese truth core alcohol olive only naive dog absent tray";
const receiver = algosdk.mnemonicToSecretKey(mnemonicReceiver);

(async () => {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxn(
    receiver.addr,
    receiver.addr,
    undefined,
    undefined,
    params.fee,
    0,
    params.firstRound,
    params.lastRound,
    undefined,
    params.genesisHash,
    params.genesisID,
    13223867
  );

  const signedTx = txn.signTxn(receiver.sk);
  await algodClient.sendRawTransaction(signedTx).do();
  console.log("Looking..." + txn.txID().toString());
  await waitForConfirmation(algodClient, txn.txID().toString());
})();
