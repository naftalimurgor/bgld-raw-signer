# bgld-signer
<p align="center">
<img src="doc/img/Bitgesell.png" style="height: 60px;"/>
<p align="center">Sign Bitgesell Transactions offline</p>
</p>

A CLI tool for interacting with the Bitgesell blockchain network for:
- Signing Bitgesell transactions offline
- Broadcasting a signed transaction to the Bitgesell Network

## Installation

```sh
npm i -g bgl-signer # yarn add --global bgl-signer
```

> `bgld-signer` is still in beta.
## Usage

Basic help and `bgld-signer` version can be checked by simply typing the following on a terminal.

```sh
blg-signer [options] command
```

> Note: Always keep your keys safe. Anyone with access to private keys can drain your Wallet.

## Signing a transaction

Currently supports signing transactions for the mainnet. Tesnet will be added in future releases.

To sign a transaction:

```sh
bgl-signer [options] command
bgl-signer encode --privkey [privkey] [amount] [recipient-address]

```

## Contributing

All contributions are highly welcome.

## License

`MIT`
