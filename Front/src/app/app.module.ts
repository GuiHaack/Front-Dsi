import { ProcurardiaAdiantamento } from './pipes/prrocuarar-dia.pipe';
import { ProcurarPessoaNome } from './pipes/procurar-name-financial-people.pipe';
import { Procurardate } from './pipes/procurar-date-financial.pipe';
import { ProcurarProdutoPipe } from './pipes/procurarProduto.pipe';
import { ProcurarFuncionarioPipe } from './pipes/procurar-Funcionario.pipe';
import { ProcurarMovPipe } from './pipes/procurar-mov-type.pipe';
import { ProcurarPessoaPipe } from './pipes/procurar-pessoa.pipe';
import { CompareValidatorsDirective } from './directives/compare-validator.directive';

import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkersComponent } from './workers/workers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProdutosComponent } from './produtos/produtos.component';
import { EntradasComponent } from './entradas/entradas.component';
import { ListasTrabalhadoresComponent } from './listas-trabalhadores/listas-trabalhadores.component';
import { AdiantamentosComponent } from './adiantamentos/adiantamentos.component';
import { ProcurarPessoaListaPipe } from './pipes/procurar-pessoa-lista.pipe';
import { ProcurardateLista } from './pipes/procurar-data-lista.pipe';
import { ProcurardateAdiantamento } from './pipes/procurar-data-adiatamento.pipe';
import { ProcurarPessoaDown } from './pipes/procurar-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkersComponent,
    NavbarComponent,
    CompareValidatorsDirective,
    ProcurarPessoaPipe,
    ProcurarMovPipe,
    ProcurarFuncionarioPipe,
    Procurardate,
    ProdutosComponent,
    EntradasComponent,
    ListasTrabalhadoresComponent,
    AdiantamentosComponent,
    ProcurarProdutoPipe,
    ProcurarPessoaNome,
    ProcurarMovPipe,
    ProcurarPessoaListaPipe,
    ProcurardateLista,
    ProcurardateAdiantamento,
    ProcurardiaAdiantamento,
    ProcurarPessoaDown
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
