import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenGeneratorAbi, TokenGeneratorAddress} from './TokenGeneratorAbi.js';
import {TokenSourceCode} from './TokenSourceCode.js';
import {TokenAbi} from './TokenAbi.js';
import {MinTokenAbi} from './MinTokenAbi.js';
import {PancakeRouterAbi, PancakeRouterAddress} from './PancakeRouterAbi.js';
import {LockLiquidityContractAbi, LockLiquidityContractAddress} from './LockTokenAbi.js';
import {PancakeFactoryAbi, PancakeFactoryAddress} from './PancakeFactoryAbi.js';
import {BnbTokenAbi, BnbTokenAddress} from './BnbTokenAbi.js';
import {LPTokenAbi} from './LPTokenAbi.js';
import {BehaviorSubject, Observable} from 'rxjs';
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
  private currentAccountSubject: BehaviorSubject<string>;
  public currentAccount: Observable<string>;
  pancakeRouter: any;
  wethAddress: any;

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
      this.pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
      //this.pancakeRouter.methods.WETH().call().then((x) => this.wethAddress = x);
      this.wethAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
      console.log(this.wethAddress);
    }
  }

  getRouterAddress() {
    return PancakeRouterAddress;
  }

  // tslint:disable-next-line:typedef
  async getEstimatedTokensForBNB(tokenAddress) {
    const pair = await this.getPair(this.wethAddress, tokenAddress);
    const lpTokenContract = new window.web3.eth.Contract(LPTokenAbi, pair);

    return await lpTokenContract.methods.getReserves().call();
  }

  public async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    return await new Promise((resolve, reject) => {
      console.log('transfer.service :: getAccount :: eth');
      console.log(window.web3.eth);
      window.web3.eth.getAccounts((err, retAccount) => {
        console.log('transfer.service :: getAccount: retAccount');
        console.log(retAccount);
        if (retAccount.length > 0) {
          console.log(retAccount);
          this.currentAccountSubject = new BehaviorSubject<string>(retAccount[0]);
          this.currentAccount = this.currentAccountSubject.asObservable();
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
    const sendedValue = this.currentAccountSubject.value === ownerAddress ? 0 : createPrice;
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
        this.currentAccountSubject.value,
        FeeReceiverWallet,
        tokenName,
        tokenSymbol,
        tokenSupply,
        tokenDecimals,
        fees
      ).send({from: this.currentAccountSubject.value, value: sendedValue.toString()});

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
    return window.web3.eth.getBalance(this.currentAccountSubject.value);
  }

// tslint:disable-next-line:typedef
  verifyContract(constructorArguments: any, contractAddress): Observable<any> {
    const encodedConstructorArguments = this.encodeTokenConstructor({
      account: this.currentAccountSubject.value,
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
    const burnResult = await token.methods.burn(Web3.utils.toWei(amount.toString(), 'ether')).send({from: this.currentAccountSubject.value});

    console.log(token);
    console.log(burnResult);
    return burnResult;
  }

  // tslint:disable-next-line:typedef
  percentage(percent, total) {
    return (percent / 100) * total;
  }

  // tslint:disable-next-line:typedef
  async removeLPTokens(tokenAddress: string, pairAddress: string, amount) {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    const LpTokenContract = new window.web3.eth.Contract(LPTokenAbi, pairAddress);

    const nonce = await LpTokenContract.methods.nonces(this.currentAccountSubject.value).call();

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];
    const domain = {
      name: 'Pancake LPs',
      version: '1',
      chainId: '0x61',
      verifyingContract: pairAddress,
    };
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ];
    const message = {
      owner: this.currentAccountSubject.value,
      spender: PancakeRouterAddress,
      value: Web3.utils.toWei(amount.toString(), 'ether'),
      nonce: nonce.toString(16),
      deadline: deadline.toString(),
    };
    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    });

    let r =  '';
    let s =  '';
    let v =  0;

    await window.web3.currentProvider.sendAsync(
      {
        jsonrpc: '2.0',
        method: 'eth_signTypedData_v4',
        id: 999999999999,
        params: [this.currentAccountSubject.value, dataToSign],
        from: this.currentAccountSubject.value,
      },
      async (err, result) => {
        if (err) {
          return console.error(err);
        }
        const signature = result.result.substring(2);
        r = '0x' + signature.substring(0, 64);
        s = '0x' + signature.substring(64, 128);
        v = parseInt(signature.substring(128, 130), 16);

        const totalSupply = await LpTokenContract.methods.totalSupply().call();
        const totalReserves = await LpTokenContract.methods.getReserves().call();

        const Aout = (totalReserves[0] * amount) / totalSupply;
        const Bout = (totalReserves[1] * amount) / totalSupply;

        const minA = Aout - this.percentage(1, Aout);
        const minB = Bout - this.percentage(1, Bout);

        const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);

        const trans = await pancakeRouter.methods.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(tokenAddress, Web3.utils.toWei(amount.toString(), 'ether'), Web3.utils.toWei(minB.toString(), 'ether'), Web3.utils.toWei(minA.toString(), 'ether'),  this.currentAccountSubject.value, deadline, false, v, r, s).send({from: this.currentAccountSubject.value, value: '0'});
        return trans;
      }
    );

  }

  // tslint:disable-next-line:typedef
  async addLiquidity(tokenAddress: string, bnbAmount, tokenAmount, minBnbAmount, minTokenAmount: number) {

    const pair = await this.getPair(this.wethAddress, tokenAddress);

    bnbAmount = Number(bnbAmount);
    tokenAmount = Number(tokenAmount);
    minBnbAmount = Number(minBnbAmount);
    minTokenAmount = Number(minTokenAmount);


    const tokenA = this.wethAddress;
    const tokenB = tokenAddress;
    const amountADesired = bnbAmount;
    const amountAMin = minBnbAmount;
    const amountBDesired = tokenAmount;
    const amountBMin = minTokenAmount;
    const to = this.currentAccountSubject.value;
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

    const addLiquidityResult = await this.pancakeRouter.methods.addLiquidityETH(
      tokenB,
      Web3.utils.toWei(amountBDesired.toString(), 'ether'),      // desiredB
      Web3.utils.toWei(amountBMin.toString(), 'ether'),     // minA
      Web3.utils.toWei(amountAMin.toString(), 'ether'),     // minA
      to,
      deadline
    ).send({from: this.currentAccountSubject.value, value: Web3.utils.toWei(bnbAmount.toString(), 'ether')});

    console.log(addLiquidityResult);


    return addLiquidityResult;
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time: number, tokenAmount: number) {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    const a = await lockLiquidityContract.methods.lockTokens(await this.getPair(this.wethAddress, tokenAddress), this.currentAccountSubject.value, Web3.utils.toWei(tokenAmount.toString(), 'ether'), time).send({from: this.currentAccountSubject.value, value: '80000000000000000'});
    console.log(a);
    return a;
  }

  // tslint:disable-next-line:typedef
  async withdrawLockedTokens(lockId) {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    return await lockLiquidityContract.methods.withdrawTokens(lockId).send({from: this.currentAccountSubject.value});
  }

  // tslint:disable-next-line:typedef
  async getLocks() {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    const locksList = await lockLiquidityContract.methods.getDepositsByWithdrawalAddress(this.currentAccountSubject.value).call();
    const locksDetails = [];

    for (let i = 0; i < locksList.length; i++) {
      const lockDetails = await lockLiquidityContract.methods.getDepositDetails(locksList[i]).call();
      lockDetails['id'] = locksList[i];
      locksDetails.push(lockDetails);
    }
    return locksDetails;
  }

  // tslint:disable-next-line:typedef
  async getEstimatedTokensForETH(tokenAddress: string, tokenAmount: number) {
    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
    const path = await this.getPathForTokenETH(tokenAddress);
    const estimatedTokens = await pancakeRouter.methods.getAmountsIn(Web3.utils.toWei(tokenAmount.toString(), 'ether'), path).call();
    return estimatedTokens[0];
  }

  // tslint:disable-next-line:typedef
  async getEstimatedETHForTokens(tokenAddress: string, tokenAmount: number) {
    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, PancakeRouterAddress);
    const path = await this.getPathETHForToken(tokenAddress);
    const estimatedTokens = await pancakeRouter.methods.getAmountsIn(Web3.utils.toWei(tokenAmount.toString(), 'ether'), path).call();
    return estimatedTokens[0];
  }

  // tslint:disable-next-line:typedef
  async getPathForTokenETH(tokenAddress: string) {
    return [tokenAddress, this.wethAddress];
  }

  // tslint:disable-next-line:typedef
  async getPathETHForToken(tokenAddress: string) {
    return [this.wethAddress, tokenAddress];
  }

  // tslint:disable-next-line:typedef
  async getLPTokensBalance(tokenAddress: string) {
    const pairAddress = await this.getPair(this.wethAddress, tokenAddress);
    const token = new window.web3.eth.Contract(LPTokenAbi, pairAddress);
    return await token.methods.balanceOf(this.currentAccountSubject.value).call();
  }

  // tslint:disable-next-line:typedef
  async getTokensBalance(tokenAddress: string) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    return await token.methods.balanceOf(this.currentAccountSubject.value).call();
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
  async isAllowed(address, spender) {
    const pairAddress = await this.getPair(this.wethAddress, address);
    const LPTokenBalance = await this.getLPTokensBalance(pairAddress);
    const isAddresAllowed = window.web3.utils.toWei(await this.getAddressAllowance(address,spender), 'ether') < window.web3.utils.toWei(LPTokenBalance, 'ether');
    return isAddresAllowed;
  }

  // tslint:disable-next-line:typedef
  async getAddressAllowance(address, spender) {
    const contract = new window.web3.eth.Contract(MinTokenAbi, address);
    const contractAllowance = await contract.methods.allowance(this.currentAccountSubject.value, spender).call(); // 29803630997051883414242659
    return contractAllowance;
  }

  // tslint:disable-next-line:typedef
  async approveToken(address, spender, amount) {
    const token = new window.web3.eth.Contract(MinTokenAbi, address);
    const approveResult = await token.methods.approve(spender, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from: this.currentAccountSubject.value});
    return approveResult;
  }

  // tslint:disable-next-line:typedef
  encodeTokenConstructor(data: any) {
    console.log(data);
    /*
          account: this.currentAccountSubject.value,
      tokenName: constructorArguments.tokenName,
      tokenSymbol: constructorArguments.tokenSymbol,
      decimal: constructorArguments.tokenDecimals,
      amountOfTokenWei: constructorArguments.tokenSupply,
      MaxTxPercent: constructorArguments.MaxTxPercent,
      MaxWalletPercent: constructorArguments.MaxWalletPercent,
      feeWallet: constructorArguments.FeeReceiverWallet,
     */

    const x = abi.simpleEncode('constructor(address,string,string,uint8,uint256,uint8,uint8,address)',
      this.currentAccountSubject.value,
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

