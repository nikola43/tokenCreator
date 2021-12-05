// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "./Token.sol";

contract TokenCreator is Ownable {
  uint256 public servicePrice = 10000000000000000;
  IUniswapV2Router02 public immutable pcsV2Router;
  address punk = 0x5A9A3cB7FBB13f1C5282057719e599C57e79d6E3;
  address nkt = 0xaa0a8F8b43124131099528c4a663AfB5789FEC66;
  address _platformToken = 0xaa0a8F8b43124131099528c4a663AfB5789FEC66;
  uint8 _disPercent = 20;

  constructor(address router) {
    pcsV2Router = IUniswapV2Router02(router);
  }

  function getEstimatedTokensForETH(address tokenAddress, uint ethAmount) public view returns (uint256) {
    address[] memory path = new address[](2);
    path[0] = tokenAddress;
    path[1] = pcsV2Router.WETH();
    return pcsV2Router.getAmountsIn(ethAmount, path)[0];
  }

  function createNewToken(
    address paymentToken,
    address tOwner,
    address payable _feeWallet,
    string memory name,
    string memory symbol,
    uint256 supply,
    uint8 decimal,
    uint8[] memory fees,
    address router
  ) public payable {

    if (msg.sender != owner()) {

      uint256 transferedAmount = 0;

      if (paymentToken != pcsV2Router.WETH()) {
        uint256 requiredTokenAmount = 0;

        requiredTokenAmount = paymentToken == _platformToken ? getEstimatedTokensForETH(paymentToken, servicePrice - (_disPercent * servicePrice) / 100) : getEstimatedTokensForETH(paymentToken, servicePrice);

        require(IERC20(address(paymentToken)).transferFrom(msg.sender, address(this), requiredTokenAmount));
        swapTokensForBNB(paymentToken, requiredTokenAmount);
        transferedAmount = address(this).balance;
      } else {
        require(msg.value >= servicePrice, "low value");
        transferedAmount = msg.value;
      }
      payable(punk).transfer((50 * transferedAmount) / 100 );
      payable(nkt).transfer((50 * transferedAmount) / 100 );
    }

    Token newToken = new Token(tOwner, name, symbol, decimal, supply, fees[5], fees[6], _feeWallet, router);
    newToken.setAllFeePercent(fees[0],fees[1],fees[2],fees[3],fees[4]);
  }

  function configurePlatform(uint8 percent, uint256 price, address platformToken) public onlyOwner {
    _disPercent = percent;
    servicePrice = price;
    _platformToken = platformToken;
  }

  function swapTokensForBNB(address tokenAddress, uint256 tokenAmount) private {
    address[] memory path = new address[](2);

    path[0] = tokenAddress;
    path[1] = pcsV2Router.WETH();

    IERC20(tokenAddress).approve(address(pcsV2Router), tokenAmount);

    pcsV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
      tokenAmount,
      0, // accept any amount of ETH
      path,
      address(this),
      block.timestamp
    );
  }
  fallback() external payable {}
  receive() external payable {}
}
