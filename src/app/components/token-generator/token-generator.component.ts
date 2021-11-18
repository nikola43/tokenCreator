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

  myLocks = [];

  constructor(
    public web3Service: Web3Service,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private notificationUtils: NotificationUtils,
    public dialog: MatDialog
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
  tokenAddressInputFormGroup: FormGroup;
  title = 'TokenGenerator';
  buttonLabel = 'Connect';
  account: any = undefined;
  isLoading = false;


  approveButtonLabel = 'Approve Token';
  approveButtonIcon: IconDefinition = faCheck;
  tokenApproved = false;
  isApproving = false;
  lockLiquidityTokenAddressInputFormGroup: FormGroup;
  burnTokenAddressInputFormGroup: FormGroup;
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
  async onSlide(event: MatSliderChange) {
    this.addBnbLiquidityQuantityPercent = Number(event.value);
    this.addLiquidityForm.bnbAmount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.bnbBalance
    );

    const estimate = await this.web3Service.getEstimatedTokensForBNB(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value);
    const ratio = estimate['0'] / estimate['1'];
    const addLiquidityTokenAmount = ratio * this.addLiquidityForm.bnbAmount;
    console.log({estimate});
    console.log({ratio});
    console.log({addLiquidityTokenAmount});

    if (!isNaN(Number(addLiquidityTokenAmount))) {
      const value2 = this.mapValue(
        Number(addLiquidityTokenAmount),
        0,
        this.tokenBalance,
        0,
        100
      );
      this.slider.value = value2;

      this.addLiquidityForm.tokenAmount = addLiquidityTokenAmount;
    }
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time: number, tokenAmount: number) {

    console.log({
      tokenAddress,
      time,
      tokenAmount
    });

    const r = await this.web3Service.lockLiquidity(tokenAddress, time, tokenAmount);
    console.log({
      r,
    });
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // tslint:disable-next-line:typedef
  createForm() {
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

    this.tokenAddressInputFormGroup = this.formBuilder.group({
      liquidityTokenAddress: [
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
  async bnbInputKeyUp() {
    console.log(this.addLiquidityForm.bnbAmount);

    const estimate = await this.web3Service.getEstimatedTokensForBNB(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value);
    const ratio = estimate['0'] / estimate['1'];
    const addLiquidityTokenAmount = ratio * this.addLiquidityForm.bnbAmount;
    console.log({estimate});
    console.log({ratio});
    console.log({addLiquidityTokenAmount});


    const value = this.mapValue(
      Number(this.addLiquidityForm.bnbAmount),
      0,
      this.bnbBalance,
      0,
      100
    );
    this.addLiquidityBnbSlider.value = value;

    if (!isNaN(Number(addLiquidityTokenAmount))) {
      const value2 = this.mapValue(
        Number(addLiquidityTokenAmount),
        0,
        this.tokenBalance,
        0,
        100
      );
      this.slider.value = value2;

      this.addLiquidityForm.tokenAmount = addLiquidityTokenAmount;
    }


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
    console.log({tokenAddress});
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

    console.log({
      tokenAddress: this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value,
      amount: this.burnTokenForm.amount
    });

    const dialogRef = this.dialog.open(BurnDialogComponent, {
      data: {
        tokenAddress: this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value,
        amount: this.burnTokenForm.amount
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log('The dialog was closed');
      console.log(result);

      this.tokenBalance = Number(
        Web3.utils.fromWei(
          await this.getTokenBalance(this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value),
          'ether'
        )
      )
        .toFixed(18)
        .toString();

      this.burnTokenForm.amount = 0;
    });

    /*
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
    */
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
  async addLiquidity() {
    const bnbAmount = this.addLiquidityForm.bnbAmount;
    const tokenAmount = this.addLiquidityForm.tokenAmount;
    const minTokenAmount = Number(Number(tokenAmount) - Number(this.percentage(Number(tokenAmount), 1)));
    const minBnbTokenAmount = Number(Number(bnbAmount) - Number(this.percentage(Number(bnbAmount), 1)));

    console.log({
      bnbAmount,
      tokenAmount,
      minTokenAmount,
      minBnbTokenAmount,
    });
    const tokenAddress = this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value;
    this.web3Service
      .addLiquidity(
        tokenAddress,
        bnbAmount,
        tokenAmount,
        minBnbTokenAmount,
        minTokenAmount
      )
      .then(async (r2) => {

        this.tokenBalance = Number(
          Web3.utils.fromWei(
            await this.getTokenBalance(tokenAddress),
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

        const pairAddress = await this.getPair(tokenAddress);
        this.lpTokenBalance = Number(
          Web3.utils.fromWei(await this.getLPTokenBalance(pairAddress), 'ether')
        );

        this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.setValue(
          pairAddress
        );


        const value2 = this.mapValue(
          Number(0),
          0,
          this.tokenBalance,
          0,
          100
        );
        this.slider.value = value2;
        this.addLiquidityForm.tokenAmount = 0;
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
  async setBnbPercent(percent) {
    this.addLiquidityForm.bnbAmount = this.percentage(percent, this.bnbBalance);
    const value = this.mapValue(
      Number(this.addLiquidityForm.bnbAmount),
      0,
      this.bnbBalance,
      0,
      100
    );
    this.addLiquidityBnbSlider.value = value;

    const estimate = await this.web3Service.getEstimatedTokensForBNB(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value);
    const ratio = estimate['0'] / estimate['1'];
    const addLiquidityTokenAmount = ratio * this.addLiquidityForm.bnbAmount;
    console.log({estimate});
    console.log({ratio});
    console.log({addLiquidityTokenAmount});

    if (!isNaN(Number(addLiquidityTokenAmount))) {
      const value2 = this.mapValue(
        Number(addLiquidityTokenAmount),
        0,
        this.tokenBalance,
        0,
        100
      );
      this.slider.value = value2;

      this.addLiquidityForm.tokenAmount = addLiquidityTokenAmount;
    }
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

      /* Get my locks */
      this.web3Service.getLocks().then((r) => {
        console.log(r);
        this.myLocks = r;
      }).catch((err) => {
        console.log(err);
      });

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

      const pairAddress = await this.getPair(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value);
      this.lpTokenBalance = Number(
        Web3.utils.fromWei(await this.getLPTokenBalance(pairAddress), 'ether')
      );

    } else {
      this.tokenBalance = 0;
    }
  }
}
