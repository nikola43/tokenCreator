import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  faCheck,
  faExclamationTriangle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import Web3 from 'web3';
import { MatSliderChange } from '@angular/material/slider';
import { Web3Service } from '../../services/web3.service';
import { DevNetworks } from '../../services/Networks.js';
import { BnbTokenAddress } from '../../services/BnbTokenAbi';
import Typewriter from 'typewriter-effect/dist/core';
import {
  NotificationUtils,
  SnackBarColorEnum,
} from '../../../utils/NotificationUtil';

@Component({
  selector: 'app-token-generator',
  templateUrl: './token-generator.component.html',
  styleUrls: ['./token-generator.component.scss'],
})
export class TokenGeneratorComponent implements OnInit {
  hasError = false;
  errorLabel = '';
  constructor(
    public web3Service: Web3Service,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private notificationUtils: NotificationUtils
  ) {
    this.createForm();
    this.connectWeb3().then((r) => {
      console.log(r);
    });

    if (this.web3Service.enable) {
      this.web3Service.getAccount().then(async (r) => {
        this.account = r;
        this.buttonLabel = r;
        this.bnbBalance = Web3.utils.fromWei(
          await this.web3Service.getBalance(),
          'ether'
        );
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

  @ViewChild('slider') slider;
  @ViewChild('addLiquidityBnbSlider') addLiquidityBnbSlider;
  createButtonLabel = 'Create Token';
  addToMetamaskButtonLabel = 'Add token to metamask';
  tokenAddedToMetamask = false;

  lastCurrentNetwork = 0;
  currentNetwork = 0;
  tokenBalance: any;
  lpTokenBalance: any;
  bnbBalance: any;
  addLiquidityForm = {
    bnbAmount: 0,
    tokenAmount: 0,
  };

  lockLiquidityForm = {
    lpAmount: 0,
    locktime: 0,
  };

  burnTokenForm = {
    amount: 0,
  };

  @ViewChild('matRef') matRef: MatSelect;
  addBnbLiquidityQuantityPercent = 0;
  addTokenLiquidityQuantityPercent = 0;
  burnTokenPercent = 0;
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
  approveButtonIcon: IconDefinition = faCheck;
  tokenAddressInputFormGroup: FormGroup;
  lockLiquidityTokenAddressInputFormGroup: FormGroup;
  burnTokenAddressInputFormGroup: FormGroup;
  whitelistInputFormGroup: FormGroup;
  blacklistInputFormGroup: FormGroup;

  networks: any = DevNetworks;

  whitelistContent: any = [
    {id:1, address: '0xb6e76628BeB7872D2ade6AE9641bb390401c18ef'},
    {id:2, address: '0xfbAA3c716dA6378A0840754185BFf6A05a20e1C8'},
    {id:3, address: '0x1010fb622aD9D19F3B62cC82fEfC5cb95a71aA34'},
  ];
  
  blacklistContent: any = [
    {id:1, address: '0xb6e76628BeB7872D2ade6AE9641bb390401c18ef'},
    {id:2, address: '0xfbAA3c716dA6378A0840754185BFf6A05a20e1C8'},
    {id:3, address: '0x1010fb622aD9D19F3B62cC82fEfC5cb95a71aA34'},
  ];

  // tslint:disable-next-line:typedef
  showAdvancedSettings = false;

  ngOnInit(): void {
    const t = new Typewriter('#typewriter', {
      autoStart: true,
      loop: true,
      delay: 55,
    });
    t.pauseFor(100)
      .typeString(
        'Welcome To Definitive <strong>Token Generation</strong> Platform.'
      )
      .pauseFor(2000)
      .deleteAll()
      .typeString(
        '<strong>Create</strong> Your <strong>Own</strong> Token In <strong>Seconds</strong>.'
      )
      .pauseFor(2000)
      .deleteAll()
      .typeString(
        'Available On <strong class="multiple">Multiple</strong> Blockchains.'
      )
      .pauseFor(2000)
      .deleteAll()
      .typeString('Customize Tokenomics <strong>Easily</strong>.')
      .pauseFor(2000)
      .deleteAll()
      .typeString(
        'Smart Contract <strong><span style="color: #00B74A;">verification</span></strong>  <strong style="text-decoration: underline">fully automated</strong>.'
      )
      .pauseFor(2000)
      .deleteAll()
      .typeString(
        '<strong>Last</strong> Solidity Version <strong>(v0.8.9+commit.e5eed63a)</strong>.'
      )
      .pauseFor(2000)
      .deleteAll()
      .pauseFor(2000)
      .start();
  }

  // tslint:disable-next-line:typedef
  onSlideBurn(event: MatSliderChange) {
    this.burnTokenPercent = Number(event.value);
    this.burnTokenForm.amount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.tokenBalance
    );
  }

  // tslint:disable-next-line:typedef
  onSlideLockLP(event: MatSliderChange) {
    this.lockTokenLiquidityPercent = Number(event.value);
    this.lockLiquidityForm.lpAmount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.lpTokenBalance
    );
  }

  // tslint:disable-next-line:typedef
  onSlideToken(event: MatSliderChange) {
    this.addTokenLiquidityQuantityPercent = Number(event.value);
    this.addLiquidityForm.tokenAmount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.tokenBalance
    );
  }

  // tslint:disable-next-line:typedef
  onSlide(event: MatSliderChange) {
    this.addBnbLiquidityQuantityPercent = Number(event.value);
    this.addLiquidityForm.bnbAmount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.bnbBalance
    );
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time) {
    const r = await this.web3Service.lockLiquidity(tokenAddress, time);
    console.log({
      r,
    });
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // tslint:disable-next-line:typedef
  createForm() {
    this.formGroup = this.formBuilder.group({
      tokenName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      tokenSymbol: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      tokenSupply: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(16),
        ],
      ],
      tokenDecimals: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      TxFeePercentToHolders: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      TxFeePercentToLP: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      TxFeePercentToBurned: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      TxFeePercentToWallet: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      TxFeePercentToBuybackTokens: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      MaxWalletPercent: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      MaxTxPercent: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      FeeReceiverWallet: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
      validate: '',
    });

