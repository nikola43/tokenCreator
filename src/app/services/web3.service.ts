import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenGeneratorAbi, TokenGeneratorAddress} from './TokenGeneratorAbi.js';
import {TokenSourceCode} from './TokenSourceCode.js';
import {TokenAbi} from './TokenAbi.js';
import {PancakeRouterAbi, PancakeRouterAddress} from './PancakeRouterAbi.js';
import {LockLiquidityContractAbi, LockLiquidityContractAddress} from './LockTokenAbi.js';
import {PancakeFactoryAbi, PancakeFactoryAddress} from './PancakeFactoryAbi.js';
import {BnbTokenAbi, BnbTokenAddress} from './BnbTokenAbi.js';
import {LPTokenAbi} from './LPTokenAbi.js';
import {Observable} from 'rxjs';
import BigNumber from 'bignumber.js';

declare let require: any;
declare let window: any;

const abi = require('ethereumjs-abi');

const Web3 = require('web3');


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: any;
  account: any;
  enable: any;

  constructor(private http: HttpClient) {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      }
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }
  }

  // tslint:disable-next-line:typedef
  async getEstimatedTokensForBNB(tokenAddress) {

    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
    const wethAddress = await pancakeRouter.methods.WETH().call();

    console.log(wethAddress);

    const pair = await this.getPair(wethAddress, tokenAddress);
    const lpTokenContract = new window.web3.eth.Contract(LPTokenAbi, pair);

    return await lpTokenContract.methods.getReserves().call();
  }

  public async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            console.log(retAccount);
            resolve(retAccount[0]);
          } else {
            // alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            // alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
      this.enable = enable;
    });
    return Promise.resolve(enable);
  }

  // tslint:disable-next-line:typedef
  async createToken(
    tokenName,
    tokenSymbol,
    tokenSupply,
    tokenDecimals,
    TxFeePercentToHolders,
    TxFeePercentToLP,
    TxFeePercentToBurned,
    TxFeePercentToWallet,
    TxFeePercentToBuybackTokens,
    MaxWalletPercent,
    MaxTxPercent,
    FeeReceiverWallet,
  ) {

    console.log({
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenSupply,
      TxFeePercentToHolders,
      TxFeePercentToLP,
      TxFeePercentToBurned,
      TxFeePercentToWallet,
      TxFeePercentToBuybackTokens,
      MaxWalletPercent,
      MaxTxPercent,
      FeeReceiverWallet,
    });

    const createdToken = new window.web3.eth.Contract(TokenGeneratorAbi, TokenGeneratorAddress);


    tokenSupply = Web3.utils.toWei(tokenSupply.toString(), 'ether');


    const createPrice = await createdToken.methods.creationTokenPrice().call();
    console.log({createPrice});

    const ownerAddress = await createdToken.methods.owner().call();
    console.log({ownerAddress});
    const sendedValue = this.account === ownerAddress ? 0 : createPrice;
    console.log({sendedValue});

    const fees = [
      TxFeePercentToHolders,
      TxFeePercentToLP,
      TxFeePercentToBurned,
      TxFeePercentToWallet,
      TxFeePercentToBuybackTokens,
      MaxWalletPercent,
      MaxTxPercent];

    const create = await createdToken
      .methods.createNewToken(
        this.account,
        FeeReceiverWallet,
        tokenName,
        tokenSymbol,
        tokenSupply,
        tokenDecimals,
        fees
      ).send({from: this.account, value: sendedValue.toString()});

    console.log(create);

    await this.sleep(5000);

    const a = await window.web3.eth.getTransaction(create.transactionHash);
    console.log({a});


    const b = await window.web3.eth.getTransactionReceipt(create.transactionHash);
    console.log({b});

    const contractAddress = b.logs[0].address;
    console.log({contractAddress});
    create.contractAddress = contractAddress;

    this.verifyContract({
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenSupply,
      MaxTxPercent,
      MaxWalletPercent,
      FeeReceiverWallet
    }, contractAddress).subscribe((r) => {
      console.log(r);

      create.guid = r.result;

      return create;


    }, error => {
      console.log(error);
    });


    return create;
  }

  // tslint:disable-next-line:typedef
  validateAddress(address) {
    return Web3.utils.isAddress(address);
  }

  // tslint:disable-next-line:typedef
  getBalance() {
    return window.web3.eth.getBalance(this.account);
  }

