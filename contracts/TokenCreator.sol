// SPDX-License-Identifier: MIT

import "./Token.sol";
pragma solidity 0.7.6;


contract TokenCreator is Ownable {
  event TokenCreated(bool enabled);
  uint256 creationTokenPrice = 0;

  function createNewToken(address tokenOwner,
    string memory tokenName,
    string memory tokenSymbol,
    uint8 decimal,
    uint256 amountOfTokenWei,
    uint8 TxFeePercentToHolders,
    uint8 TxFeePercentToLP,
    uint8 TxFeePercentToBurned,
    uint8 TxFeePercentToWallet,
    uint8 TxFeePercentToBuybackTokens,
    uint8 MaxWalletPercent,
    uint8 MaxTxPercent,
    address payable _feeWallet) public payable {

    require(msg.sender == owner() ? msg.value == 0 : creationTokenPrice, "createNewToken: value is lower than minting price");

    Token newToken = new Token(tokenOwner, tokenName, tokenSymbol, decimal, amountOfTokenWei, MaxTxPercent, MaxWalletPercent, _feeWallet);
    newToken.setAllFeePercent(TxFeePercentToHolders,TxFeePercentToLP,TxFeePercentToBurned,TxFeePercentToWallet,TxFeePercentToBuybackTokens);

    emit TokenCreated(true);
  }

  function withdraw(uint256 amount) public onlyOwner {
    payable(owner()).transfer(amount);
  }

  function withdrawAll() public onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  fallback() external payable {
    // custom function code
  }

  receive() external payable {
    // custom function code
  }
}
