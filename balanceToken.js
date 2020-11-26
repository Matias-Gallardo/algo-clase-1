const algosdk = require("algosdk");
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

(async () => {
  const accountInfo = await algodClient.accountInformation(creator.addr).do();
  console.log(accountInfo);
})();
