import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {
  faCheck,
  faExclamationTriangle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatSliderChange} from '@angular/material/slider';
import {Web3Service} from '../../services/web3.service';
import {DevNetworks} from '../../services/Networks.js';
import {BnbTokenAddress} from '../../services/BnbTokenAbi';
import Typewriter from 'typewriter-effect/dist/core';
import {
  NotificationUtils,
  SnackBarColorEnum,
} from '../../../utils/NotificationUtil';
import {MatDialog} from '@angular/material/dialog';
import {BurnDialogComponent} from '../burn-dialog/burn-dialog.component';

declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  selector: 'app-token-generator',
  templateUrl: './token-generator.component.html',
  styleUrls: ['./token-generator.component.scss'],
})
export class TokenGeneratorComponent implements OnInit {

  errorLabel = '';
  bnbBalance: any;
  myLocks = [];
  lpTokenBalance: any;
  tokenBalance: any;
  constructor(
    public web3Service: Web3Service,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private notificationUtils: NotificationUtils,

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
  @ViewChild('matRef') matRef: MatSelect;




  title = 'TokenGenerator';
  buttonLabel = 'Connect';
  account: any = undefined;
  isLoading = false;


  whitelistInputFormGroup: FormGroup;
  blacklistInputFormGroup: FormGroup;



  whitelistContent: any = [
    '0xb6e76628BeB7872D2ade6AE9641bb390401c18ef',
    '0xfbAA3c716dA6378A0840754185BFf6A05a20e1C8',
    '0x1010fb622aD9D19F3B62cC82fEfC5cb95a71aA34',
  ];

  blacklistContent: any = [
    '0xb6e76628BeB7872D2ade6AE9641bb390401c18ef',
    '0xfbAA3c716dA6378A0840754185BFf6A05a20e1C8',
    '0x1010fb622aD9D19F3B62cC82fEfC5cb95a71aA34',
  ];



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









  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // tslint:disable-next-line:typedef
  createForm() {
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
      }
    });
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
  async addWhitelist() {
    this.whitelistContent.push(this.whitelistInputFormGroup.controls.whitelistAddress.value);
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
    this.blacklistContent.push(this.blacklistInputFormGroup.controls.whitelistAddress.value);

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
  async deleteFromWhitelist(address) {
    const index = this.whitelistContent.indexOf(address);
    if (index > -1) {
      this.whitelistContent.splice(index, 1);
    }
  }

  // tslint:disable-next-line:typedef
  async deleteFromBlacklist(address) {
    const index = this.blacklistContent.indexOf(address);
    if (index > -1) {
      this.blacklistContent.splice(index, 1);
    }
  }

  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }


  // tslint:disable-next-line:typedef
  async getLPTokenBalance(tokenAddress) {
    return await this.web3Service.getLPTokensBalance(tokenAddress);
  }
  // tslint:disable-next-line:typedef
  percentage(percent, total) {
    return (percent / 100) * total;
  }
  // tslint:disable-next-line:typedef
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value + '%';
  }
  // tslint:disable-next-line:typedef
  async getPair(address) {
    return await this.web3Service.getPair(BnbTokenAddress, address);
  }
}
