const algosdk = require("algosdk");
const config = require("dotenv").config();

const algodIndexer = "https://testnet-algorand.api.purestake.io/idx2";
const algodPort = "";
const algodToken = {
  "X-API-Key": config.parsed.ALGOKEY,
};

const mnemonic =
  "health steak regular employ panel fragile during vibrant neck soldier into visit machine enact bracket oxygen sign today artefact nasty tone upgrade grant abstract thunder";
const creator = algosdk.mnemonicToSecretKey(mnemonic);

(async () => {
  const indexer = new algosdk.Indexer(algodToken, algodIndexer, algodPort);
  const query = {
    txid: "QOOBRVQMX4HW5QZ2EGLQDQCQTKRF3UP3JKDGKYPCXMI6AVV35KQA",
  };

  console.log(
    await indexer.searchForTransactions().txid(query.txid).limit(1).do()
  );
})();
