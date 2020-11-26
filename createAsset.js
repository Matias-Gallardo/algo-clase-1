const algosdk = require("algosdk");
const waitForConfirmation = require("./waitForConfirmation");
const config = require("dotenv").config();

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";
const algodToken = {
  "X-API-Key": config.parsed.ALGOKEY,
};

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// CUENTA CREADORA
(async () => {
  const mnemonic =
    "health steak regular employ panel fragile during vibrant neck soldier into visit machine enact bracket oxygen sign today artefact nasty tone upgrade grant abstract thunder";
  const creator = algosdk.mnemonicToSecretKey(mnemonic);
  const params = await algodClient.getTransactionParams().do();

  let note = algosdk.encodeObj("Mi primer token");
  let addr = creator.addr;
  // Whether user accounts will need to be unfrozen before transacting
  let defaultFrozen = false;
  // integer number of decimals for asset unit calculation
  let decimals = 0;
  // total number of this asset available for circulation
  let totalIssuance = 1000;
  // Used to display asset units to user
  let unitName = "LATINUM";
  // Friendly name of the asset
  let assetName = "latinum";
  // Optional string pointing to a URL relating to the asset
  let assetURL = "http://someurl";
  // Optional hash commitment of some sort relating to the asset. 32 character length.
  let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
  // The following parameters are the only ones
  // that can be changed, and they have to be changed
  // by the current manager
  // Specified address can change reserve, freeze, clawback, and manager
  let manager = creator.addr;
  // Specified address is considered the asset reserve
  // (it has no special privileges, this is only informational)
  let reserve = creator.addr;
  // Specified address can freeze or unfreeze user asset holdings
  let freeze = creator.addr;
  // Specified address can revoke user asset holdings and send
  // them to other addresses
  let clawback = creator.addr;

  // signing and sending "txn" allows "addr" to create an asset
  let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    addr,
    note,
    totalIssuance,
    decimals,
    defaultFrozen,
    manager,
    reserve,
    freeze,
    clawback,
    unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    params
  );

  let rawSignedTxn = txn.signTxn(creator.sk);
  let tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  console.log("Transaction : " + tx.txId);
  let assetID = null;
  // wait for transaction to be confirmed
  await waitForConfirmation(algodClient, tx.txId);
  // Get the new asset's information from the creator account
  let ptx = await algodClient.pendingTransactionInformation(tx.txId).do();
  assetID = ptx["asset-index"];
  console.log(assetID);
})();
