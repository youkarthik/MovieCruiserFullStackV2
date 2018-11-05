import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationRoutingModule } from './authentication-router.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, AuthenticationRoutingModule, FormsModule, MatFormFieldModule, MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthenticationModule { }
