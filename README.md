# Truffle Zeppelin Boilerplate

Minimalistic base configuration for using Truffle with Open Zeppelin.

Note: babel-register is used to enable modern JavaScript syntax inside of truffle tests. This enables the use of Open Zeppelin test helpers. 

## Prerequisites

You will need the following to be installed on your system:

- Node.js (8.2+)
- Yarn (1.3.2+)

_Note: we recommend to always stick with the newest stable version of node and yarn_ 

## Install

1. Checkout the repository into a directory

```
git clone git@github.com:EthWorks/truffle-zeppelin-boilerplate.git .
```

2. Install all packages with yarn

```
yarn
```

_Note: All packages will be installed locally. Use `yarn truffle` to get access to the truffle command directly._ 

## Running tests

1. [Optional] Start the Ganache CLI mock ethereum client if you don't have a client configured for testing.

_Note: please run this in a separate console_

```
yarn run dev:ganache
```

2. Run tests

```
yarn run dev:test
```

---

Made with ❤️ to Ethereum by ETHWORKS 