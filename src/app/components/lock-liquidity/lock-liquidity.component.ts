import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../services/web3.service';
import {MatSliderChange} from '@angular/material/slider';
import {
  NotificationUtils,
  SnackBarColorEnum,
} from 'src/utils/NotificationUtil';
import {CountdownModule} from 'ngx-countdown';
import {faLock, faLockOpen, faCheck, faExclamationTriangle, IconDefinition} from '@fortawesome/free-solid-svg-icons';

declare let require: any;
const Web3 = require('web3');

@Component({
  selector: 'app-lock-liquidity',
  templateUrl: './lock-liquidity.component.html',
  styleUrls: ['./lock-liquidity.component.scss'],
})
export class LockLiquidityComponent implements OnInit {
  @ViewChild('lockLiquidityTokenAddress') tokenAddressInput: ElementRef;
  lockLiquidityTokenAddressInputFormGroup: FormGroup;
  bnbBalance: any;
  myLocks = [];
  lpTokenBalance: any;
  lockLiquidityForm = {
    lpAmount: 0,
    locktime: 0,
  };
  falock = faLock;
  falockopen = faLockOpen;
  lockTokenLiquidityPercent = 0;
  now = Date.now();
  approveButtonLabel = 'Approve Token';
  approveButtonIcon: IconDefinition = faCheck;
  tokenApproved = false;
  isApproving = false;
  isLoading = false;
  isLocking = false;
  isAllowed = false;

  constructor(
    private formBuilder: FormBuilder,
    public web3Service: Web3Service,
    private notificationUtils: NotificationUtils
  ) {
    this.createForm();
  }

  // tslint:disable-next-line:typedef
  async getTokenBalance(tokenAddress) {
    return await this.web3Service.getTokensBalance(tokenAddress);
  }

  // tslint:disable-next-line:typedef
  async tokenInputKeyUp() {


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
  async approveToken() {
    this.isApproving = true;
    this.approveButtonLabel = 'Approving';
    const tokenAddress = this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.value;
    const tokenAmount = this.lockLiquidityForm.lpAmount.toString();
    const lockedAddress = this.web3Service.getLockedAddress();

    console.log({
      lockedAddress,
    });

    await this.web3Service
      .approveLPToken(tokenAddress, lockedAddress, tokenAmount)
      .then((r) => {
        if (r) {
          this.isAllowed = true;
          this.isApproving = false;
          this.approveButtonLabel = 'Approved';
        }
      })
      .catch((err) => {
        this.isAllowed = false;
        this.isApproving = false;
        this.approveButtonLabel = 'Not Approved';
        this.approveButtonIcon = faExclamationTriangle;
      });
  }

  // tslint:disable-next-line:typedef
  addEvent(type, event) {

    this.lockLiquidityForm.locktime = event.value.getTime() / 1000;

    // const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
  }

  // tslint:disable-next-line:typedef
  async lockLiquidity(tokenAddress: string, time: number, tokenAmount: number) {
    this.isLocking = true;
    try {
      const r = await this.web3Service.lockLiquidity(tokenAddress, time, tokenAmount);
      this.notificationUtils.showSnackBar(
        'Liquidity locked Successfully.',
        SnackBarColorEnum.Green
      );
      this.isLocking = false;
    } catch (e) {
      this.notificationUtils.showSnackBar(
        'Fail to lock liqquidity. Try again please',
        SnackBarColorEnum.Red
      );
      this.isLocking = false;
    }
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
  async onLockLiquidityTokenAddressKeyup() {
    const address = this.lockLiquidityTokenAddressInputFormGroup.controls.lockLiquidityTokenAddress.value;
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);

    if (isValid) {
      this.lpTokenBalance = Number(
        Web3.utils.fromWei(await this.web3Service.getLPTokensBalance(address), 'ether')
      )
        .toFixed(18)
        .toString();


      const lockerAddress = this.web3Service.getLockedAddress();
      console.log({
        lockerAddress
      });
      this.isAllowed = await this.web3Service.isLPAllowed(address, lockerAddress);


      // Get my locks
      this.web3Service
        .getLocks()
        .then((r) => {
          r.map(
            async (x) =>
              (x._tokenName = await this.getLPTokenName(
                address
              ))
          );
          this.myLocks = r;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.lpTokenBalance = 0;
    }
  }

  async getLPTokenName(tokenAddress): Promise<string> {
    let name = await this.web3Service.getTokensName(tokenAddress);
    name = name + ' - BNB LP';
    return name;
  }

  // tslint:disable-next-line:typedef
  onClickEvent(e) {
    this.tokenAddressInput.nativeElement.focus();
    return this.checkValue(e, 'Please enter a valid token.');
  }

  // tslint:disable-next-line:typedef
  checkValue(address: string, msg: string = 'The address is invalid.') {
    try {
      const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
      if (!isValid) {
        throw new Error(msg);
      }
    } catch (e) {
      this.notificationUtils.showSnackBar(msg, SnackBarColorEnum.Red);
    }
  }

  // tslint:disable-next-line:typedef
  async withdraw(id: string) {
    try {
      const res = await this.web3Service.withdrawLockedTokens(id);
      this.notificationUtils.showSnackBar(
        'Successful withdraw.',
        SnackBarColorEnum.Green
      );
      return res;
    } catch (e) {
      this.notificationUtils.showSnackBar(
        'Fail to withdraw. Wait until unlock.',
        SnackBarColorEnum.Red
      );
    }
  }
}
