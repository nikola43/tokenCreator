import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Web3Service} from './services/web3.service';
import Typewriter from 'typewriter-effect/dist/core';
import {faBurn, faLock, faCoins, faAtom, faBook, faFunnelDollar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy , OnInit {
  buttonLabel = 'Connect';
  account: any = undefined;
  mobileQuery: MediaQueryList;
  selectedNetwork = 0;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;
  faburn = faBurn;
  falock = faLock;
  facoins = faCoins;
  faatom = faAtom;
  fabook = faBook;
  fadollar = faFunnelDollar;

  constructor(public web3Service: Web3Service, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.connectWeb3().then((r) => {
      console.log({r});

      if (this.web3Service.enable) {
        this.web3Service.getAccount().then(async (account: string) => {

          console.log({
            account
          });

          this.account = account;
          this.buttonLabel = account.charAt(0) + '' + account.charAt(1) + '' +
            account.charAt(2) + '' + account.charAt(4) + account.charAt(5) + '' +
            account.charAt(6) + '' + '...' + account.charAt(account.length - 4) + '' +
            account.charAt(account.length - 3) + '' + account.charAt(account.length - 2) + '' + account.charAt(account.length - 1);
        });
      }

    });



    this.web3Service.web3.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0].charAt(0) + '' + accounts[0].charAt(1) + '' +
          accounts[0].charAt(2) + '' + accounts[0].charAt(4) + accounts[0].charAt(5) + '' +
          accounts[0].charAt(6) + '' + '...' + accounts[0].charAt(accounts[0].length - 4) + '' +
          accounts[0].charAt(accounts[0].length - 3) + '' + accounts[0].charAt(accounts[0].length - 2) + '' +
          accounts[0].charAt(accounts[0].length - 1);
      }
    });

    this.web3Service.web3.on('networkChanged', (data) => {
      console.log({
        data
      });



      if (this.web3Service.enable) {
        this.web3Service.getAccount().then(async (r) => {
          console.log({
            r
          });

          const accounts = [r];
          this.account = accounts[0];
          this.buttonLabel = accounts[0].charAt(0) + '' + accounts[0].charAt(1) + '' +
            accounts[0].charAt(2) + '' + accounts[0].charAt(4) + accounts[0].charAt(5) + '' +
            accounts[0].charAt(6) + '' + '...' + accounts[0].charAt(accounts[0].length - 4) + '' +
            accounts[0].charAt(accounts[0].length - 3) + '' + accounts[0].charAt(accounts[0].length - 2) + '' +
            accounts[0].charAt(accounts[0].length - 1);

        });
      }

    });
  }

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
        'Smart Contract <strong><span style="color: #ff29ff;">verification</span></strong>  <strong style="text-decoration: underline">fully automated</strong>.'
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // tslint:disable-next-line:typedef
  onNetworkChanged(event: any) {
    console.log({event});
    this.selectedNetwork = event;
    this.web3Service.setNetworkId(this.selectedNetwork);
  }

  // tslint:disable-next-line:typedef
  async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (account: string) => {
      console.log({account});
      if (account?.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = account;
        this.buttonLabel = account.charAt(0) + '' + account.charAt(1) + '' +
          account.charAt(2) + '' + account.charAt(4) + account.charAt(5) + '' +
          account.charAt(6) + '' + '...' + account.charAt(account.length - 4) + '' +
          account.charAt(account.length - 3) + '' + account.charAt(account.length - 2) + '' + account.charAt(account.length - 1);
      }
    });
  }
}
