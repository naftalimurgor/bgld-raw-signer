#! /usr/bin/env node

const { Command } = require('commander');
const jsbgl = require('./jsbgl/src/jsbgl');
const { generateTxObject, default: send } = require('./send/send');

async function main() {
  try {
    await jsbgl.asyncInit(globalThis);
  } catch (error) {
    console.log(error);
  }

  const program = new Command();
  program
    .name('bgld-signer')
    .description(
      'bgl-signer, - A cli utility signing transactions offline and broadcasting to the Bitgesell Blockchain Network'
    )
    .version('1.0.0');

  /**
   * Command  for all the wallet related operations
   * @param network | tesnet or mainnet
   */
  program
    .command('broadcast')
    .description('Sign and broadcast a transaction to the network')
    .argument('--network')
    .argument('--address')
    .argument('--amount')
    .argument('--privkey')
    .action(async (network, address, amount, privateKey) => {
      try {
        if (seedphrase) {
          const wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
          console.log(`Successfully generated wallet for ${network}: \n`);
          console.log('Wallet PrivateKey:', wallet.accountXPrivateKey);
          console.log('Wallet PrivateKey:', wallet.accountXPublicKey);
          console.log('Wallet seedphrase:', wallet.mnemonic);
          const { accountXPrivateKey: privateKey } = wallet.accountXPrivateKey
          const { accountXPublicKey: fromAddress } = wallet.accountXPublicKey
          const tx = await generateTxObject({
            fromAddress,
            address,
            amount,
            privateKey
          })
          console.log(tx)

        } else if (privateKey) {
          wallet = new globalThis.Wallet({ from: pkey, testnet: false, testnet: false })

          const tx = await generateTxObject({
            fromAddress,
            address,
            amount,
            privateKey
          })
          console.log('Encoded Transactions >:')
          console.log(tx)

        }
      } catch (error) {
        console.log('Failed to generate wallet:', error)
      }

    });


  /**
   * Command  for all the wallet related operations
   * @param network | tesnet or mainnet
   */
  program
    .command('sign')
    .description('Sign a transaction offline and broadcast to the Bitgesell mainnet')
    .argument('--network')
    .argument('--address')
    .argument('--amount')
    .argument('--pkey')
    .action(signCommand);

  async function signCommand(network, address, amount, privateKey) {

    try {
      if (seedphrase) {
        const wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
        console.log(`Successfully generated wallet for ${network}: \n`);
        console.log('Wallet PrivateKey:', wallet.accountXPrivateKey);
        console.log('Wallet PrivateKey:', wallet.accountXPublicKey);
        console.log('Wallet seedphrase:', wallet.mnemonic);
        try {
          if (seedphrase) {
            const wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
            console.log(`Successfully generated wallet for ${network}: \n`);
            console.log('Wallet PrivateKey:', wallet.accountXPrivateKey);
            console.log('Wallet PrivateKey:', wallet.accountXPublicKey);
            console.log('Wallet seedphrase:', wallet.mnemonic);
            const { accountXPrivateKey: privateKey } = wallet.accountXPrivateKey
            const { accountXPublicKey: fromAddress } = wallet.accountXPublicKey
            const tx = await generateTxObject({
              fromAddress,
              address,
              amount,
              privateKey
            })
            console.log(tx)

          } else if (privateKey) {
            wallet = new globalThis.Wallet({ from: pkey, testnet: false, testnet: false })

            const tx = await generateTxObject({
              fromAddress,
              address,
              amount,
              privateKey
            })
            console.log('Encoded Transactions >:')
            console.log(tx)

          }
        } catch (error) {
          console.log('Failed to generate wallet:', error)
        }
      } else if (pkey) {
        wallet = new globalThis.Wallet({ from: pkey, testnet: false, testnet: false })

        try {
          if (seedphrase) {
            const wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
            console.log(`Successfully generated wallet for ${network}: \n`);
            console.log('Wallet PrivateKey:', wallet.accountXPrivateKey);
            console.log('Wallet PrivateKey:', wallet.accountXPublicKey);
            console.log('Wallet seedphrase:', wallet.mnemonic);
            const { accountXPrivateKey: privateKey } = wallet.accountXPrivateKey
            const { accountXPublicKey: fromAddress } = wallet.accountXPublicKey
            const res = await send({
              fromAddress,
              address,
              amount,
              privateKey
            })
            console.log('Sent Transactions to Bitgesell >:')
            console.log(res)

          } else if (privateKey) {
            wallet = new globalThis.Wallet({ from: pkey, testnet: false, testnet: false })

            const res = await send({
              fromAddress,
              address,
              amount,
              privateKey
            })

            console.log('Encoded Transactions >:')
            console.log(res)

          }
        } catch (error) {
          console.log('Failed to generate wallet:', error)
        }
      }
    } catch (error) {
      console.log('Failed to generate wallet:', error)
    }

  }

  program.parse();
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
