//const TIME = artifacts.require("TIME.sol");
//const Token = artifacts.require("Token.sol");
const TokenCreator = artifacts.require("TokenCreator.sol");
const Web3 = require('web3');
//const RickToken = artifacts.require("RickToken.sol");
//const IterableMapping = artifacts.require("IterableMapping.sol");

// you need deploy iterable Mapping first then link with your token
module.exports = async (deployer) => {
  const routerAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  const tokenInstance = await deployer.deploy(TokenCreator, routerAddress).then((r) => {
    console.log(r)
  }).catch(function (e) {
    console.log(e); // "oh, no!"
  })
  console.log(tokenInstance);

  /*
  let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    const devWallet = web3.eth.accounts.create();
    const marketingWallet = web3.eth.accounts.create();
    const rewardsWallet = web3.eth.accounts.create();
    const charityWallet = web3.eth.accounts.create();
    console.log({ devWallet, marketingWallet, rewardsWallet, charityWallet });
    const tokenInstance = await deployer.deploy(Token, "0x0aEa3638B16633e970c7311f22635e6064559a70", "Porritos", "HASH", 18, "1000000000000000000000000000", 100, 100, devWallet.address, marketingWallet.address, charityWallet.address, rewardsWallet.address);
    console.log({tokenInstance});
    const r1 = await tokenInstance.methods.setDevFeePercent(1);
    const r2 = await tokenInstance.methods.setRewardFeePercent(1);
    const r3 = await tokenInstance.methods.setMarketingFeePercent(1);
    const r4 = await tokenInstance.methods.setCharityFeePercent(2);
    console.log({r1,r2,r3,r4});
    */
  // let data = tokenInstance.methods.transfer("0x1010fb622aD9D19F3B62cC82fEfC5cb95a71aA34", "10000000000000000000").encodeABI();
  // let rawTx = {
  //     "nonce": web3.utils.toHex(nonce),
  //     "gasPrice": "0x3b9aca00",
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x00",
  //     "data": data,
  // }
  /*
  deployer.deploy(DaddyLocks,
      '0xB06a4327FF7dB3D82b51bbD692063E9a180b79D9',
      'DaddyLocks',
      'Daddy',
      1000000000000000000000000000,
      100,
      100,
      '0xB06a4327FF7dB3D82b51bbD692063E9a180b79D9').then((r) => {
          console.log(r)
  })
  */

  /*
  deployer.deploy(DaddyLocks,
      '0xB06a4327FF7dB3D82b51bbD692063E9a180b79D9',
      'DaddyLocks',
      'Daddy',
      1000000000000000000000000000,
      100,
      100,
      '0xB06a4327FF7dB3D82b51bbD692063E9a180b79D9'
  ).then(() => {

  });
  */

  /*
    constructor (address tokenOwner,string memory tokenName,
      string memory tokenSymbol, uint8 decimal, uint256 amountOfTokenWei,
      uint8 setMxTxPer, uint8 setMxWalletPer,
      address payable _feeWallet
   */

  /*
  deployer.deploy(IterableMapping).then(() => {
      deployer.link(IterableMapping, PUDGY);
      return deployer.deploy(PUDGY);
  });
  */

  /*
  deployer.deploy(IterableMapping).then(() => {
      deployer.link(IterableMapping, PUDGY);
      return deployer.deploy(PUDGY);
  });

  */
}
