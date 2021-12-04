import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Web3Service} from '../../services/web3.service';
import {DevNetworks} from '../../services/Networks';

@Component({
  selector: 'app-service-token-payment-selector',
  templateUrl: './service-token-payment-selector.component.html',
  styleUrls: ['./service-token-payment-selector.component.scss']
})
export class ServiceTokenPaymentSelectorComponent implements OnInit {
  networks: any = DevNetworks;
  currentToken = 0;

  @Input() networkId = 0;
  @Output() selectedTokenAddres = new EventEmitter();
  acceptedPaymentTokens = this.networks[this.networkId].acceptedPaymentTokens;
  constructor(public web3Service: Web3Service) {
    this.acceptedPaymentTokens = this.networks[this.networkId].acceptedPaymentTokens;
    console.log({a: this.acceptedPaymentTokens});
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async OnPaymentTokenSelectChange(changeEvent: MatSelectChange) {
    console.log(changeEvent.value);
    this.selectedTokenAddres.emit(changeEvent.value);
    this.currentToken = changeEvent.value;
    console.log({n: this.acceptedPaymentTokens[changeEvent.value]});
  }
}
