import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu';
import { StocksComponent } from './stocks/stocks.component';
import { StocksService } from './stocks.service';
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,HomeComponent, RegisterComponent,StocksComponent, SalesComponent, LoginComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,AppRoutingModule, FormsModule, MatIconModule,MatMenuModule
  ],
  providers: [StocksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
