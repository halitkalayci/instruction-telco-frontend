import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreState } from './store/app.state';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { FilterServicePipe } from './pipes/filter-service.pipe';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OverlayTitleComponent } from './components/overlay-title/overlay-title.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SplitPipe } from './pipes/split.pipe';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { appReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ServiceListComponent,
    CreateFakeArrayPipe,
    SplitPipe,
    LoginComponent,
    HomepageComponent,
    FilterServicePipe,
    NavbarComponent,
    OverlayTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers),
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
