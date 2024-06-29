import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { VentaComponent } from './venta/venta.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes=[
  {path:'clientes', component: ClientesComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'productos',component:ProductosComponent,canActivate:[AuthGuard]},
  {path:'ventas',component:VentaComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'',component:LoginComponent},
  {path:'',component:LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
