// SPDX-License-Identifier: MIT

import "./Token.sol";
pragma solidity 0.8.10;

contract TokenCreator is Ownable {
  event TokenCreated(bool enabled);
  uint256 public creationTokenPrice = 300000000000000000;

  function createNewToken(
    address tokenOwner,
    address payable _feeWallet,
    string memory tokenName,
    string memory tokenSymbol,
    uint256 amountOfTokenWei,
    uint8 decimal,
    uint8[] memory fees
  ) public payable {

    uint256 requiredValue = msg.sender == owner() ? 0 : creationTokenPrice;

    require(msg.value >= requiredValue, "createNewToken: sended value is lower than create token price");

    Token newToken = new Token(tokenOwner, tokenName, tokenSymbol, decimal, amountOfTokenWei, fees[5], fees[6], _feeWallet);
    newToken.setAllFeePercent(fees[0],fees[1],fees[2],fees[3],fees[4]);

    if (msg.sender != owner()) {
      payable(owner()).transfer(msg.value);
    }

    emit TokenCreated(true);
  }

  function updateCreatePrice(uint256 amount) public onlyOwner {
    creationTokenPrice = amount;
  }

  fallback() external payable {}

  receive() external payable {}
}
