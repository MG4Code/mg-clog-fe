import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {

  wallets: any = [];

  constructor(public walletService: WalletService) { }

  ngOnInit(): void {
    this.loadWallets();
  }

  loadWallets() {
    return this.walletService.getWallets().subscribe((data: {}) => {
      this.wallets = data;
    });
  }

  

  deleteWallet(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.walletService.deleteWallet(id).subscribe(data => {
        this.loadWallets();
      });
    }
  }

}
