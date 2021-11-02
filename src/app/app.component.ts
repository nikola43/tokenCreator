import {Component, ViewChild} from '@angular/core';
import {Web3Service} from './services/web3.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  buttonLabel = 'Connect';
  account: any = undefined;

  constructor(public web3Service: Web3Service) {
    this.connectWeb3().then((r) => {
      console.log(r);
    });

    /*
    this.web3Service.provider.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }
    });

    this.web3Service.provider.on('networkChanged', (accounts: string[]) => {
      console.log(accounts);
      if (accounts.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = accounts[0];
        this.buttonLabel = accounts[0];
      }

    });
    */
    if (this.web3Service.enable) {
      this.web3Service.getAccount().then(async (r) => {
        this.account = r;
        this.buttonLabel = r.charAt(0) + '' + r.charAt(1) + '' + r.charAt(2) + '' + r.charAt(4) + r.charAt(5) + '' + r.charAt(6) + '' + '...' + r.charAt(r.length - 4) + '' +  r.charAt(r.length - 3) + '' + r.charAt(r.length - 2) + '' + r.charAt(r.length - 1);
      });
    }
  }

  // tslint:disable-next-line:typedef
  async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (r) => {
      console.log(r);
      if (this.web3Service.account?.length === 0) {
        this.account = undefined;
        this.buttonLabel = 'Connect';
      } else {
        this.account = r;
        this.buttonLabel = r;
      }
    });
  }
}
