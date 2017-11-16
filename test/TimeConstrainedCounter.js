var TimeConstrainedCounter = artifacts.require("./TimeConstrainedCounter.sol");

import exceptThrow from 'zeppelin-solidity/test/helpers/expectThrow';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';
import {increaseTimeTo} from 'zeppelin-solidity/test/helpers/increaseTime';

contract('TimeConstrainedCounter', function (accounts) {
  let contract;
  let beginTime;
  let endTime;

  async function redeploy() {
    // the contract validity time will be 2 second from now, and end 10 seconds after its start
    beginTime = latestTime() + 2;
    endTime = beginTime + 10;
    contract = await TimeConstrainedCounter.new(beginTime, endTime, { from: accounts[0]});
  }

  beforeEach(redeploy);

  it("should have a value of 0 after the construction", async function () {
    let value = await contract.value.call();
    assert.equal(value.valueOf(), 0);
  });

  it("incrementing should not be possible before startime", async function () {    
    await exceptThrow(contract.increment({ from: accounts[0]}));
  });

  it("incrementing should be possible after startime before endTime", async function () {    
    await increaseTimeTo(beginTime + 1);  
    await contract.increment({ from: accounts[0]})
    let value = await contract.value.call();
    assert.equal(value.valueOf(), 1);
  });

  it("incrementing should not be possible after endTime", async function () {
    await increaseTimeTo(endTime + 1);
    await exceptThrow(contract.increment({ from: accounts[0]}));
  });
});
