import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DetailmaterialComponent } from './Material/detailmaterial/detailmaterial.component';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import { HomeComponent } from './home/home.component';
import { OperationComponent } from './operation/operation.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {path:'',title:'login',component:LoginComponent},  {path:'register',title:'register',component:RegisterComponent}
  ,{path:'home',title:'Home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
