import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//location
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
//plugin
import { ChartsModule } from 'ng2-charts';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CountUpModule } from 'ngx-countup';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

//service
import { API } from './services/api';
import { AccountService } from './services/account.service';
//componet
import { AppComponent } from './app.component';
import { PostComponent } from './admin/post/post.component';
import { LoginComponent } from './admin/login/login.component';
import { CovidComponent } from './home/covid/covid.component';
import { HeaderComponent } from './admin/layout/header/header.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
import { MainComponent } from './admin/layout/main/main.component';
import { HomeFooterComponent } from './home/layout/home-footer/home-footer.component';
import { HomeHeaderComponent } from './home/layout/home-header/home-header.component';
import { HomeMainComponent } from './home/layout/home-main/home-main.component';
import { TintucComponent } from './home/tintuc/tintuc.component';
import { TinhHinhComponent } from './home/tinh-hinh/tinh-hinh.component';
import { PrecautionsComponent } from './home/precautions/precautions.component';
import { SymptomsComponent } from './home/symptoms/symptoms.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    CovidComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeMainComponent,
    TintucComponent,
    TinhHinhComponent,
    PrecautionsComponent,
    SymptomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    EditorModule,
    CountUpModule,
    AutocompleteLibModule
  ],
  providers: [
    API,
    AccountService,
    { provide: LOCALE_ID, useValue: 'vi-VN'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
