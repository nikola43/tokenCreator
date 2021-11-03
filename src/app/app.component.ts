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

    if (this.web3Service.enable) {
      this.web3Service.getAccount().then(async (account: string) => {
        this.account = account;
        this.buttonLabel = account.charAt(0) + '' + account.charAt(1) + '' +
          account.charAt(2) + '' + account.charAt(4) + account.charAt(5) + '' +
          account.charAt(6) + '' + '...' + account.charAt(account.length - 4) + '' +
          account.charAt(account.length - 3) + '' + account.charAt(account.length - 2) + '' + account.charAt(account.length - 1);
      });
    }

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

    this.web3Service.web3.on('networkChanged', (accounts: string[]) => {
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
  }

  // tslint:disable-next-line:typedef
  async connectWeb3() {
    this.web3Service.enableMetaMaskAccount().then(async (account: string) => {
      console.log(account);
      if (this.web3Service.account?.length === 0) {
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
