const algosdk = require('algosdk');

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";
const algodToken = {
    'X-API-Key': "xGQHkoJAXm6gQlWuKRDVD6IP4i2hr9ZB7BDFK58f"
}
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

algodClient.status().do().then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});
