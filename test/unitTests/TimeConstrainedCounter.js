import {createWeb3, deployContract, expectThrow, increaseTimeTo, durationInit, latestTime} from 'ethworks-solidity';
import timeContrainedCounterJson from '../../build/contracts/TimeConstrainedCounter.json';
import Web3 from 'web3';
import chai from 'chai';
import bnChai from 'bn-chai';

const {expect} = chai;
const web3 = createWeb3(Web3);
chai.use(bnChai(web3.utils.BN));

xdescribe('TimeConstrainedCounter', async() => {
  let contract;
  let beginTime;
  let endTime;
  let accounts;
  let owner;

  before(async () => {
    accounts = await web3.eth.getAccounts();
    [, owner] = accounts;
  });

  beforeEach(async() => {
    beginTime = await latestTime(web3) + 2;
    endTime = beginTime + 10;
    const args = [
      beginTime,
      endTime
    ];
    contract = await deployContract(web3, timeContrainedCounterJson, owner, args)
  });

  it("should have a value of 0 after the construction", async function () {
    expect(await contract.methods.value().call()).to.eq.BN(0);
  });

  it("incrementing should not be possible before startime", async function () {
    await expectThrow(contract.methods.increment().send({from: owner}));
  });

  it("incrementing should be possible after startime before endTime", async function () {    
    await increaseTimeTo(web3, beginTime + 1);  
    await contract.methods.increment().send({from: owner});
    expect(await contract.methods.value().call()).to.eq.BN(1);
  });

  it("incrementing should not be possible after endTime", async function () {
    await increaseTimeTo(web3, endTime + 1);
    await expectThrow(contract.methods.increment().send({from: owner}));
  });
});