    this.tokenAddressInputFormGroup = this.formBuilder.group({
      liquidityTokenAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });

    this.lockLiquidityTokenAddressInputFormGroup = this.formBuilder.group({
      lockLiquidityTokenAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });

    this.burnTokenAddressInputFormGroup = this.formBuilder.group({
      burnTokenAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });

    this.whitelistInputFormGroup = this.formBuilder.group({
      whitelistAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });

    this.blacklistInputFormGroup = this.formBuilder.group({
      blacklistAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });
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

        this.bnbBalance = Web3.utils.fromWei(
          await this.web3Service.getBalance(),
          'ether'
        );

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
  }

  // tslint:disable-next-line:typedef
  onSubmit(value: any) {
    this.isLoading = true;
    this.createButtonLabel = 'Deploying token';
    this.web3Service
      .createToken(
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
        this.formGroup.get('FeeReceiverWallet').value
      )
      .then(async (r) => {
        console.log(r);

        this.createButtonLabel = 'Verifying Token';
        await this.sleep(5000);

        if (r.events['1'].address.length > 0) {
          this.createdTokenAddress = r.events['1'].address;
          const interval = setInterval(() => {
            const formData: any = new FormData();

            formData.append('guid', r.guid);
            formData.append('module', 'contract');
            formData.append('action', 'checkverifystatus');
            formData.append('apikey', 'V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY');

            this.http
              .post('https://api-testnet.bscscan.com/api', formData)
              .subscribe(
                async (response: any) => {
                  console.log('response');
                  console.log(response);

                  if (response.status === '1') {
                    clearInterval(interval); // time is up;
                    this.tokenVerified = true;
                    this.createButtonLabel = 'Token Created';
                    this.isLoading = false;
                    this.tokenBalance = Number(
                      Web3.utils.fromWei(
                        await this.getTokenBalance(this.createdTokenAddress),
                        'ether'
                      )
                    )
                      .toFixed(18)
                      .toString();
                    this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.setValue(
                      this.createdTokenAddress
                    );
                  }
                },
                (error) => {
                  this.hasError = true;
                  console.log('error');
                  console.log(error);
                }
              );
          }, 5000);
        } else {
          alert('error creando token');
        }
      })
      .catch((e) => {
        console.log({ e });

        if (e.code === 4001) {
          this.notificationUtils.showSnackBar(
            'Error: Transaction rejected by user',
            SnackBarColorEnum.Red,
            5000,
            'top',
            'center'
          );
        } else {
          this.notificationUtils.showSnackBar(
            e.message,
            SnackBarColorEnum.Red,
            5000,
            'top',
            'center'
          );
        }
        this.createButtonLabel = 'Deploy Token';
        this.hasError = true;
        this.isLoading = false;
      });
  }

  // tslint:disable-next-line:typedef
  bnbInputKeyUp() {
    console.log(this.addLiquidityForm.bnbAmount);
    const value = this.mapValue(
      Number(this.addLiquidityForm.bnbAmount),
      0,
      this.bnbBalance,
      0,
      100
    );
    this.addLiquidityBnbSlider.value = value;
  }

  // tslint:disable-next-line:typedef
  async burnTokenInputKeyUp() {
    this.tokenBalance = Number(
      Web3.utils.fromWei(
        await this.getTokenBalance(
          this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value
        ),
        'ether'
      )
    )
      .toFixed(18)
      .toString();

    console.log({
      tokenBalance: this.tokenBalance,
    });
    const value = this.mapValue(
      Number(this.burnTokenForm.amount),
      0,
      this.tokenBalance,
      0,
      100
    );

    // this.slider.value = value;
  }

  // tslint:disable-next-line:typedef
  async tokenInputKeyUp() {
    console.log(this.burnTokenAddressInputFormGroup.controls.burnTokenAddress);

    const isValid = /^0x[a-fA-F0-9]{40}$/.test(
      this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value
    );
    if (isValid) {
      this.tokenBalance = Number(
        Web3.utils.fromWei(
          await this.getTokenBalance(
            this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value
          ),
          'ether'
        )
      )
        .toFixed(18)
        .toString();
    } else {
      this.tokenBalance = 0;
    }
  }

  // tslint:disable-next-line:typedef
  async numberFieldKeyup(event, maxValue, controlName) {
    console.log(this.formGroup.get(controlName).value);
    console.log(maxValue);
    if (this.formGroup.get(controlName).value > maxValue) {
      this.formGroup.controls[controlName].setValue(maxValue);
    }
  }

  // tslint:disable-next-line:typedef
  async numberFieldKeydown(event, maxValue, controlName) {
    if (event.code !== 'Backspace') {
      console.log(event.key);
      console.log(isNaN(Number(event.key)));

      if (isNaN(Number(event.key))) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }

      if (Number(event.key) < 0 || Number(event.key) > 9) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }

      /*
      if (this.formGroup.get(controlName).value > maxValue) {
        this.formGroup.controls[controlName].setValue(maxValue);
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
      */
    }
  }

  // tslint:disable-next-line:typedef
  async approveToken() {
    this.isApproving = true;
    this.approveButtonLabel = 'Approving';
    const tokenAddress =
      this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value;
    const bnbAmount = this.addLiquidityForm.bnbAmount.toString();
    const tokenAmount = this.addLiquidityForm.tokenAmount.toString();
    console.log({ tokenAddress });
    await this.web3Service
      .approveToken(tokenAddress, tokenAmount)
      .then((r) => {
        if (r) {
          this.tokenApproved = true;
          this.isApproving = false;
          this.approveButtonLabel = 'Approved';
        }
      })
      .catch((err) => {
        console.log(err);
        this.tokenApproved = false;
        this.isApproving = false;
        this.approveButtonLabel = 'Not Approved';
        this.approveButtonIcon = faExclamationTriangle;
      });
  }

  // tslint:disable-next-line:typedef
  async burnTokens() {
    console.log(
      this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value
    );
    this.web3Service
      .burnTokens(
        this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value,
        this.burnTokenForm.amount
      )
      .then((r2) => {
        console.log(r2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // tslint:disable-next-line:typedef
  async addWhitelist() {
    console.log(
      this.whitelistInputFormGroup.controls.whitelistAddress.value
    );
    this.whitelistContent.push({id: this.whitelistContent.lenght +1, address: this.whitelistInputFormGroup.controls.whitelistAddress.value})
    // this.web3Service
    //   .burnTokens(
    //     this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value,
    //     this.burnTokenForm.amount
    //   )
    //   .then((r2) => {
    //     console.log(r2);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // tslint:disable-next-line:typedef
  async addBlacklist() {
    console.log(
      this.blacklistInputFormGroup.controls.blacklistAddress.value
    );
    this.blacklistContent.push({id: this.blacklistContent.lenght +1, address: this.blacklistInputFormGroup.controls.whitelistAddress.value})

    // this.web3Service
    //   .burnTokens(
    //     this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value,
    //     this.burnTokenForm.amount
    //   )
    //   .then((r2) => {
    //     console.log(r2);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  async deleteFromWhitelist(id) {
    this.whitelistContent.splice(id-1,1);
  }

  async deleteFromBlacklist(id) {
    this.blacklistContent.splice(id-1,1);
  }

  // tslint:disable-next-line:typedef
  async addLiquidity() {
    const bnbAmount = this.addLiquidityForm.bnbAmount;
    const tokenAmount = this.addLiquidityForm.tokenAmount;
    const minTokenAmount = Number(
      Number(tokenAmount) - Number(this.percentage(Number(tokenAmount), 1))
    );
    const minBnbTokenAmount = Number(
      Number(bnbAmount) - Number(this.percentage(Number(bnbAmount), 1))
    );

    console.log({
      bnbAmount,
      tokenAmount,
      minTokenAmount,
      minBnbTokenAmount,
    });

    this.web3Service
      .addLiquidity(
        this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value,
        bnbAmount,
        tokenAmount,
        minBnbTokenAmount,
        minTokenAmount
      )
      .then(async (r2) => {
        const pairAddress = await this.getPair(this.createdTokenAddress);
        this.tokenBalance = Number(
          Web3.utils.fromWei(
            await this.getTokenBalance(this.createdTokenAddress),
            'ether'
          )
        )
          .toFixed(18)
          .toString();
        this.bnbBalance = Number(
          Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether')
        )
          .toFixed(18)
          .toString();
        this.lpTokenBalance = Number(
          Web3.utils.fromWei(await this.getLPTokenBalance(pairAddress), 'ether')
        );

        this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.setValue(
          pairAddress
        );
      })
      .catch((err) => {
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
    return (percent / 100) * total;
  }

  // tslint:disable-next-line:typedef
  async networkSelectChange(changeEvent: MatSelectChange) {
    console.log(changeEvent);
    try {
      await this.web3Service.web3.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.networks[changeEvent.value].params.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await this.web3Service.web3.request({
            method: 'wallet_addEthereumChain',
            params: [this.networks[changeEvent.value].params],
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
    this.lastCurrentNetwork = this.currentNetwork;
  }

  // tslint:disable-next-line:typedef
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value + '%';
  }

  // tslint:disable-next-line:typedef
  addEvent(type, event) {
    console.log({
      type,
      event,
    });

    this.lockLiquidityForm.locktime = event.value.getTime();
    console.log(this.lockLiquidityForm.locktime);

    // const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
  }

  // tslint:disable-next-line:typedef
  async getPair(address) {
    return await this.web3Service.getPair(BnbTokenAddress, address);
  }

  // tslint:disable-next-line:typedef
  mapValue(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  // tslint:disable-next-line:typedef
  onSwitchChange(value) {
    this.showAdvancedSettings = !this.showAdvancedSettings;
  }

  // tslint:disable-next-line:typedef
  setTokenPercent(percent) {
    this.addLiquidityForm.tokenAmount = this.percentage(
      percent,
      this.tokenBalance
    );
    const value = this.mapValue(
      Number(this.addLiquidityForm.tokenAmount),
      0,
      this.tokenBalance,
      0,
      100
    );
    this.slider.value = value;
  }

  // tslint:disable-next-line:typedef
  setBnbPercent(percent) {
    this.addLiquidityForm.bnbAmount = this.percentage(percent, this.bnbBalance);
    const value = this.mapValue(
      Number(this.addLiquidityForm.bnbAmount),
      0,
      this.bnbBalance,
      0,
      100
    );
    this.addLiquidityBnbSlider.value = value;
  }

  // tslint:disable-next-line:typedef
  async onLockLiquidityTokenAddressKeyup() {
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(
      this.lockLiquidityTokenAddressInputFormGroup.controls
        .lockLiquidityTokenAddress.value
    );
    if (isValid) {
      this.lpTokenBalance = Number(
        Web3.utils.fromWei(
          await this.getLPTokenBalance(
            this.lockLiquidityTokenAddressInputFormGroup.controls
              .lockLiquidityTokenAddress.value
          ),
          'ether'
        )
      )
        .toFixed(18)
        .toString();
    } else {
      this.lpTokenBalance = 0;
    }
  }

  // tslint:disable-next-line:typedef
  async onLiquidityTokenAddressKeyup() {
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(
      this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value
    );

    if (isValid) {
      this.tokenBalance = Number(
        Web3.utils.fromWei(
          await this.getTokenBalance(
            this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value
          ),
          'ether'
        )
      )
        .toFixed(18)
        .toString();
    } else {
      this.tokenBalance = 0;
    }
  }

  // tslint:disable-next-line:typedef
  async addTokenToMetamask() {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await this.web3Service.web3.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: this.createdTokenAddress, // The address that the token is at.
            symbol: this.formGroup.get('tokenSymbol').value, // A ticker symbol or shorthand, up to 5 chars.
            decimals: this.formGroup.get('tokenDecimals').value, // The number of decimals in the token
          },
        },
      });

      console.log('Thanks for your interest!');
      this.addToMetamaskButtonLabel = 'Token added to metamask successfully';
      this.tokenAddedToMetamask = true;
    } catch (error) {
      console.log(error);
    }
  }
}
