import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,HomeComponent, RegisterComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,AppRoutingModule, FormsModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }