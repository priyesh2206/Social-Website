import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { AuthRouterModule} from './auth-router-module';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRouterModule,
    ParticlesModule
  ]
})
export class AuthModule {

}
