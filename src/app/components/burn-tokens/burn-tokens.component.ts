import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../services/web3.service';
import {BurnDialogComponent} from '../burn-dialog/burn-dialog.component';
import {MatSliderChange} from '@angular/material/slider';
import {MatDialog} from '@angular/material/dialog';
declare let require: any;
declare let window: any;
const Web3 = require('web3');
@Component({
  selector: 'app-burn-tokens',
  templateUrl: './burn-tokens.component.html',
  styleUrls: ['./burn-tokens.component.scss']
})
export class BurnTokensComponent implements OnInit {
  burnTokenAddressInputFormGroup: FormGroup;
  lpTokenBalance: any;
  tokenBalance: any;
  burnTokenPercent = 0;
  burnTokenForm = {
    amount: 0,
  };

  constructor(public web3Service: Web3Service, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.createForm();
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
  createForm() {
    this.burnTokenAddressInputFormGroup = this.formBuilder.group({
      burnTokenAddress: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });
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
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  mapValue(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
