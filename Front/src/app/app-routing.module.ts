import { AdiantamentosComponent } from './adiantamentos/adiantamentos.component';
import { EntradasComponent } from './entradas/entradas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ListasTrabalhadoresComponent } from './listas-trabalhadores/listas-trabalhadores.component';
import { WorkersComponent } from './workers/workers.component';
import { AuthGuard } from './login/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'login' ,pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  
  { path: 'admin', component: NavbarComponent, canActivate:[AuthGuard], children:[
  { path: '', component: WorkersComponent },
  { path: 'workers', component: WorkersComponent},
  { path: 'down', component: AdiantamentosComponent},
  { path: 'entradas', component: EntradasComponent},
  { path: 'produtos', component: ProdutosComponent},
  { path: 'listas', component: ListasTrabalhadoresComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
