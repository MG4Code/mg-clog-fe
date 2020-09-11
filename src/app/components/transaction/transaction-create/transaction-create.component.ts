import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/shared/transaction';
import { WalletService } from 'src/app/services/wallet.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  currentDate = new Date();

  date: NgbDateStruct = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() };
  time: NgbTimeStruct = { hour: this.currentDate.getHours(), minute: this.currentDate.getMinutes(), second: 0 };

  ngOnInit(): void {
    this.loadWallets();
  }

  @Input() transaction: Transaction = {} as Transaction;

  wallets: any = [];
  selectedWallet : any;

  constructor(
    public transactionService: TransactionService,
    public walletService: WalletService,
    public router: Router
  ) {

  }

  addTransaction() {
    var year = this.date.year;
    var month = this.date.month - 1;
    var day = this.date.day;
    var hours = this.time.hour;
    var minutes = this.time.minute;

    var theDate = new Date(year, month, day, hours, minutes, 0, 0);

    this.transaction.wallet = this.selectedWallet;
    this.transaction.amount = this.transaction.amount * 100;
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
        this.wallets = data;
        console.log("found " + this.wallets.length + " wallet(s)");
        this.selectedWallet = this.wallets[0].id;
      });
  }

}
