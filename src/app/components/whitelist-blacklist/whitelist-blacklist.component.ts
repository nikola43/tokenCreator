import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../services/web3.service';
import {MatSliderChange} from '@angular/material/slider';
declare let require: any;
declare let window: any;
const Web3 = require('web3');

@Component({
  selector: 'app-whitelist-blacklist',
  templateUrl: './whitelist-blacklist.component.html',
  styleUrls: ['./whitelist-blacklist.component.scss']
})
export class WhitelistBlacklistComponent implements OnInit {
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

  constructor(    private formBuilder: FormBuilder,    public web3Service: Web3Service) {
    this.createForm();
    console.log('getwhitelist',this.web3Service.getTokenWhitelist('0xb6e76628BeB7872D2ade6AE9641bb390401c18ef'));
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
  async addWhitelist() {
    this.whitelistContent.push(this.whitelistInputFormGroup.controls.whitelistAddress.value);
    
    console.log('addWhitelist',this.web3Service.addAddressWhitelist('0xb6e76628BeB7872D2ade6AE9641bb390401c18ef'));
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
    this.blacklistContent.push(this.blacklistInputFormGroup.controls.blacklistAddress.value);

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
}
