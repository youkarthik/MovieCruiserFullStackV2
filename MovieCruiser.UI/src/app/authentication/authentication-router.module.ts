import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LoginLayoutComponent } from "../_layouts/login-layout.component";

//routes configuration related to authenctication
const authRoutes: Routes = [
    {
        path:'',
        component: LoginLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(authRoutes)
    ],
    exports: [RouterModule]
})

export class AuthenticationRoutingModule{}