import { Component, OnInit, Input } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  @Input() wallet = {
    name: '',
    number: ''
  };

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

