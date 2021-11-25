import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../services/web3.service';
import {MatSliderChange} from '@angular/material/slider';
declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  selector: 'app-lock-liquidity',
  templateUrl: './lock-liquidity.component.html',
  styleUrls: ['./lock-liquidity.component.scss']
})
export class LockLiquidityComponent implements OnInit {
  lockLiquidityTokenAddressInputFormGroup: FormGroup;
  bnbBalance: any;
  myLocks = [];
  lpTokenBalance: any;
  tokenBalance: any;
  lockLiquidityForm = {
    lpAmount: 0,
    locktime: 0,
  };
  lockTokenLiquidityPercent = 0;
  constructor(    private formBuilder: FormBuilder,    public web3Service: Web3Service) {
    this.createForm();
  }

  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }
  // tslint:disable-next-line:typedef
  async tokenInputKeyUp() {
    console.log(this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress);

    const isValid = /^0x[a-fA-F0-9]{40}$/.test(
      this.lockLiquidityTokenAddressInputFormGroup.controls.burnTokenAddress.value
    );
    if (isValid) {
      this.tokenBalance = Number(
        Web3.utils.fromWei(
          await this.getTokenBalance(
            this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.value
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
  ngOnInit(): void {
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
  // tslint:disable-next-line:typedef
  mapValue(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
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
  createForm() {
    this.lockLiquidityTokenAddressInputFormGroup = this.formBuilder.group({
      lockLiquidityTokenAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });
  }

  // tslint:disable-next-line:typedef
  async getLPTokenBalance(tokenAddress) {
    return await this.web3Service.getLPTokensBalance(tokenAddress);
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
}
