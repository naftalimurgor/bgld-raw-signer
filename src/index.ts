#! /usr/bin/env node

// @ts-nocheck
const { Command } = require('commander');
const jsbgl = require('../jsbgl/src/jsbgl');
const utils = require("./utils");

async function main() {
    try {
        await jsbgl.asyncInit(globalThis);
    } catch (error) {
        console.log(error);
    }

    const testnetRegegx = /^(Testnet|tesnet|TestNet|test net|testNet)$/i;
    const mainnetRegex = /^(mainnet|Mainnet|MainNet|main net|nainNet)$/i;

    const program = new Command();
    program
        .name('bgld-signer')
        .description(
            'bgl-signer, - A cli utility signing transactions offline and broadcasting to the Bitgesell Blockchain Network'
        )
        .version('1.0.0');

    /**
     * Command for all the address related operations
     * @param network | tesnet or mainnet
     */
    program
        .command('sign')
        .description('Generate an an adress (base58 encoded)')
        .argument('--network')
        .argument('--pkey')
        .argument('--broadcast')
        .action(signTx);

    /**
     * Command  for all the wallet related operations
     * @param network | tesnet or mainnet
     */
    program
        .command('broadcast')
        .description('Sign and broadcast a transaction to the network')
        .argument('--network')
        .argument('--pkey')
        .action((network, pkey, broadcast) => {
            broadcastTxToNetwork()
        });


    /**
     * Command  for all the wallet related operations
     * @param network | tesnet or mainnet
     */
    program
        .command('wallet')
        .description('Generate a wallet- If no parameter is provided defaults will be used')
        .argument('--network')
        .argument('--seedphrase')
        .argument('--pkey')
        .action(walletCommand);

    async function walletCommand(network: string, seedphrase: string, pkey: string) {

        try {
            if (seedphrase) {
                const wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
                console.log(`Successfully generated wallet for ${network}: \n`);
                console.log('Wallet PrivateKey:', wallet.accountXPrivateKey);
                console.log('Wallet PrivateKey:', wallet.accountXPublicKey);
                console.log('Wallet seedphrase:', wallet.mnemonic);
                utils.exportWalletToJsonFile('wallet', { wallet })
                return wallet
            } else if (pkey) {
                wallet = new globalThis.Wallet({ from: seedphrase, testnet: false, testnet: false })
                utils.exportWalletToJsonFile('wallet', { wallet })
                return wallet
            }
        } catch (error) {
            console.log('Failed to generate wallet:', error)
        }

    }

    async function signTx(network, pkey, broadcast, tx, wallet) {

    }
    async function broadcastTxToNetwork(network, pkey, tx, wallet) {

    }
    program.parse();
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
