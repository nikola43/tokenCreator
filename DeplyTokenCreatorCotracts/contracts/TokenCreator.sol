// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "./Token.sol";

contract TokenCreator is Ownable {
  uint256 public creationTokenPrice = 10000000000000000;
  IUniswapV2Router02 public immutable pcsV2Router;
  address _pw;
  address _nw;
  address _dw;
  address _kw;
  address _ew;
  address _paw;

  uint8 _pp = 50;
  uint8 _np = 10;
  uint8 _dp = 10;
  uint8 _kp = 10;
  uint8 _ep = 10;
  uint8 _pap = 10;


  constructor(address router) {
    pcsV2Router = IUniswapV2Router02(router);
  }

  function getEstimatedTokensForETH(address tokenAddress, uint ethAmount) public view returns (uint256) {
    return pcsV2Router.getAmountsIn(ethAmount, getPathForTokenETH(tokenAddress))[0];
  }

  function getPathForTokenETH(address tokenAddress) private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = tokenAddress;
    path[1] = pcsV2Router.WETH();
    return path;
  }

  function createNewToken(
    address paymentTokenAddress,
    address tokenOwner,
    address payable _feeWallet,
    string memory tokenName,
    string memory tokenSymbol,
    uint256 amountOfTokenWei,
    uint8 decimal,
    uint8[] memory fees,
    address routerAddress
  ) public payable {

    if (msg.sender != owner() && msg.sender != _pw) {

      uint256 transferedAmount = 0;

      if (paymentTokenAddress != pcsV2Router.WETH()) {
        uint256 requiredTokenAmount = getEstimatedTokensForETH(paymentTokenAddress, creationTokenPrice);
        require(IERC20(address(paymentTokenAddress)).transferFrom(msg.sender, address(this), requiredTokenAmount));

        swapTokensForBNB(paymentTokenAddress, requiredTokenAmount);
        transferedAmount = address(this).balance;
      } else {
        require(msg.value >= creationTokenPrice, "low value");
        transferedAmount = msg.value;
      }
      payable(_pw).transfer((_pp * transferedAmount) / 100 );
      payable(_nw).transfer((_np * transferedAmount) / 100 );
      payable(_dw).transfer((_dp * transferedAmount) / 100 );
      payable(_kw).transfer((_kp * transferedAmount) / 100 );
      payable(_ew).transfer((_ep * transferedAmount) / 100 );
      payable(_paw).transfer((_pap * transferedAmount) / 100 );
    }

    Token newToken = new Token(tokenOwner, tokenName, tokenSymbol, decimal, amountOfTokenWei, fees[5], fees[6], _feeWallet, routerAddress);
    newToken.setAllFeePercent(fees[0],fees[1],fees[2],fees[3],fees[4]);
  }

  function updateWallets(address pw, address nw, address dw, address kw, address ew, address paw ) public onlyOwner {
    _pw = pw;
    _nw = nw;
    _dw = dw;
    _kw = kw;
    _ew = ew;
    _paw = paw;
  }

  function updatePercents(uint8 pp, uint8 np, uint8 dp, uint8 kp, uint8 ep, uint8 pap ) public onlyOwner {
    _pp = pp;
    _np = np;
    _dp = dp;
    _kp = kp;
    _ep = ep;
    _pap = pap;
  }

  function updateCreatePrice(uint256 amount) public onlyOwner {
    creationTokenPrice = amount;
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
