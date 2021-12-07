import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-create-token-dialog',
  templateUrl: './create-token-dialog.component.html',
  styleUrls: ['./create-token-dialog.component.scss']
})
export class CreateTokenDialogComponent implements OnInit {
  tokenAddedToMetamask = false;
  addToMetamaskButtonLabel: string = '';

  constructor(public dialogRef: MatDialogRef<CreateTokenDialogComponent>,
    public web3Service: Web3Service,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
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
            address: this.data.createdToken.address, // The address that the token is at.
            symbol: this.data.createdToken.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: this.data.decimals, // The number of decimals in the token
          },
        },
      });

      this.addToMetamaskButtonLabel = 'Token added to metamask successfully';
      this.tokenAddedToMetamask = true;
    } catch (error) {
      console.log(error);
    }
  }
  
}
