import { Component, OnInit, ViewChild} from '@angular/core';
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
import {BnbTokenAddress} from '../../services/BnbTokenAbi';
import Typewriter from 'typewriter-effect/dist/core';

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
    private http: HttpClient
  ) {

    this.createForm();
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

  @ViewChild('slider') slider;
  @ViewChild('addLiquidityBnbSlider') addLiquidityBnbSlider;
  @ViewChild('matRef') matRef: MatSelect;

  title = 'TokenGenerator';
  buttonLabel = 'Connect';
  account: any = undefined;
  isLoading = false;

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
        '<strong>Last</strong> Solidity Version <strong>(v0.8.10+commit.e5eed63a)</strong>.'
      )
      .pauseFor(2000)
      .deleteAll()
      .pauseFor(2000)
      .start();
  }









  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // tslint:disable-next-line:typedef
  createForm() {

  }

  // tslint:disable-next-line:typedef
  async numberFieldKeydown(event, maxValue, controlName) {
    if (event.code !== 'Backspace') {
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