// tslint:disable-next-line:typedef
  verifyContract(constructorArguments: any, contractAddress): Observable<any> {
    const encodedConstructorArguments = this.encodeTokenConstructor({
      account: this.account,
      tokenName: constructorArguments.tokenName,
      tokenSymbol: constructorArguments.tokenSymbol,
      decimal: constructorArguments.tokenDecimals,
      amountOfTokenWei: constructorArguments.tokenSupply,
      MaxTxPercent: constructorArguments.MaxTxPercent,
      MaxWalletPercent: constructorArguments.MaxWalletPercent,
      feeWallet: constructorArguments.FeeReceiverWallet,
    });


    const data = {
      apikey: 'V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY',                     // A valid API-Key is required
      module: 'contract',                             // Do not change
      action: 'verifysourcecode',                     // Do not change
      contractaddress: contractAddress,   // Contract Address starts with 0x...
      sourceCode: TokenSourceCode,             // Contract Source Code (Flattened if necessary)
      codeformat: 'solidity-single-file',             // solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
      contractname: 'Token',         // ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
      compilerversion: 'v0.8.10+commit.fc410830',   // see https://BscScan.com/solcversions for list of support versions
      optimizationUsed: 1, // 0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
      runs: 200,                                      // set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)
      constructorArguements: encodedConstructorArguments,   // if applicable
      evmversion: '',             // leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
      licenseType: '3',           // Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://BscScan.com/contract-license-types
    };


    const formData: any = new FormData();
    formData.append('apikey', data.apikey);
    formData.append('module', data.module);
    formData.append('action', data.action);
    formData.append('contractaddress', data.contractaddress);
    formData.append('sourceCode', data.sourceCode);
    formData.append('codeformat', data.codeformat);
    formData.append('contractname', data.contractname);
    formData.append('compilerversion', data.compilerversion);
    formData.append('optimizationUsed', data.optimizationUsed);
    formData.append('runs', data.runs);
    formData.append('constructorArguements', data.constructorArguements);
    formData.append('evmversion', data.evmversion);
    formData.append('licenseType', data.licenseType);


    return this.http.post('https://api-testnet.bscscan.com/api', formData);
  }


  // tslint:disable-next-line:typedef
  async getPair(tokenAddressA, tokenAddressB) {
    const pancakeFactory = new window.web3.eth.Contract(PancakeFactoryAbi, PancakeFactoryAddress);
    const getPairResult = await pancakeFactory.methods.getPair(
      tokenAddressA,
      tokenAddressB,
    ).call();

    console.log({getPairResult});
    return getPairResult;
  }

  // tslint:disable-next-line:typedef
  async burnTokens(tokenAddress: string, amount) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    const burnResult = await token.methods.burn(Web3.utils.toWei(amount.toString(), 'ether')).send({from: this.account});

    console.log(token);
    console.log(burnResult);
    return burnResult;
  }

  // tslint:disable-next-line:typedef
  async removeLPTokens(tokenAddress: string, pairAddress: string, amount) {
    const LpTokenContract = new window.web3.eth.Contract(LPTokenAbi, pairAddress)
    const totalSupply = await LpTokenContract.methods.totalSupply().call();
    const totalReserves = await LpTokenContract.methods.getReserves().call();
    const tokenReserve = new BigNumber(totalReserves[0]).times(totalReserves[1]).sqrt()
    console.log('token address',tokenAddress);
    console.log("token amount",this.getEstimatedTokensForETH(tokenAddress, Web3.utils.toWei("1", 'ether')));
    return totalReserves;
    // const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    // const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
    // console.log(pancakeRouter.methods);
    // bnbAmount = Number(bnbAmount);
    // tokenAmount = Number(tokenAmount);
    // minBnbAmount = Number(minBnbAmount);
    // minTokenAmount = Number(minTokenAmount);


    // const tokenA = wethAddress;
    // const tokenB = tokenAddress;
    // const amountADesired = bnbAmount;
    // const amountAMin = minBnbAmount;
    // const amountBDesired = tokenAmount;
    // const amountBMin = minTokenAmount;
    // const to = this.account;
    // const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    // console.log({
    //   tokenA,
    //   tokenB,
    //   amountADesired,
    //   amountBDesired,
    //   amountAMin,
    //   amountBMin,
    //   to,
    //   deadline,
    //   amountBDesiredWei: Web3.utils.toWei(amountBDesired.toString(), 'ether'),
    //   amountBMinWei: Web3.utils.toWei(amountBMin.toString(), 'ether'),
    //   amountAMinWei: Web3.utils.toWei(amountAMin.toString(), 'ether'),
    // });

    // const addLiquidityResult = await pancakeRouter.methods.addLiquidityETH(
    //   tokenB,
    //   Web3.utils.toWei(amountBDesired.toString(), 'ether'),      // desiredB
    //   Web3.utils.toWei(amountBMin.toString(), 'ether'),     // minA
    //   Web3.utils.toWei(amountAMin.toString(), 'ether'),     // minA
    //   to,
    //   deadline
    // ).send({from: this.account, value: Web3.utils.toWei(bnbAmount.toString(), 'ether')});
    // return amount;
  }

  // tslint:disable-next-line:typedef
  async addLiquidity(tokenAddress: string, bnbAmount, tokenAmount, minBnbAmount, minTokenAmount: number) {
    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
    const wethAddress = await pancakeRouter.methods.WETH().call();

    const pair = await this.getPair(wethAddress, tokenAddress);

    bnbAmount = Number(bnbAmount);
    tokenAmount = Number(tokenAmount);
    minBnbAmount = Number(minBnbAmount);
    minTokenAmount = Number(minTokenAmount);


    const tokenA = wethAddress;
    const tokenB = tokenAddress;
    const amountADesired = bnbAmount;
    const amountAMin = minBnbAmount;
    const amountBDesired = tokenAmount;
    const amountBMin = minTokenAmount;
    const to = this.account;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    console.log({
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline,
      amountBDesiredWei: Web3.utils.toWei(amountBDesired.toString(), 'ether'),
      amountBMinWei: Web3.utils.toWei(amountBMin.toString(), 'ether'),
      amountAMinWei: Web3.utils.toWei(amountAMin.toString(), 'ether'),
    });

    const addLiquidityResult = await pancakeRouter.methods.addLiquidityETH(
      tokenB,
      Web3.utils.toWei(amountBDesired.toString(), 'ether'),      // desiredB
      Web3.utils.toWei(amountBMin.toString(), 'ether'),     // minA
      Web3.utils.toWei(amountAMin.toString(), 'ether'),     // minA
      to,
      deadline
    ).send({from: this.account, value: Web3.utils.toWei(bnbAmount.toString(), 'ether')});

    console.log(addLiquidityResult);


    return addLiquidityResult;
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time: number, tokenAmount: number) {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    const a = await lockLiquidityContract.methods.lockTokens(tokenAddress, this.account, Web3.utils.toWei(tokenAmount.toString(), 'ether'), time).send({from: this.account});
    console.log(a);
    return a;
  }

  // tslint:disable-next-line:typedef
  async withdrawLockedTokens(lockId) {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    return await lockLiquidityContract.methods.withdrawTokens(lockId).send({from: this.account});
  }

  // tslint:disable-next-line:typedef
  async getLocks() {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    const locksList = await lockLiquidityContract.methods.getDepositsByWithdrawalAddress(this.account).call();
    const locksDetails = [];

    for (let i = 0; i < locksList.length; i++) {
      const lockDetails = await lockLiquidityContract.methods.getDepositDetails(locksList[i]).call();
      locksDetails.push(lockDetails);
    }
    return locksDetails;
  }
    // tslint:disable-next-line:typedef
    async getEstimatedTokensForETH(tokenAddress: string, ethAmount: number) {
      const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
      console.log(this.getPathForTokenETH(tokenAddress));
      return await pancakeRouter.methods.getAmountsIn(ethAmount, this.getPathForTokenETH(tokenAddress)).call();
    }
    // tslint:disable-next-line:typedef
    async getEstimatedETHForTokens(tokenAddress: string, tokenAmount: number) {
      const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
      return await pancakeRouter.methods.getAmountsIn(tokenAmount, this.getPathETHForToken(tokenAddress)).call();
    }
    // tslint:disable-next-line:typedef
    async getPathForTokenETH(tokenAddress: string) {
      const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
      return [tokenAddress, await pancakeRouter.methods.WETH().call()];
    }

        // tslint:disable-next-line:typedef
        async getPathETHForToken(tokenAddress: string) {
          const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
          return [await pancakeRouter.methods.WETH().call(), tokenAddress];
        }

  // tslint:disable-next-line:typedef
  async getLPTokensBalance(tokenAddress: string) {
    const token = new window.web3.eth.Contract(LPTokenAbi, tokenAddress);
    return await token.methods.balanceOf(this.account).call();
  }

  // tslint:disable-next-line:typedef
  async getTokensBalance(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.balanceOf(this.account).call();
  }

  // tslint:disable-next-line:typedef
  async getTokensName(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.name().call();
  }

  // tslint:disable-next-line:typedef
  async getTokenWhitelist(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.getWhitelist().call();
  }

  // tslint:disable-next-line:typedef
  async getTokenBlacklist(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.getBlacklist().call();
  }
  
  // tslint:disable-next-line:typedef
  async addAddressWhitelist(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.addAddressWhitelist(tokenAddress).call();
  }

  // tslint:disable-next-line:typedef
  async addAddressBlacklist(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.addAddressWhitelist(tokenAddress).call();
  }

  // tslint:disable-next-line:typedef
  async approveBnbToken(amount: string) {
    const routerAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
    const token = new window.web3.eth.Contract(BnbTokenAbi, BnbTokenAddress);
    const approveResult = await token.methods.approve(routerAddress, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from: this.account});
    console.log(approveResult);
    return approveResult;
  }  // tslint:disable-next-line:typedef
  // tslint:disable-next-line:typedef
  async approveToken(address: string, amount: string) {
    const routerAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
    const token = new window.web3.eth.Contract(TokenAbi, address);
    const approveResult = await token.methods.approve(routerAddress, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from: this.account});
    console.log(approveResult);
    return approveResult;
  }

  // tslint:disable-next-line:typedef
  encodeTokenConstructor(data: any) {
    console.log(data);
    /*
          account: this.account,
      tokenName: constructorArguments.tokenName,
      tokenSymbol: constructorArguments.tokenSymbol,
      decimal: constructorArguments.tokenDecimals,
      amountOfTokenWei: constructorArguments.tokenSupply,
      MaxTxPercent: constructorArguments.MaxTxPercent,
      MaxWalletPercent: constructorArguments.MaxWalletPercent,
      feeWallet: constructorArguments.FeeReceiverWallet,
     */

    const x = abi.simpleEncode('constructor(address,string,string,uint8,uint256,uint8,uint8,address)',
      this.account,
      data.tokenName,
      data.tokenSymbol,
      data.decimal,
      data.amountOfTokenWei,
      data.MaxWalletPercent,
      data.MaxTxPercent,
      data.feeWallet,
    );

    const r = x.toString('hex').substring(8);
    console.log(r);
    return r;
  }

  sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
}

