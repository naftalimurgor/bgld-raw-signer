const { default: axios } = require("axios");
const Transaction = require("../jsbgl/src/classes/transaction");
const { API_URL, BITGESELL_NODE_RPC } = require("../network/constants");

async function generateTxObject({
  fromAddress,
  toAddress,
  amount,
  privateKey
}) {
  try {
    await jsbgl.asyncInit(globalThis);
  } catch (error) {
    console.log(error);
  }

  const transaction = new globalThis.Transaction()
  const utxos = await fetchAddressUTxos(fromAddress)
  if (!utxos) return

  if (utxos) {
    for (const key in utxos) {
      const utxo = utxos[key]
      transaction.addInput({
        txid: utxo.txId,
        vOut: utxo.vOut,
        address: fromAddress
      })
    }

    transaction.addOutput({
      value: amount,
      address: toAddress
    })

    let utxoCount = 0

    // sign tx object
    for (const key in utxos) {
      const utxo = utxos[key]
      transaction.signInput(utxoCount, {
        privateKey,
        value: utxo.amount
      })
      utxoCount++
    }
    const newTx = transaction.serialize()
    return newTx
  }

}

async function fetchAddressUTxos(address) {
  try {
    const { data: utxo } = await axios.get(`${API_URL}/address/unconfirmed/transactions/${address}`)
    return utxo
  } catch (error) {
    console.error(error)
  }
}

async function broadCastTransaction({
  fromAddress,
  toAddress,
  amount,
  privateKey
}) {
  const newTx = generateTxObject({ fromAddress, toAddress, amount, privateKey })

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: `{"jsonrpc":"1.0","id":"curltext","method":"sendrawtransaction","params":["${newTx}"]}`,

  }
  // broad cast tx to the network
  try {
    const { data: res } = await axios.post(BITGESELL_NODE_RPC, payload.body, { headers: payload.headers })
    return res
  } catch (error) {
    console.log(error)
  }

}
module.exports = { broadCastTransaction, generateTxObject }