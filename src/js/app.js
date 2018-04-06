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
    $.getJSON('Escrow.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var EscrowArtifact = data;
      App.contracts.Escrow = TruffleContract(EscrowArtifact);

      // Set the provider for our contract.
      App.contracts.Escrow.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {    
    $('#ConfirmPurchaseButton').on('click', App.handleConfirmPurchase);
    $('#ReadDataButton').on('click', App.handleReadData);
  },

  handleReadData: function(event) {
    event.preventDefault();
    const addr = $('#contractAddressInput').val();
    web3.eth.getBalance(addr, function (err, result) {
      $('#EscrowBalance').text(result);
    });
    App.contracts.Escrow.at(addr).then(function(instance) {
      instance.price().then(function (result) {$('#Price').text(result);});
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
