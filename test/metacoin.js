var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function (accounts) {
  let meta;

  async function redeploy() {
    meta = await MetaCoin.deployed();
  }

  beforeEach(redeploy);

  it("should put 10000 MetaCoin in the first account", async function () {
    let balance = await meta.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it("should call a function that depends on a linked library", async function () {
    let coinBalance = (await meta.getBalance.call(accounts[0])).toNumber();
    let coinEthBalance = (await meta.getBalanceInEth.call(accounts[0])).toNumber();
    assert.equal(coinEthBalance, 2 * coinBalance, "Library function returned unexpected function, linkage may be broken");
  });

  it("should send coin correctly", async function () {
    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    account_one_starting_balance = (await meta.getBalance.call(account_one)).toNumber();
    account_two_starting_balance = (await meta.getBalance.call(account_two)).toNumber();
    await meta.sendCoin(account_two, amount, { from: account_one });
    account_one_ending_balance = (await meta.getBalance.call(account_one)).toNumber();
    account_two_ending_balance = (await meta.getBalance.call(account_two)).toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
