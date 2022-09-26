import { pokemonApiSlice } from '../modules/Pokemons/slices/pokemonApiSlice';
import pokemonReducer from '../modules/Pokemons/slices/pokemonSlice';

const reducer = {
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
    pokemon: pokemonReducer,
}

export default reducer;