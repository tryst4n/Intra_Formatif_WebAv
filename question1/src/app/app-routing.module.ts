import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { guardTestGuard } from './guard-test.guard';
import { catloverGuard } from './catlover.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate:[guardTestGuard, catloverGuard]},
  { path: 'dog', component: DogComponent, canActivate:[guardTestGuard]},
  { path: 'home', component: HomeComponent, canActivate:[guardTestGuard]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
