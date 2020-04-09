import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/shared/transaction';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  ngOnInit(): void {
    this.loadWallets();
  }

  date;
  time = {hour: 13, minute: 30};

  @Input() transaction: Transaction = {} as Transaction;

  wallets: any = [];

  constructor(
    public transactionService: TransactionService,
    public walletService: WalletService,
    public router: Router
  ) { }

  addTransaction() {
    console.log('date' + JSON.stringify(this.date));
    console.log('time' + JSON.stringify(this.time));
    var year = this.date.year;
    var month = this.date.month;
    var day = this.date.day;
    var hours = this.time.hour;
    var minutes = this.time.minute;

    var theDate = new Date(year, month, day, hours, minutes, 0, 0);

    this.transaction.dateTime = theDate;
    this.transaction.checked = false;
    console.log('transaction' + JSON.stringify(this.transaction));
   
    this.transactionService.createTransaction(this.transaction).subscribe((data: {}) => {
      this.router.navigate(['/transaction-list/' + this.transaction.wallet]);
    });
  }

  loadWallets() {
    return this.walletService.getWallets()
      .subscribe((data: {}) => {
        console.log("found " + this.wallets.length + " wallets");
        this.wallets = data;
      });
  }

}
