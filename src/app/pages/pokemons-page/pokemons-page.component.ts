import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal} from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css'
})
export default class PokemonsPageComponent implements OnInit {

  // private appRef = inject(ApplicationRef);
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') || '1' ),
      map( page => ( isNaN( +page ) ? 1 : +page )),
      map( page => Math.max( 1, page ))
    )
  );


  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log('isStable', isStable);
  // });

  ngOnInit(): void {

    // this.route.queryParamMap.subscribe( params => console.log(params.get('page')) );    
    this.loadPokemons();

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  // IF subscribe I need to unsubscribe
  // ngOnDestroy(): void {
  //   console.log('Destroy');
  //   this.$appState.unsubscribe();
  // }

  public loadPokemons( page = 0 ) {

    this.isLoading.set(true);

    const pageToLoad = this.currentPage()! + page;    

    this.pokemonService.loadPage( pageToLoad )
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad }})),
        tap( () => this.title.setTitle(`Pokemons SSR - Page ${ pageToLoad }`)),
      )
      .subscribe( pokemons => {
        this.pokemons.set( pokemons );
      })

    this.isLoading.set(false);
  }

}
