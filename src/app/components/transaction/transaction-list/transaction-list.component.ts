import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/shared/transaction';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

const PAGE_SIZE: number = 3;

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  walletId = this.actRoute.snapshot.params.walletId;
  hasMore: boolean = false;
  pageCount: number = 0;


  constructor(
    public transactionService: TransactionService,
    public userService: UserService,
    public actRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    return this.transactionService.getTransactionsForWallet(this.walletId, this.pageCount*PAGE_SIZE, PAGE_SIZE+1)
    .subscribe((data)=> {
      console.log('query for skip = '+ (this.pageCount*PAGE_SIZE) + " and limit " + (PAGE_SIZE+1) + " got " + data.length) ;

      if (data.length === (PAGE_SIZE+1)) {
        this.hasMore = true;
        data.pop();
      } else {
        this.hasMore = false;
      }
      data.forEach(t => t.amount = t.amount/100)
      this.transactions = this.transactions.concat(data);
    });
  }

  loadMore() {
    this.pageCount+=1;
    this.loadTransactions();
  }

  loadUser(transaction: Transaction) {
    this.userService.getUser(transaction.owner)
    .subscribe((user)=> {
      console.log("USER = " + JSON.stringify(user));
      this.transactions.forEach(t => {
        console.log("Compare " + t.owner + " with " + transaction.owner);
        if (t.owner == transaction.owner) {
          
          t.owner = user.username
        }
      })
    });
  }

  changedChecked(id: string, checked: boolean) {
    console.log("changed " + id + " to " + checked);
    if (checked) {
      this.transactionService.checkTransaction(id).subscribe(data => {});
    } else {
      this.transactionService.uncheckTransaction(id).subscribe(data => {});
    }
  }

}
