import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { StocksComponent } from './stocks/stocks.component';
import { StocksService } from './stocks.service';
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './nav/nav.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserComponent } from './user/user.component';
import { UsernavComponent } from './usernav/usernav.component';
import { MatDialogModule } from '@angular/material/dialog';

import { CreateuserComponent } from './createuser/createuser.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,HomeComponent, RegisterComponent,StocksComponent, SalesComponent, NavComponent,CartComponent, WishlistComponent, UserComponent, UsernavComponent, CreateuserComponent, LoginComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,HttpClientModule,AppRoutingModule, FormsModule, MatIconModule,MatMenuModule,MatCardModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatDialogModule,MatSelectModule
  ],
  providers: [StocksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
