// use standard http request to broadcast the transaction
// but first: create the tx object, sign
// afterwards broadcast: check on ethereums ethers
// mvsd-rawsign implementation
// further use the wallet/broadcast to create a simple wallet online

async function TransactionBuilder(txInput, ...args) {
  // build tx and sign and return?
}

async function BroadCastTransaction(transactionObj = {}) {
  // broadcast tx object to the network and add waiting status

}