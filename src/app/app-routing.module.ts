import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'selector',
  //Carga por Lazy Load (Carga perezosa)
  loadChildren: () => import('./paises/paises.module').then(m => m.PaisesModule)
},
{
  path: '**', redirectTo: 'selector'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
