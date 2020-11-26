const algosdk = require("algosdk");
const config = require("dotenv").config();

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";
const algodToken = {
  "X-API-Key": config.parsed.ALGOKEY,
};
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

algodClient
  .status()
  .do()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
