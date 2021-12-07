import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationUtils, SnackBarColorEnum} from '../../../utils/NotificationUtil';
import {Web3Service} from '../../services/web3.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {DevNetworks} from '../../services/Networks';
import {faCheck, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CreateTokenDialogComponent} from '../create-token-dialog/create-token-dialog.component';


declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.scss']
})
export class CreateTokenComponent implements OnInit {
  networks: any = DevNetworks;
  createdTokenAddress = '';
  networkId: number = 0;
  formGroup: FormGroup;
  tokenAddressInputFormGroup: FormGroup;
  createButtonLabel = 'Create Token';
  addToMetamaskButtonLabel = 'Add token to metamask';
  tokenAddedToMetamask = false;
  isLoading = false;
  tokenBalance: any;
  hasError = false;
  account: any = undefined;
  showAdvancedSettings = false;
  bnbBalance: any;
  selectedPayToken: {
    id: 0,
    address: ''
  };
  routerAddress: string;

  isApproving = false;
  tokenVerified = false;

  private tokenDialogRef: MatDialogRef<CreateTokenDialogComponent>

  constructor(public web3Service: Web3Service,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private notificationUtils: NotificationUtils,
              public dialog: MatDialog) {
    this.createForm();

    this.createForm();
    this.connectWeb3().then((r) => {
      console.log(r);
    });

    if (this.web3Service.enable) {
      this.web3Service.getAccount().then(async (r) => {
        this.account = r;
        console.log(this.account);
        // this.buttonLabel = r;
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
        this.routerAddress = this.web3Service.getRouterAddress();
        this.selectedPayToken = {address: this.web3Service.getWethAddress(), id: 0};
      });
    }

    this.web3Service.web3.on('accountsChanged', (accounts) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        // this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        // this.buttonLabel = accounts[0];
      }
    });

    this.web3Service.web3.on('networkChanged', (networkId) => {      
      this.networkId = networkId.toString(16);
      console.log({networkId});
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

  // tslint:disable-next-line:typedef
  public async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (r) => {
      console.log(r);
      if (r?.length === 0) {
        this.account = undefined;
        // this.buttonLabel = 'Connect';
      } else {
        this.account = r;
        // this.buttonLabel = r;

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

  ngOnInit(): void {
  }

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
  }

  // tslint:disable-next-line:typedef
  async approveToken() {
    const tokenAddress = this.selectedPayToken.address;
    const tokenAmount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    console.log({tokenAddress});
   
    await this.web3Service
      .approveToken(tokenAddress, this.web3Service.getTokenCreatorAddress(), tokenAmount)
      .then((r) => {
        if (r) {
          return true;
        }
      })
      .catch((err) => {
        return false;
      });
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
  async onChangePaymentToken($event) {
    this.selectedPayToken = $event;
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



  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  async onSubmit(value: any) {
    this.isLoading = true;
    this.createButtonLabel = 'Deploying token';
    if(this.selectedPayToken?.id !== 0) {
      await this.approveToken();
      console.log('d');
    }


    this.tokenDialogRef = this.dialog.open(CreateTokenDialogComponent, {
      data: {
        createButtonLabel: this.createButtonLabel,
        isCreating: false,
        isChecking: false,
        isVerified: false,
        step: 1,
        createdToken: {
          address: ''
        }
      },
    });

    this.web3Service
      .createToken(
        this.selectedPayToken?.address,
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
          this.tokenDialogRef.componentInstance.data = {createButtonLabel: this.createButtonLabel, isCreating: true, isChecking: true, isVerified: false, createdToken: {address: this.createdTokenAddress, symbol: this.formGroup.get('tokenSymbol').value, decimals: Number(this.formGroup.get('tokenDecimals').value)}, step: 2};

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
                    this.tokenDialogRef.componentInstance.data = {createButtonLabel: this.createButtonLabel, isCreating: true, isChecking: true, isVerified: true, createdToken: {address: this.createdTokenAddress, symbol: this.formGroup.get('tokenSymbol').value, decimals: Number(this.formGroup.get('tokenDecimals').value)}, step: 3};
                  }
                },
                (error) => {
                  this.hasError = true;
                  console.log('error');
                  console.log(error);
                  this.tokenDialogRef.close();
                }
              );
          }, 5000);
        } else {
          alert('error creando token');
          this.tokenDialogRef.close();
        }
      })
      .catch((e) => {
        console.log({e});
        this.tokenDialogRef.close();
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

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // tslint:disable-next-line:typedef
  onSwitchChange(value) {
    this.showAdvancedSettings = !this.showAdvancedSettings;
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
}
