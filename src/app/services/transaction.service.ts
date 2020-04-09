import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Transaction } from '../shared/transaction'
import { retry, catchError } from 'rxjs/operators';

const TRANSACTION_URL = 'http://localhost:8080/clog/v1/transaction/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getTransactions(): Observable<Transaction> {
    return this.http.get<Transaction>(TRANSACTION_URL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(TRANSACTION_URL + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTransactionsForWallet(walletId): Observable<Transaction> {
    return this.http.get<Transaction>(TRANSACTION_URL + 'wallet/' + walletId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createTransaction(transaction): Observable<Transaction> {
    return this.http.post<Transaction>(TRANSACTION_URL, JSON.stringify(transaction), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  checkTransaction(id): Observable<Transaction> {
    return this.http.get<Transaction>(TRANSACTION_URL + id + '/check')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  uncheckTransaction(id): Observable<Transaction> {
    return this.http.get<Transaction>(TRANSACTION_URL + id + '/uncheck')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling TODO generalization
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
