import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { OperationComponent } from './operation/operation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyNewComponentComponent,
    HelloWorldComponent,
    RegisterComponent,
    HomeComponent,
    OperationComponent,
    WithdrawComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    HttpClientModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
