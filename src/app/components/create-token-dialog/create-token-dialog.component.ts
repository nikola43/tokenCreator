import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-create-token-dialog',
  templateUrl: './create-token-dialog.component.html',
  styleUrls: ['./create-token-dialog.component.scss']
})
export class CreateTokenDialogComponent implements OnInit {
  isCreating = false;
  isChecking = false;
  isVerified = false;
  tokenAddedToMetamask = false;
  step: number;
  createButtonLabel: string;
  createdToken: any;
  addToMetamaskButtonLabel: string;

  constructor(public dialogRef: MatDialogRef<CreateTokenDialogComponent>,
    public web3Service: Web3Service,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);

    this.createButtonLabel = data.createButtonLabel;
    this.isCreating = data.isCreating;
    this.isChecking = data.isChecking;
    this.isVerified = data.isVerified;
    this.step = data.step;
    this.createdToken = data.createdToken;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async addTokenToMetamask() {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await this.web3Service.web3.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: this.createdToken.address, // The address that the token is at.
            symbol: this.createdToken.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: this.createdToken.decimals, // The number of decimals in the token
          },
        },
      });

      console.log('Thanks for your interest!');
      this.addToMetamaskButtonLabel = 'Token added to metamask successfully';
      this.tokenAddedToMetamask = true;
    } catch (error) {
      console.log(error);
    }
  }

  
}
