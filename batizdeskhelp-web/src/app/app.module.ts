import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
//material
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//Covalent
import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentExpansionPanelModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';

import { StepperComponent } from './stepper/stepper.component';
import { HomeComponent} from './home/home.component';
import { MenubarComponent } from './menu-bar/menu-bar.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicatorComponent } from './publicator/publicator.component';
import { Page404Component } from './404/404.component';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './init.component';
import { PublicationContainerComponent } from './publicaton-container/publication-container.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { AreaComponent } from './area/area.component';
import { UserComponent } from './user/user.component';
import { ProblemComponent } from './problem/problem.component';
import { ProblemContainerComponent} from './problem-container/problem-container.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { AuthGuard } from './guard/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { AreaService } from './services/area.service';
import { EmitterService } from './services/emmiter.service';
import { PublishProblemService } from './services/publishProblem.service';
import { StatusService } from './services/status.service';
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';


const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
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
    LoginComponent,
    InitComponent,
    PublicationContainerComponent,
    SearchComponent,
    SettingsComponent,
    AreaComponent,
    UserComponent,
    ProblemComponent,
    ProblemContainerComponent,
    ConfigurationComponent
  ],
  imports: [
    //Covalent
    CovalentLayoutModule,
    CovalentStepsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentSearchModule,
    CovalentExpansionPanelModule,
    CovalentMessageModule,
    CovalentDataTableModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard, 
    AuthenticationService, 
    AreaService, 
    EmitterService, 
    PublishProblemService, 
    HttpModule, 
    StatusService,
    ConfigService,
    UserService
  ],
  bootstrap: [InitComponent]
})
export class AppModule { }
