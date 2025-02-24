import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/single-pokemon-api.response';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export default class PokemonPageComponent implements OnInit {
  
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta)

  public pokemon = signal<Pokemon | null>(null)
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( !id ) return;

    this.pokemonService.loadPokemon(id)
    .pipe(
      tap( ({ name, id }) => {

        const pageTitle = `#${ id } - ${ name }`
        const pageDescription = `Página de ${ name }`
        const pageImage =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`

        
        this.title.setTitle( pageTitle );

        this.meta.updateTag({ name: 'description', content: pageDescription });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: pageDescription });
        this.meta.updateTag({ name: 'og:image', content:  pageImage});

      })
    )
    .subscribe(pokemon => this.pokemon.set(pokemon))
  }

}
