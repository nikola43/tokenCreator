import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenGeneratorAbi} from './TokenGeneratorAbi.js';
import {TokenSourceCode} from './TokenSourceCode.js';
import {TokenAbi} from './TokenAbi.js';
import {MinTokenAbi} from './MinTokenAbi.js';
import {PancakeRouterAbi} from './PancakeRouterAbi.js';
import {LockLiquidityContractAbi, LockLiquidityContractAddress} from './LockTokenAbi.js';
import {PancakeFactoryAbi, PancakeFactoryAddress} from './PancakeFactoryAbi.js';
import {LPTokenAbi} from './LPTokenAbi.js';
import {BehaviorSubject, Observable} from 'rxjs';
import {INetwork} from '../../../models/network.interface';
import {ProdNetworks} from "./Networks";


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

  private currentNetworkIdSubject: BehaviorSubject<number>;
  public currentNetworkId: Observable<number>;
  pancakeRouter: any;
  wethAddress: string;
  networks: any = ProdNetworks;

  constructor(private http: HttpClient) {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();
      this.pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, this.networks[0].routerAddress);
      //this.wethAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
      this.wethAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';

      /*
      this.pancakeRouter.methods.WETH().call().then((x) => {
        this.wethAddress = x;
        console.log({x});
      });
      */
      this.currentNetworkIdSubject = new BehaviorSubject<number>(0);
      this.currentNetworkId = this.currentNetworkIdSubject.asObservable();
    }
  }

  setNetworkId(id: number): void {
    this.currentNetworkIdSubject = new BehaviorSubject<number>(id);
    this.currentNetworkId = this.currentNetworkIdSubject.asObservable();
  }

  getNetworkId(): INetwork {
    let networdID = 0;
    this.currentNetworkId.subscribe((x: number) => {
      networdID = x;
    });
    return {id: networdID};
  }

  getWethAddress(): string {
    return this.wethAddress;
  }

  getRouterAddress(): string {
    return this.networks[this.currentNetworkIdSubject.value].routerAddress;
  }

  getTokenCreatorAddress(): void {
    return this.networks[this.currentNetworkIdSubject.value].tokenCreatorContractAddress;
  }

  // tslint:disable-next-line:typedef
  async getEstimatedTokensForBNB(tokenAddress) {
    const pair = await this.getPair(this.wethAddress, tokenAddress);
    const lpTokenContract = new window.web3.eth.Contract(LPTokenAbi, pair);

    return await lpTokenContract.methods.getReserves().call();
  }

  public async getAccount(): Promise<any> {
    return await new Promise((resolve, reject) => {
      window.web3.eth.getAccounts((err, retAccount) => {
        if (retAccount.length > 0) {
          this.currentAccountSubject = new BehaviorSubject<string>(retAccount[0]);
          this.currentAccount = this.currentAccountSubject.asObservable();

          this.currentNetworkIdSubject = new BehaviorSubject<number>(0);
          this.currentNetworkId = this.currentNetworkIdSubject.asObservable();
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
    paymentToken,
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
    networkId
  ) {

    console.log({
      paymentToken,
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
      networkId
    });

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");

    console.log({
      nets: this.networks[networkId].tokenCreatorContractAddress
    })

    const createdToken = new window.web3.eth.Contract(TokenGeneratorAbi, this.networks[networkId].tokenCreatorContractAddress);



    tokenSupply = Web3.utils.toWei(tokenSupply.toString(), 'ether');
    const createPrice = await createdToken.methods.creationTokenPrice().call();
    const ownerAddress = await createdToken.methods.owner().call();
    const sendedValue = this.currentAccountSubject.value === ownerAddress ? 0 : (paymentToken !== this.wethAddress ? 0 : createPrice);
    console.log({

    });


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
        paymentToken,
        this.currentAccountSubject.value,
        FeeReceiverWallet,
        tokenName,
        tokenSymbol,
        tokenSupply,
        tokenDecimals,
        fees,
        this.networks[networkId].routerAddress,
      ).send({from: this.currentAccountSubject.value, value: sendedValue.toString()});


    await this.sleep(5000);

    const a = await window.web3.eth.getTransaction(create.transactionHash);
    const b = await window.web3.eth.getTransactionReceipt(create.transactionHash);

    const contractAddress = b.logs[0].address;
    create.contractAddress = contractAddress;

    console.log({
      a: this.networks[networkId].routerAddress
    });

    this.verifyContract({
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenSupply,
      MaxTxPercent,
      MaxWalletPercent,
      FeeReceiverWallet,
      routerAddress: this.networks[networkId].routerAddress,
    }, contractAddress, networkId).subscribe((r) => {

      create.guid = r.result;

      return create;


    }, error => {
      console.log(error);
    });
    return create;
    // return {events: [], guid: "sd"}
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
  verifyContract(constructorArguments: any, contractAddress, networkId): Observable<any> {
    /*
          tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenSupply,
      MaxTxPercent,
      MaxWalletPercent,
      FeeReceiverWallet,
     */


    console.log({
      account: this.currentAccountSubject.value,
      tokenName: constructorArguments.tokenName,
      tokenSymbol: constructorArguments.tokenSymbol,
      decimal: constructorArguments.tokenDecimals,
      amountOfTokenWei: constructorArguments.tokenSupply,
      MaxTxPercent: constructorArguments.MaxTxPercent,
      MaxWalletPercent: constructorArguments.MaxWalletPercent,
      feeWallet: constructorArguments.FeeReceiverWallet,
      routerAddress: constructorArguments.routerAddress,
    });

    const encodedConstructorArguments = this.encodeTokenConstructor({
      account: this.currentAccountSubject.value,
      tokenName: constructorArguments.tokenName,
      tokenSymbol: constructorArguments.tokenSymbol,
      decimal: constructorArguments.tokenDecimals,
      amountOfTokenWei: constructorArguments.tokenSupply,
      MaxTxPercent: constructorArguments.MaxTxPercent,
      MaxWalletPercent: constructorArguments.MaxWalletPercent,
      feeWallet: constructorArguments.FeeReceiverWallet,
      routerAddress: constructorArguments.routerAddress,
    });


    const apiKey = this.networks[networkId].explorerApiKey;
    console.log({
      explorerApiKey: apiKey
    });

    const data = {
      apikey: apiKey,                     // A valid API-Key is required
      module: 'contract',                             // Do not change
      action: 'verifysourcecode',                     // Do not change
      contractaddress: contractAddress,   // Contract Address starts with 0x...
      sourceCode: TokenSourceCode,             // Contract Source Code (Flattened if necessary)
      // tslint:disable-next-line:max-line-length
      codeformat: 'solidity-single-file',             // solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
      // tslint:disable-next-line:max-line-length
      contractname: 'Token',         // ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
      compilerversion: 'v0.8.10+commit.fc410830',   // see https://BscScan.com/solcversions for list of support versions
      optimizationUsed: 1, // 0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
      // tslint:disable-next-line:max-line-length
      runs: 200,                                      // set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)
      // tslint:disable-next-line:max-line-length
      constructorArguements: encodedConstructorArguments,   // if applicable
      // tslint:disable-next-line:max-line-length
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

    return getPairResult;
  }

  // tslint:disable-next-line:typedef
  async burnTokens(tokenAddress: string, amount) {
    const token = new window.web3.eth.Contract(TokenAbi, tokenAddress);
    const burnResult = await token.methods.burn(Web3.utils.toWei(amount.toString(), 'ether')).send({from: this.currentAccountSubject.value});

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
      {name: 'name', type: 'string'},
      {name: 'version', type: 'string'},
      {name: 'chainId', type: 'uint256'},
      {name: 'verifyingContract', type: 'address'},
    ];
    const domain = {
      name: 'Pancake LPs',
      version: '1',
      chainId: '0x61',
      verifyingContract: pairAddress,
    };
    const Permit = [
      {name: 'owner', type: 'address'},
      {name: 'spender', type: 'address'},
      {name: 'value', type: 'uint256'},
      {name: 'nonce', type: 'uint256'},
      {name: 'deadline', type: 'uint256'},
    ];
    const message = {
      owner: this.currentAccountSubject.value,
      spender: this.networks[this.currentNetworkIdSubject.value].routerAddress,
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

    let r = '';
    let s = '';
    let v = 0;

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

        const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, this.networks[this.currentNetworkIdSubject.value].routerAddress);

        const trans = await pancakeRouter.methods.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(tokenAddress,
          Web3.utils.toWei(amount.toString(),
            'ether'), Web3.utils.toWei(minB.toString(), 'ether'), Web3.utils.toWei(minA.toString(), 'ether'),
          this.currentAccountSubject.value, deadline, false, v, r, s).send({
          from: this.currentAccountSubject.value,
          value: '0'
        });
        return trans;
      }
    );

  }

  // tslint:disable-next-line:typedef
  async addLiquidity(tokenAddress: string, bnbAmount, tokenAmount, minBnbAmount, minTokenAmount: number) {

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

    const addLiquidityResult = await this.pancakeRouter.methods.addLiquidityETH(
      tokenB,
      Web3.utils.toWei(amountBDesired.toString(), 'ether'),      // desiredB
      Web3.utils.toWei(amountBMin.toString(), 'ether'),     // minA
      Web3.utils.toWei(amountAMin.toString(), 'ether'),     // minA
      to,
      deadline
    ).send({from: this.currentAccountSubject.value, value: Web3.utils.toWei(bnbAmount.toString(), 'ether')});


    return addLiquidityResult;
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time: number, tokenAmount: number) {
    const lockLiquidityContract = new window.web3.eth.Contract(LockLiquidityContractAbi, LockLiquidityContractAddress);
    const a = await lockLiquidityContract.methods.lockTokens(await this.getPair(this.wethAddress, tokenAddress),
      this.currentAccountSubject.value, Web3.utils.toWei(tokenAmount.toString(), 'ether'), time).send({
      from: this.currentAccountSubject.value,
      value: '80000000000000000'
    });
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

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < locksList.length; i++) {
      const lockDetails = await lockLiquidityContract.methods.getDepositDetails(locksList[i]).call();
      lockDetails.id = locksList[i];
      locksDetails.push(lockDetails);
    }
    return locksDetails;
  }

  // tslint:disable-next-line:typedef
  async getEstimatedTokensForETH(tokenAddress: string, tokenAmount: number) {
    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, this.networks[this.currentNetworkIdSubject.value].routerAddress);
    const path = await this.getPathForTokenETH(tokenAddress);
    const estimatedTokens = await pancakeRouter.methods.getAmountsIn(Web3.utils.toWei(tokenAmount.toString(), 'ether'), path).call();
    return estimatedTokens[0];
  }

  // tslint:disable-next-line:typedef
  async getEstimatedETHForTokens(tokenAddress: string, tokenAmount: number) {
    const pancakeRouter = new window.web3.eth.Contract(PancakeRouterAbi, this.networks[this.currentNetworkIdSubject.value].routerAddress);
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
    const LPTokenBalance = await this.getLPTokensBalance(address);
    const isAddresAllowed = window.web3.utils.toWei(
      await this.getAddressAllowance(address, spender), 'ether') < window.web3.utils.toWei(LPTokenBalance, 'ether');
    return isAddresAllowed;
  }

  // tslint:disable-next-line:typedef
  async getAddressAllowance(address, spender) {
    const contract = new window.web3.eth.Contract(MinTokenAbi, address);
    const contractAllowance = await contract.methods.allowance(this.currentAccountSubject.value, spender)
      .call(); // 29803630997051883414242659
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
    console.log({data});
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

    const x = abi.simpleEncode('constructor(address,string,string,uint8,uint256,uint8,uint8,address,address)',
      this.currentAccountSubject.value,
      data.tokenName,
      data.tokenSymbol,
      data.decimal,
      data.amountOfTokenWei,
      data.MaxWalletPercent,
      data.MaxTxPercent,
      data.feeWallet,
      data.routerAddress
    );

    const r = x.toString('hex').substring(8);
    console.log(r);
    return r;
  }

  sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
}

