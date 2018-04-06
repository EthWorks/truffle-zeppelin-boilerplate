import {createWeb3, deployContract, expectThrow} from 'ethworks-solidity';
import escrowJson from '../../build/contracts/Escrow.json';
import chai from 'chai';
import bnChai from 'bn-chai';
import Web3 from 'web3';

const {expect} = chai;
const web3 = createWeb3(Web3);
chai.use(bnChai(web3.utils.BN));

describe('Escrow', () => {
  const {BN} = web3.utils;
  let seller;
  let buyer
  let contract;
  let accounts;
  const args = [];
  const price = new BN('10');
  const doublePrice = price.mul(new BN('2'));

  before(async () => {
    accounts = await web3.eth.getAccounts();
    [seller, buyer] = accounts;
  });

  beforeEach(async () => {
    contract = await deployContract(web3, escrowJson, seller, args, doublePrice);
  });

  it('should be deployed successfully', async () => {
    const {address} = contract.options;
    expect(address).to.not.be.null;
  });

  xdescribe('Escrow', async() => {
    it('should be properly created', async () => {
      const actualPrice = await contract.methods.price().call();
      expect(actualPrice).to.eq.BN(price);
    });
  
    it('Should not allow to create with an odd amount', async() => {
      await expectThrow(deployContract(web3, escrowJson, seller, args, new BN('11')));
    });
  
    it('Should not allow to confirm purchase without sending ether', async() => {
      await expectThrow(contract.methods.confirmPurchase().send({from: seller, value: 0}));
    });
  });

  
});
