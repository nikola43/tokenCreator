import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Web3Service} from '../../services/web3.service';
import {ProdNetworks} from '../../services/Networks';
import { NotificationUtils, SnackBarColorEnum } from 'src/utils/NotificationUtil';

@Component({
  selector: 'app-network-selector',
  templateUrl: './network-selector.component.html',
  styleUrls: ['./network-selector.component.scss']
})
export class NetworkSelectorComponent implements OnInit {
  networks: any = ProdNetworks;
  currentNetwork = 0;
  lastCurrentNetwork = 0;
  @Output() selectedNetwork = new EventEmitter();
  constructor(public web3Service: Web3Service, private notificationUtils: NotificationUtils) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async networkSelectChange(changeEvent: MatSelectChange) {
    //this.notificationUtils.showSnackBar('Currently it only works in the BSC. The other networks will be soon.', SnackBarColorEnum.Red);
    try {
      const changeNetworkResult = await this.web3Service.web3.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: this.networks[changeEvent.value].params.chainId}],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          const addNetworkResult =  await this.web3Service.web3.request({
            method: 'wallet_addEthereumChain',
            params: [this.networks[changeEvent.value].params],
          });
        } catch (addError) {
          // handle "add" error
          this.currentNetwork = this.lastCurrentNetwork;
          return false;
        }
      }
      // rejected
      if (switchError.code === 4001) {
      }
      this.currentNetwork = this.lastCurrentNetwork;
      // this.currentNetwork = changeEvent.value;
      return false;
    }
    this.lastCurrentNetwork = this.currentNetwork;
    this.selectedNetwork.emit(this.currentNetwork);
  }
}
