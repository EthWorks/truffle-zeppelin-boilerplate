import {createWeb3, deployContract, expectThrow} from 'ethworks-solidity';
import whitelistJson from '../../build/contracts/Whitelist.json';
import Web3 from 'web3';
import chai from 'chai';
const {expect} = chai;

describe('Whitelist', async () => {
  const web3 = createWeb3(Web3);
  let accounts;
  let whitelistContract;
  let whitelistOwner;

  before(async () => {
    accounts = await web3.eth.getAccounts();
    [whitelistOwner] = accounts;
  });

  beforeEach(async () => {
    whitelistContract = await deployContract(web3, whitelistJson, whitelistOwner);
  });

  it('should be deployed successfully', async () => {
    const {address} = whitelistContract.options;
    expect(address).to.not.be.null;
  });
});
