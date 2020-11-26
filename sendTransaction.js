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
const myAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(myAccount.addr);
const myAddress = "CI7M7TJZIEWOADPHMXEZGIXRVNRALAGPBWGCL5YILINKBTQ3RUBCZ4GKAE";

(async () => {
  const params = await algodClient.getTransactionParams().do();
  console.log("Params", params);
  params.fee = 1000;
  params.flatFee = true; //SI SUBE EL FEE LO PUEDE SUBIR HASTA EL MÍNIMO SUGERIDO
  const receiver = "GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A";
  const note = algosdk.encodeObj("Hello World");

  const txnParams = algosdk.makePaymentTxnWithSuggestedParams(
    myAccount.addr,
    receiver,
    1000,
    undefined,
    note,
    params
  );

  const signedTxn = txnParams.signTxn(myAccount.sk);
  const txId = txnParams.txID().toString();
  console.log("Signed transaction with txID: %s", txId);

  await algodClient.sendRawTransaction(signedTxn).do();

  await waitForConfirmation(algodClient, txId);

  const confirmedTx = await algodClient
    .pendingTransactionInformation(txId)
    .do();
})();
