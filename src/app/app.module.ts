import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { WalletListComponent } from './components/wallet/wallet-list/wallet-list.component';
import { WalletEditComponent } from './components/wallet/wallet-edit/wallet-edit.component';
import { WalletCreateComponent } from './components/wallet/wallet-create/wallet-create.component';
import { TransactionListComponent } from './components/transaction/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './components/transaction/transaction-create/transaction-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guards/auth-guard';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WalletListComponent,
    WalletEditComponent,
    WalletCreateComponent,
    TransactionListComponent,
    TransactionCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
