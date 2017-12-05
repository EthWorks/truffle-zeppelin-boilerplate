App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('TimeConstrainedCounter.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TimeConstrainedCounterArtifact = data;
      App.contracts.TimeConstrainedCounter = TruffleContract(TimeConstrainedCounterArtifact);

      // Set the provider for our contract.
      App.contracts.TimeConstrainedCounter.setProvider(App.web3Provider);
      // Use our contract to retieve and mark the adopted pets.
      return App.getValue();
    });

    return App.bindEvents();
  },

  bindEvents: function() {    
    $('#IncreaseButton').on('click', App.handleIncrement);
  },

  handleIncrement: function(event) {
    event.preventDefault();
    var timeConstrainedCounterInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      } 

      var account = accounts[0];

      App.contracts.TimeConstrainedCounter.deployed().then(function(instance) {
        timeConstrainedCounterInstance = instance;
        return timeConstrainedCounterInstance.increment({from: account});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getValue();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getValue: function(adopters, account) {
    console.log('Getting value...');
    var timeConstrainedCounterInstance;

    App.contracts.TimeConstrainedCounter.deployed().then(function(instance) {
      timeConstrainedCounterInstance = instance;

      return timeConstrainedCounterInstance.value();
    }).then(function(result) {      
      balance = result.c[0];

      $('#CounterBalance').text(balance);
    }).catch(function(err) {
      console.log(err.message);
    });

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
