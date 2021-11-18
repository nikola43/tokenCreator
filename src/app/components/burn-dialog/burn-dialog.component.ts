import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Web3Service} from '../../services/web3.service';

@Component({
  selector: 'app-burn-dialog',
  templateUrl: './burn-dialog.component.html',
  styleUrls: ['./burn-dialog.component.scss']
})
export class BurnDialogComponent implements OnInit {
  isLoading = false;
  tokenAddress: string;
  amount: number;

  constructor(
    public web3Service: Web3Service,
    public dialogRef: MatDialogRef<BurnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);

    this.tokenAddress = data.tokenAddress;
    this.amount = data.amount;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

  burn(): void {
    this.isLoading = true;
    this.web3Service.burnTokens(this.tokenAddress, this.amount).then((r) => {
      console.log(r);
      this.isLoading = false;
      this.dialogRef.close(true);
    }).catch((err) => {
      console.log(err);
      this.isLoading = false;
    });
  }
}
