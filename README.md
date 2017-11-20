# Truffle Zeppelin Boilerplate

Minimalistic base configuration for using Truffle with Open Zeppelin.

Note: babel-register is used to enable modern JavaScript syntax inside of truffle tests. This enables the use of Open Zeppelin test helpers. 

## Install

_Note: You should have node and yarn installed on you machine_

1. Checkout the repository into a directory

```
git clone git@github.com:EthWorks/truffle-zeppelin-boilerplate.git .
```

2. Install all packages with yarn

```
yarn
```

## Running tests

1. [Optional] Start the TestRPC mock ethereum client if you don't have a client configured for testing.

_Note: please run this in a separate console_

```
yarn truffle:testrpc
```

2. Start the TestRPC mock ethereum client if you don't have a client configured for testing

```
yarn truffle:test
```

---

Made with ❤️ to Ethereum by ETHWORKS 