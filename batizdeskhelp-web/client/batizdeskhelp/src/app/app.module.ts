import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

//material
import { MatFormFieldModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import { StepperComponent } from './stepper/stepper.component';
import { HomeComponent} from './home/home.component';
import { MenubarComponent } from './menu-bar/menu-bar.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicatorComponent } from './publicator/publicator.component';
import { Page404Component } from './404/404.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: '**', component: Page404Component},
];
@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    HomeComponent,
    MenubarComponent,
    PublicationComponent,
    PublicatorComponent,
    Page404Component,
    LoginComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
