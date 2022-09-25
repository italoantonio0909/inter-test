import { pokemonApiSlice } from '../modules/slices/pokemonApiSlice';
import pokemonReducer from '../modules/slices/pokemonSlice';

const reducer = {
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
    pokemon: pokemonReducer,
}

export default reducer;