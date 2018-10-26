import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from '../container/container.component'
import { SearchComponent } from '../search/search.component'

const movieRoutes: Routes = [{
  path: 'movies',
  children: [
    {
      path: '',
      redirectTo: '/movies/popular',
      pathMatch: 'full'
    },
    {
      path: 'popular',
      component: ContainerComponent,
      data: {
        movieType: 'popular'
      }
    },
    {
      path: 'toprated',
      component: ContainerComponent,
      data: {
        movieType: 'top_rated'
      }
    },
    {
      path: 'watchlist',
      component: ContainerComponent,
      data: {
        movieType: 'watchlist'
      }
    },
    {
      path: 'search',
      component: SearchComponent
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