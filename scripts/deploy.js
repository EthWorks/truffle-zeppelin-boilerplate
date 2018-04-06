import {deployContract, latestTime} from 'ethworks-solidity';
const Web3 = require('Web3');
const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:7545`));
const contractJson = require('../build/contracts/TimeConstrainedCounter.json');

describe('TimeConstrainedCounter', async() => {
  let owner;
  let beginTime;
  let endTime;
  

  before(async () => {
    [owner] = await web3.eth.getAccounts();
    beginTime = await latestTime(web3) + 2;
    endTime = beginTime + 10;

  });

  it('Deploying TimeConstrainedCounter', async() => {
    const args = [
      beginTime,
      endTime
    ];
    const contract = await deployContract(web3, contractJson, owner, args);
    console.log(`Deployed at: ${contract.options.address}`);
  });
});
