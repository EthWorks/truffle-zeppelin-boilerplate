var TimeConstrainedCounter = artifacts.require("./TimeConstrainedCounter.sol");

module.exports = function(deployer) {
  deployer.deploy(TimeConstrainedCounter, 0, 32503676400);
};
