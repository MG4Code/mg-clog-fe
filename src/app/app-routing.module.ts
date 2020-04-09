import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WalletListComponent } from './components/wallet/wallet-list/wallet-list.component';
import { WalletCreateComponent } from './components/wallet/wallet-create/wallet-create.component';
import { WalletEditComponent } from './components/wallet/wallet-edit/wallet-edit.component';
import { TransactionListComponent } from './components/transaction/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './components/transaction/transaction-create/transaction-create.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'wallet-list', component: WalletListComponent },
  { path: 'wallet-create', component: WalletCreateComponent },
  { path: 'wallet-edit/:id', component: WalletEditComponent },
  { path: 'transaction-list/:walletId', component: TransactionListComponent },
  { path: 'transaction-create', component: TransactionCreateComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: 'transaction-create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
