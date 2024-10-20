import { Routes } from "@angular/router";
import { NavbardComponent } from "./components/navbard/navbard.component";


export const globalRoutes: Routes = [
  {
    path:'',
    component: NavbardComponent,
    loadChildren: () => import('./global.module').then(m => m.GlobalModule)
  }
]
