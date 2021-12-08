import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../services/web3.service';
import {BnbTokenAddress} from '../../services/BnbTokenAbi';
import {MatSliderChange} from '@angular/material/slider';
import {faCheck, faExclamationTriangle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { NotificationUtils, SnackBarColorEnum } from 'src/utils/NotificationUtil';
import { MatDialog } from '@angular/material/dialog';
import {RemoveLiquidityDialogComponent} from '../remove-liquidity-dialog/remove-liquidity-dialog.component';

declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  selector: 'app-add-liquidity',
  templateUrl: './add-liquidity.component.html',
  styleUrls: ['./add-liquidity.component.scss']
})
export class AddLiquidityComponent implements OnInit {
  tokenAddressInputFormGroup: FormGroup;
  burnTokenAddressInputFormGroup: FormGroup;
  tokenBalance: any = 0;
  lpTokenBalance: any = 0;
  bnbBalance: any;
  approveButtonLabel = 'Approve Token';
  approveButtonIcon: IconDefinition = faCheck;
  tokenApproved = false;
  isApproving = false;
  isLoading = false;
  isAllowed = false;
  addBnbLiquidityQuantityPercent = 0;
  addTokenLiquidityQuantityPercent = 0;
  @ViewChild('slider') slider;
  @ViewChild('addLiquidityBnbSlider') addLiquidityBnbSlider;
  @ViewChild('liquidityTokenAddress') tokenAddressInput: ElementRef;
  buttonLabel = 'Connect';
  account: any = undefined;
  addLiquidityForm = {
    bnbAmount: 0,
    tokenAmount: 0,
  };
  constructor(public web3Service: Web3Service,
              private formBuilder: FormBuilder,
              private notificationUtils: NotificationUtils,
              public dialog: MatDialog) {
    this.createForm();

    this.connectWeb3().then((r) => {
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
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  public async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (r) => {
      if (r?.length === 0) {
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
          .toFixed(8)
          .toString();
        this.bnbBalance = Number(
          Web3.utils.fromWei(await this.web3Service.getBalance(), 'ether')
        )
          .toFixed(8)
          .toString();

        this.lpTokenBalance = Number(
          Web3.utils.fromWei(await this.getLPTokenBalance(tokenAddress), 'ether')
        );

        /*
        this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.setValue(
          pairAddress
        );
        */


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
  mapValue(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  // tslint:disable-next-line:typedef
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value + '%';
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
        .toFixed(8)
        .toString();

      console.log(this.isAllowed);
    } else {
      this.tokenBalance = 0;
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
    const routerAddress = this.web3Service.getRouterAddress();
    await this.web3Service
      .approveToken(tokenAddress,routerAddress, tokenAmount)
      .then((r) => {
        if (r) {
          this.isAllowed = true;
          this.isApproving = false;
          this.approveButtonLabel = 'Approved';
        }
      })
      .catch((err) => {
        console.log(err);
        this.isAllowed = false;
        this.isApproving = false;
        this.approveButtonLabel = 'Not Approved';
        this.approveButtonIcon = faExclamationTriangle;
      });
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
  percentage(percent, total) {
    return (percent / 100) * total;
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
  onSlideToken(event: MatSliderChange) {
    this.addTokenLiquidityQuantityPercent = Number(event.value);
    this.addLiquidityForm.tokenAmount = this.mapValue(
      Number(event.value),
      0,
      100,
      0,
      this.tokenBalance
    );

    const value2 = this.mapValue(
      Number(this.addLiquidityForm.tokenAmount),
      0,
      this.tokenBalance,
      0,
      100
    );
    this.addLiquidityBnbSlider.value = value2;
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
  async getPair(address) {
    return await this.web3Service.getPair(BnbTokenAddress, address);
  }

// tslint:disable-next-line:typedef
  async onLiquidityTokenAddressKeyup() {
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(
      this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value
    );

    if (isValid) {
      console.log('petaso')
      console.log(this.tokenBalance);
      this.tokenBalance = Number(
        Web3.utils.fromWei(
          await this.getTokenBalance(
            this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value
          ),
          'ether'
        )
      )
        .toFixed(8)
        .toString();
      console.log('lptokenbalance')
      this.lpTokenBalance = Number(
        Web3.utils.fromWei(await this.getLPTokenBalance(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value), 'ether')
      );
      console.log('swdsdsd');
      this.isAllowed = await this.web3Service.isAllowed(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value, this.web3Service.getRouterAddress());
      console.log(this.isAllowed);
    } else {
      this.tokenBalance = 0;
    }
  }

  async openRemoveLiquidityDialog() {
    const pairAddress = await this.getPair(this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value);
    const dialogRef = this.dialog.open(RemoveLiquidityDialogComponent, {
      data: {
        lpTokenBalance: this.lpTokenBalance,
        address: this.tokenAddressInputFormGroup.controls.liquidityTokenAddress.value,
        pairAddress: pairAddress
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.notificationUtils.showSnackBar(
          `The LP token was removed successfully`,
          SnackBarColorEnum.Green,
        );

        this.tokenBalance = Number(
          Web3.utils.fromWei(
            await this.getTokenBalance(this.burnTokenAddressInputFormGroup.controls.burnTokenAddress.value),
            'ether'
          )
        )
          .toFixed(8)
          .toString();
        this.lpTokenBalance = Number(
          Web3.utils.fromWei(await this.getLPTokenBalance(pairAddress), 'ether')
        );
        this.bnbBalance = Web3.utils.fromWei(
          await this.web3Service.getBalance(),
          'ether'
        );
      }


    });
  }

  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  createForm() {
    this.tokenAddressInputFormGroup = this.formBuilder.group({
      liquidityTokenAddress: [
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
  }

  // tslint:disable-next-line:typedef
  async getLPTokenBalance(tokenAddress) {
    return await this.web3Service.getLPTokensBalance(tokenAddress);
  }

  onClickEvent(e) {
    this.tokenAddressInput.nativeElement.focus();
    return this.checkValue(e, 'Please enter a valid token.');
  }

  checkValue(address:string,msg:string = 'The address is invalid.') {
    try {
      const isValid = /^0x[a-fA-F0-9]{40}$/.test(
        address
      );
      if (!isValid) {
        throw new Error(msg);

      };
    }
    catch(e) {
      this.notificationUtils.showSnackBar(
        msg,
        SnackBarColorEnum.Red,
      );
    }
  }
}
