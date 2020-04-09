import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';
import { Wallet } from 'src/app/shared/wallet';

@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {

  id = this.actRoute.snapshot.params.id;
  wallet: Wallet = {} as Wallet;

  constructor(
    public walletService: WalletService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.walletService.getWallet(this.id).subscribe((w: Wallet) => {
      this.wallet = w;
    });
  }

  updateWallet() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.walletService.updateWallet(this.id, this.wallet).subscribe(data => {
        this.router.navigate(['/wallet-list']);
      });
    }
  }


}
