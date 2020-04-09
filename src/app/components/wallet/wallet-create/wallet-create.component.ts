import { Component, OnInit, Input } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/shared/wallet';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  @Input() wallet: Wallet = {} as Wallet;

  constructor(
    public walletService: WalletService,
    public router: Router
  ) { }

  ngOnInit() { }

  addWallet() {
    this.walletService.createWallet(this.wallet).subscribe((data: {}) => {
      this.router.navigate(['/wallet-list']);
    });
  }

}

