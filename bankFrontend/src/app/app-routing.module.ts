import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo:"login", pathMatch:'full'},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  { path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/addUser',
    component: EditUserComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/edit-user/:id',
    component: EditUserComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/userList',
    component: UserDetailComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
