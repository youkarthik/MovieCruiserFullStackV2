import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from '../container/container.component'
import { SearchComponent } from '../search/search.component'
import { AuthGuardService } from 'src/app/authguard.service';

const movieRoutes: Routes = [{
  path: 'movies',
  children: [
    {
      path: '',
      redirectTo: '/movies/popular',
      pathMatch: 'full',
      canActivate: [AuthGuardService]
    },
    {
      path: 'popular',
      component: ContainerComponent,
      data: {
        movieType: 'popular',
      }
    },
    {
      path: 'toprated',
      component: ContainerComponent,
      data: {
        movieType: 'top_rated'
      },
      canActivate: [AuthGuardService]
    },
    {
      path: 'watchlist',
      component: ContainerComponent,
      data: {
        movieType: 'watchlist'
      },
      canActivate: [AuthGuardService]
    },
    {
      path: 'search',
      component: SearchComponent,
      canActivate: [AuthGuardService]
    }


  ]
}]

@NgModule({
  imports: [
    RouterModule.forChild(movieRoutes)
  ],
  declarations: []
})
export class MovieRouterModule { }