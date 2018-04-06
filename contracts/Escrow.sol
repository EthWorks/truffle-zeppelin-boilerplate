pragma solidity ^0.4.19;
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Escrow {
    uint256 public price;

    function Escrow() public payable {
        // the seller creates Smart Contract
    }

    function cancel() public {
        // the seller cancels created Smart Contract
    }

    function confirmPurchase() payable public {
        // the buyer confirms the purchase
    }

    function confirmReceived() public {
        // the buyer confirms goods received
    }
}