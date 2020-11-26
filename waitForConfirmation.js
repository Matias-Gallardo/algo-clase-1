const waitForConfirmation = async function (algodclient, txId) {
  let status = await algodclient.status().do();
  let lastRound = status["last-round"];
  const confirmations = 10;
  const blocksToWait = lastRound + confirmations;
  while (blocksToWait > lastRound) {
    const pendingInfo = await algodclient
      .pendingTransactionInformation(txId)
      .do();
    if (
      pendingInfo["confirmed-round"] !== null &&
      pendingInfo["confirmed-round"] > 0
    ) {
      //Got the completed Transaction
      console.log(
        "Transaction " +
          txId +
          " confirmed in round " +
          pendingInfo["confirmed-round"]
      );
      break;
    }
    lastRound++;
    await algodclient.statusAfterBlock(lastRound).do();
  }
};

module.exports = waitForConfirmation;
