import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/shared/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  walletId = this.actRoute.snapshot.params.walletId;

  constructor(
    public transactionService: TransactionService,
    public actRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    return this.transactionService.getTransactionsForWallet(this.walletId).subscribe((data)=> {
      this.transactions = data
    });
  }

}
