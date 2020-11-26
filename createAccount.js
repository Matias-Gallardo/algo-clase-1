const algosdk = require("algosdk");
const config = require("dotenv").config();

const account = algosdk.generateAccount();
const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
console.log("My address: " + account.addr);
console.log("Mnemonic: " + mnemonic);

(async () => {
  const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algodPort = "";
  const algodToken = {
    "X-API-Key": config.parsed.ALGOKEY,
  };
  const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

  let accountInfo = await algodClient.accountInformation(account.addr).do();
  console.log("Account balance: %d microAlgos", accountInfo.amount);
})();
