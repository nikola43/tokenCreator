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
    const res = this.networks.find(x => x.params.chainId == "0x"+("0"+(Number(this.networkId).toString(16))).slice(-2).toUpperCase());
    if (res) this.networkId = res.index;
    
    this.acceptedPaymentTokens = this.networks[this.networkId].acceptedPaymentTokens;

    // this.acceptedPaymentTokens = this.networks[this.networkId].acceptedPaymentTokens;
    // console.log({a: this.networkId});
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async OnPaymentTokenSelectChange(changeEvent: MatSelectChange) {
    const res = this.networks.find(x => x.params.chainId == "0x"+("0"+(Number(this.networkId).toString(16))).slice(-2).toUpperCase());
    if (res) this.networkId = res.index;
    
    console.log({i:this.networkId});
    // this.selectedTokenAddres.emit({...this.networks[this.networkId].acceptedPaymentTokens[changeEvent.value], id:changeEvent.value});
    // this.currentToken = changeEvent.value;
  }
}
