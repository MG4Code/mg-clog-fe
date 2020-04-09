import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Wallet } from '../shared/wallet'
import { retry, catchError } from 'rxjs/operators';

const WALLET_URL = 'http://localhost:8080/clog/v1/wallet/';
const MY_WALLET_URL = 'http://localhost:8080/clog/v1/wallet/my/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getWallets(): Observable<Wallet> {
    return this.http.get<Wallet>(MY_WALLET_URL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getWallet(id): Observable<Wallet> {
    return this.http.get<Wallet>(MY_WALLET_URL + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateWallet(id, wallet): Observable<Wallet> {
    return this.http.put<Wallet>(MY_WALLET_URL + id, JSON.stringify(wallet), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createWallet(wallet): Observable<Wallet> {
    return this.http.post<Wallet>(MY_WALLET_URL, JSON.stringify(wallet), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteWallet(id) {
    return this.http.delete<Wallet>(MY_WALLET_URL + id, this.httpOptions)
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
