App = {
  contracts: {},

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3('http://127.0.0.1:8545');
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Escrow.json', function (data) {
      // Get the necessary contract artifact file.
      var contract = new web3.eth.Contract(data.abi);
      // Set the provider for our contract.
      contract.setProvider(web3.currentProvider);
      // Save for later use
      App.contracts.Escrow = contract;
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $('#contractAddressInput').on('input', App.handleContractAddressInput);
    $('#ConfirmPurchaseButton').on('click', App.handleConfirmPurchase);
    $('#ReadDataButton').on('click', App.handleReadData);
  },

  handleContractAddressInput: function (event) {
    event.preventDefault();
    const addr = $('#contractAddressInput').val();
    App.contracts.Escrow.options.address = addr;
    console.log(addr);
  },

  handleReadData: function (event) {
    event.preventDefault();

    // Read the contract ethereum balance
    web3.eth.getBalance(App.contracts.Escrow.options.address)
      .then(function (result) {
        $('#EscrowBalance').text(result);
      })
      .catch(function (err) {
        console.log(err.message);
      });

    // Read the value of the price variable in the contract
    App.contracts.Escrow.methods.price()
      .call()
      .then(function (result) {
        $('#Price').text(result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
