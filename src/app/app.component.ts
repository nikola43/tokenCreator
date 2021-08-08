import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from './services/web3.service';
import {HttpClient} from '@angular/common/http';
import {faCheck, faCheckDouble, faExclamationTriangle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {BnbTokenAddress} from './services/BnbTokenAbi.js';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import Web3 from 'web3';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TokenGeneratorAbi} from './services/TokenGeneratorAbi';
import {MatSliderChange} from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('slider') slider;
  @ViewChild('addLiquidityBnbSlider') addLiquidityBnbSlider;

  constructor(public web3Service: Web3Service, private formBuilder: FormBuilder, private http: HttpClient) {
    this.createForm();
    this.createAddLiquidityForm();
    this.createBurnFormGroup();
    this.connectWeb3().then((r) => {
      console.log(r);
    });

    /*
    this.web3Service.provider.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }
    });

    this.web3Service.provider.on('networkChanged', (accounts: string[]) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }

    });
    */
    if (this.web3Service.enable) {
      this.web3Service.getAccount().then(async (r) => {
        console.log(r);
        this.account = r;
        this.buttonLabel = r;
        this.BnbBalance = Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether');

        console.log('--------------');
        this.formGroup.controls.tokenSupply.setValue('1000000000');
        this.formGroup.controls.tokenDecimals.setValue('18');
        this.formGroup.controls.TxFeePercentToHolders.setValue('0');
        this.formGroup.controls.TxFeePercentToLP.setValue('0');
        this.formGroup.controls.TxFeePercentToBurned.setValue('0');
        this.formGroup.controls.TxFeePercentToWallet.setValue('0');
        this.formGroup.controls.TxFeePercentToBuybackTokens.setValue('0');
        this.formGroup.controls.MaxWalletPercent.setValue('100');
        this.formGroup.controls.MaxTxPercent.setValue('100');
        this.formGroup.controls.FeeReceiverWallet.setValue(this.account);
      });
    }


    this.web3Service.web3.on('accountsChanged', (accounts) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }
    });

    this.web3Service.web3.on('networkChanged', (networkId) => {
      /*
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }
      */
    });


  }

  createButtonLabel = 'Create Token';

  lastCurrentNetwork = 0;
  currentNetwork = 0;
  tokenBalance: any;
  lpTokenBalance: any;
  BnbBalance: any;

  creationForm = {
    tokenName: null,
    tokenSymbol: null,
    tokenSupply: null,
    tokenDecimals: null,
    TxFeePercentToHolders: null,
    TxFeePercentToLP: null,
    TxFeePercentToBurned: null,
    TxFeePercentToWallet: null,
    TxFeePercentToBuybackTokens: null,
    MaxWalletPercent: null,
    MaxTxPercent: null,
    FeeReceiverWallet: null
  };

  addLiquidityForm = {
    bnbAmount: 0,
    tokenAmount: 0,
  };


  lockLiquidityForm = {
    lpAmount: 0,
    locktime: 0,
  };


  @ViewChild('matRef') matRef: MatSelect;
  addBnbLiquidityQuantityPercent = 0;
  addTokenLiquidityQuantityPercent = 0;
  lockTokenLiquidityPercent = 0;

  title = 'TokenGenerator';
  buttonLabel = 'Connect';
  account: any = undefined;
  formGroup: FormGroup;
  isLoading = false;
  createdTokenAddress = '';
  tokenVerified = false;
  panelOpenState = false;
  tokenApproved = false;
  isApproving = false;
  approveButtonLabel = 'Approve Token';
  addLiquidityFormGroup: FormGroup;
  burnFormGroup: FormGroup;
  approveButtonIcon: IconDefinition = faCheck;


  // tslint:disable-next-line:typedef
  networksDev = [
    {
      index: 0,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      name: 'Binance Smart Chain Testnet',
      params: {
        chainId: 97,
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
          name: 'Binance Coin',
          symbol: 'tBNB',
          decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com']
      }
    },
    {
      index: 1,
      name: 'Ethereum',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      params: {
        chainId: '0x1',
        chainName: 'Ethereum',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
        blockExplorerUrls: ['https://etherscan.io']
      }
    },
    {
      index: 2,
      name: 'Polygon (MATIC)',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
      params: {
        chainId: '0x89',
        chainName: 'Polygon (MATIC)',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
        blockExplorerUrls: ['https://explorer.matic.network/']
      }
    },
  ];

  // tslint:disable-next-line:typedef
  networksProd = [
    {
      index: 0,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      name: 'Binance Smart Chain',
      params: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }
    },
    {
      index: 1,
      name: 'Ethereum',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      params: {
        chainId: '0x1',
        chainName: 'Ethereum',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
        blockExplorerUrls: ['https://etherscan.io']
      }
    },
    {
      index: 2,
      name: 'Polygon (MATIC)',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
      params: {
        chainId: '0x89',
        chainName: 'Polygon (MATIC)',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
        blockExplorerUrls: ['https://explorer.matic.network/']
      }
    },
  ];

  networks = this.networksDev;

  // tslint:disable-next-line:typedef
  showAdvancedSettings = false;


  // tslint:disable-next-line:typedef
  createBurnFormGroup() {
    this.burnFormGroup = this.formBuilder.group({
      tokenAddress: [null, [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]],
      percentage: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    });
  }

  // tslint:disable-next-line:typedef
  onSlideLockLP(event: MatSliderChange) {
    console.log(event.value);
    this.lockTokenLiquidityPercent = Number(event.value);
    const value = this.mapValue(Number(event.value), 0, 100, 0, this.lpTokenBalance);
    console.log(this.lockTokenLiquidityPercent);
    console.log(value);
    this.lockLiquidityForm.lpAmount = value;
  }

  // tslint:disable-next-line:typedef
  onSlideToken(event: MatSliderChange) {
    console.log(event.value);
    this.addTokenLiquidityQuantityPercent = Number(event.value);
    const value = this.mapValue(Number(event.value), 0, 100, 0, this.tokenBalance);
    console.log(this.addTokenLiquidityQuantityPercent);
    console.log(value);
    this.addLiquidityForm.tokenAmount = value;
  }

  // tslint:disable-next-line:typedef
  onSlide(event: MatSliderChange) {
    console.log(event.value);
    this.addBnbLiquidityQuantityPercent = Number(event.value);
    const value = this.mapValue(Number(event.value), 0, 100, 0, this.BnbBalance);
    console.log(this.addBnbLiquidityQuantityPercent);
    console.log(value);
    this.addLiquidityForm.bnbAmount = value;
  }

  // tslint:disable-next-line:typedef
  createAddLiquidityForm() {

    // const numRegex = /^-?\d*[.,]?\d{0,2}$/;
    const numRegex = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/
    ;

    this.addLiquidityFormGroup = this.formBuilder.group({
      tokenAddress: [null, [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]],
      bnbAmount: [null, [Validators.required, Validators.pattern(numRegex)]],
      tokenAmount: [null, [Validators.required, Validators.pattern(numRegex)]],
    });
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time) {
    const r = await this.web3Service.lockLiquidity(tokenAddress, time);
    console.log({
      r
    });
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


  // tslint:disable-next-line:typedef
  createForm() {
    this.formGroup = this.formBuilder.group({
      tokenName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      tokenSymbol: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      tokenSupply: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      tokenDecimals: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      TxFeePercentToHolders: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      TxFeePercentToLP: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      TxFeePercentToBurned: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      TxFeePercentToWallet: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      TxFeePercentToBuybackTokens: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      MaxWalletPercent: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      MaxTxPercent: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      FeeReceiverWallet: [null, [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]],
      validate: ''
    });
  }

  // tslint:disable-next-line:typedef
  public encode() {

    const v = this.web3Service.encodeTokenConstructor({});
    console.log({v});
  }


  // tslint:disable-next-line:typedef
  public async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (r) => {
      console.log(r);
      if (this.web3Service.account?.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = r;
        this.buttonLabel = r;

        this.BnbBalance = Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether');


        /*
        // this.BnbBalance = this.web3Service.web3.eth.getBalance(this.account);

        */


        console.log('--------------');
        this.formGroup.controls.tokenSupply.setValue('1000000000');
        this.formGroup.controls.tokenDecimals.setValue('18');
        this.formGroup.controls.TxFeePercentToHolders.setValue('0');
        this.formGroup.controls.TxFeePercentToLP.setValue('0');
        this.formGroup.controls.TxFeePercentToBurned.setValue('0');
        this.formGroup.controls.TxFeePercentToWallet.setValue('0');
        this.formGroup.controls.TxFeePercentToBuybackTokens.setValue('0');
        this.formGroup.controls.MaxWalletPercent.setValue('100');
        this.formGroup.controls.MaxTxPercent.setValue('100');
        this.formGroup.controls.FeeReceiverWallet.setValue(this.account);
      }
    });


    /*
    this.web3Service.enableMetaMaskAccount().then((t) => {
      console.log("--------------");
      console.log(t);
      this.formGroup.controls.tokenSupply.setValue('1000000000');
      this.formGroup.controls.tokenDecimals.setValue('18');
      this.formGroup.controls.TxFeePercentToHolders.setValue('5');
      this.formGroup.controls.TxFeePercentToLP.setValue('5');
      this.formGroup.controls.TxFeePercentToBurned.setValue('0');
      this.formGroup.controls.TxFeePercentToWallet.setValue('0');
      this.formGroup.controls.TxFeePercentToBuybackTokens.setValue('0');
      this.formGroup.controls.MaxWalletPercent.setValue('10');
      this.formGroup.controls.MaxTxPercent.setValue('10');
      this.formGroup.controls.FeeReceiverWallet.setValue(this.account);
    });
*/

  }

  // tslint:disable-next-line:typedef
  onSubmit(value: any) {
    this.isLoading = true;
    this.createButtonLabel = 'Deploying token';
    this.web3Service.createToken(
      this.formGroup.get('tokenName').value,
      this.formGroup.get('tokenSymbol').value,
      Number(this.formGroup.get('tokenSupply').value),
      Number(this.formGroup.get('tokenDecimals').value),
      Number(this.formGroup.get('TxFeePercentToHolders').value),
      Number(this.formGroup.get('TxFeePercentToLP').value),
      Number(this.formGroup.get('TxFeePercentToBurned').value),
      Number(this.formGroup.get('TxFeePercentToWallet').value),
      Number(this.formGroup.get('TxFeePercentToBuybackTokens').value),
      Number(this.formGroup.get('MaxWalletPercent').value),
      Number(this.formGroup.get('MaxTxPercent').value),
      this.formGroup.get('FeeReceiverWallet').value,
    ).then(async (r) => {
      console.log(r);

      this.createButtonLabel = 'Verifying Token';
      await this.sleep(1000);

      if (r.events['1'].address.length > 0) {
        this.createdTokenAddress = r.events['1'].address;
        this.addLiquidityFormGroup.controls.tokenAddress.setValue(this.createdTokenAddress);

        const interval = setInterval(() => {
          const formData: any = new FormData();

          formData.append('guid', r.guid);
          formData.append('module', 'contract');
          formData.append('action', 'checkverifystatus');
          formData.append('apikey', 'V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY');

          this.http.post('https://api-testnet.bscscan.com/api', formData).subscribe(
            async (response: any) => {
              console.log('response');
              console.log(response);

              if (response.status === '1') {
                clearInterval(interval); // time is up;
                this.tokenVerified = true;
                this.createButtonLabel = 'Token Created';
                this.isLoading = false;

                this.tokenBalance = Web3.utils.fromWei(await this.getTokenBalance(this.createdTokenAddress), 'ether');
              }
            },
            (error) => {
              console.log('error');
              console.log(error);
            }
          );
        }, 5000);
      } else {
        alert('error creando token');
      }
    }).catch((e) => {
      console.log(e);
      this.isLoading = false;
    });
  }

  // tslint:disable-next-line:typedef
  bnbInputKeyUp() {
    console.log(this.addLiquidityForm.bnbAmount);
    const value = this.mapValue(Number(this.addLiquidityForm.bnbAmount), 0, this.BnbBalance, 0, 100);
    this.addLiquidityBnbSlider.value = value;
  }

  // tslint:disable-next-line:typedef
  tokenInputKeyUp() {
    console.log(this.addLiquidityForm.tokenAmount);
    const value = this.mapValue(Number(this.addLiquidityForm.tokenAmount), 0, this.tokenBalance, 0, 100);
    this.slider.value = value;
  }

  // tslint:disable-next-line:typedef
  async numberFieldKeydown(event) {
    console.log(event);
    console.log(this.addLiquidityForm.bnbAmount);

  }

  // tslint:disable-next-line:typedef
  txFieldKeydown(event) {
    console.log(event);
    if (event.code !== 'Backspace') {
      console.log(event.key);
      console.log(isNaN(Number(event.key)));

      if (isNaN(Number(event.key))) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }

      if ((Number(event.key) < 0 || Number(event.key) > 9)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    }
  }

  // tslint:disable-next-line:typedef
  async approveToken() {
    this.isApproving = true;
    this.approveButtonLabel = 'Approving';
    const tokenAddress = this.addLiquidityFormGroup.get('tokenAddress').value;
    const bnbAmount = this.addLiquidityFormGroup.get('bnbAmount').value;
    const tokenAmount = this.addLiquidityFormGroup.get('tokenAmount').value;
    console.log({tokenAddress});
    const approvalResult = await this.web3Service.approveToken(tokenAddress, tokenAmount).then((r) => {
      console.log(r);


      if (r) {
        this.tokenApproved = true;
        this.isApproving = false;
        this.approveButtonLabel = 'Approved';
        // this.approveButtonIcon = faCheckDouble;
      }

    }).catch((err) => {
      console.log(err);
      this.tokenApproved = false;
      this.isApproving = false;

      this.approveButtonLabel = 'Not Approved';
      this.approveButtonIcon = faExclamationTriangle;
    });

    console.log({approvalResult});

    /*
    const approvalBnbResult = await this.web3Service.approveBnbToken(bnbAmount).then((r) => {
      console.log(r);
      if (r) {
        this.tokenApproved = true;
        this.isApproving = false;
        this.approveButtonLabel = 'Approved';
        this.approveButtonIcon = faCheckDouble;
      }
    }).catch((err) => {
      console.log(err);
      this.tokenApproved = false;
      this.isApproving = false;
      this.approveButtonLabel = 'Not Approved';
      this.approveButtonIcon = faExclamationTriangle;
    });

    console.log({approvalBnbResult});

    */

  }

  // tslint:disable-next-line:typedef
  async burnTokens() {
    const tokenAddress = this.addLiquidityFormGroup.get('tokenAddress').value;
    const percentage = this.addLiquidityFormGroup.get('percentage').value;
    this.web3Service.burnTokens(tokenAddress, percentage).then((r2) => {
      console.log(r2);
    }).catch((err) => {
      console.log(err);
    });
  }

  // tslint:disable-next-line:typedef
  async addLiquidity() {
    const bnbAmount = this.addLiquidityForm.bnbAmount;
    const tokenAmount = this.addLiquidityForm.tokenAmount;
    const minTokenAmount = Number(Number(tokenAmount) - Number(this.percentage(Number(tokenAmount), 1)));
    const minBnbTokenAmount = Number(Number(bnbAmount) - Number(this.percentage(Number(bnbAmount), 1)));
    console.log(minTokenAmount);

    console.log({
      bnbAmount,
      tokenAmount,
      minTokenAmount,
      minBnbTokenAmount
    });


    this.web3Service.addLiquidity(this.createdTokenAddress, bnbAmount, tokenAmount, minBnbTokenAmount, minTokenAmount).then(async (r2) => {
      console.log(r2);


      this.tokenBalance = Web3.utils.fromWei(await this.getTokenBalance(this.createdTokenAddress), 'ether');
      this.BnbBalance = Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether');

      const pairAddress = await this.getPair(this.createdTokenAddress);
      this.lpTokenBalance = Web3.utils.fromWei(await this.getLPTokenBalance(pairAddress), 'ether');

      if (r2) {

      }

    }).catch((err) => {
      console.log(err);

    });
  }

  // tslint:disable-next-line:typedef
  async getLPTokenBalance(tokenAddress) {
    return await this.web3Service.getLPTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  percentage(percent, total) {
    return ((percent / 100) * total);
  }

  // tslint:disable-next-line:typedef
  async networkSelectChange(changeEvent: MatSelectChange) {
    console.log(changeEvent);


    try {
      await this.web3Service.web3.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: this.networks[changeEvent.value].params.chainId}],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await this.web3Service.web3.request({
            method: 'wallet_addEthereumChain',
            params: [this.networks[changeEvent.value].params]
          });
        } catch (addError) {
          // handle "add" error
          console.log(addError);
          this.currentNetwork = this.lastCurrentNetwork;
        }
      }
      // handle other "switch" errors
      console.log(switchError);

      // rejected
      if (switchError.code === 4001) {

      }
      this.currentNetwork = this.lastCurrentNetwork;
      // this.currentNetwork = changeEvent.value;
      return false;
    }

    // this.matRef.options.forEach((data: MatOption) => data.deselect());


    // this.selected = changeEvent.value;

    this.lastCurrentNetwork = this.currentNetwork;

  }

  /*
  // tslint:disable-next-line:typedef
  networkSelectChange(event) {
    console.log(event);

    this.web3Service.web3.request({
      method: 'wallet_addEthereumChain',
      params: [this.networks[event.value].params]
    })
      .catch((error) => {
        console.log(error);
      });
  }

  */

  // tslint:disable-next-line:typedef
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value + '%';
  }

  // tslint:disable-next-line:typedef
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log({
      type,
      event,
    });

    this.lockLiquidityForm.locktime = event.value.getTime();
    console.log(this.lockLiquidityForm.locktime);

    // const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  }

  // tslint:disable-next-line:typedef
  async matSliderLockOnChange(event) {


    this.lockTokenLiquidityPercent = Number(event.value);

    const value = this.mapValue(Number(event.value), 0, 100, 0, this.lpTokenBalance);

    console.log(this.lpTokenBalance);
    console.log(value);

    this.lockLiquidityForm.lpAmount = value;
  }

  // tslint:disable-next-line:typedef
  async getPair(address) {
    return await this.web3Service.getPair(BnbTokenAddress, address);
  }

  // tslint:disable-next-line:typedef
  async matSliderTokenOnChange(event) {
    this.tokenBalance = Web3.utils.fromWei(await this.getTokenBalance(this.createdTokenAddress), 'ether');

    this.addTokenLiquidityQuantityPercent = Number(event.value);


    const value = this.mapValue(Number(event.value), 0, 100, 0, this.tokenBalance);

    console.log(this.addTokenLiquidityQuantityPercent);
    console.log(value);

    this.addLiquidityForm.tokenAmount = value;
  }

  // tslint:disable-next-line:typedef
  mapValue(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  // tslint:disable-next-line:typedef
  async addLiquidityTokenAddressKeyDown() {
    const t = this.addLiquidityFormGroup.get('tokenAddress').value;
    console.log(t);

    this.tokenBalance = Web3.utils.fromWei(await this.getTokenBalance(t), 'ether');
    this.BnbBalance = Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether');
    /*
    console.log({
      b: this.BnbBalance
    });

    this.getTokenBalance(t).then((r) => {



      console.log({
        r
      });
      this.tokenBalance = Web3.utils.fromWei(r, 'ether');
    });

     */
  }

  // tslint:disable-next-line:typedef
  updateCalcs($event: Event) {
    console.log($event);
  }


  // tslint:disable-next-line:typedef
  onSwitchChange(value) {
    this.showAdvancedSettings = !this.showAdvancedSettings;
  }


  // tslint:disable-next-line:typedef
  setTokenPercent(percent, value) {

  }
}
