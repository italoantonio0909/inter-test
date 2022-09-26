import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonListSelected } from '../interfaces/PokemonListSelected';

interface State {
    pokemonListSelected: Array<PokemonListSelected>,
}

const initialState: State = {
    pokemonListSelected: [],
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        pokemonAddList: (state, action: PayloadAction<PokemonListSelected>) => {
            const ids = state.pokemonListSelected.map((e) => e.order);
            if (!(ids.includes(action.payload.order))) {
                state.pokemonListSelected = state.pokemonListSelected.concat(action.payload);
            }
        },
        pokemonUpdateList: (state, action: PayloadAction<Array<PokemonListSelected>>) => {
            state.pokemonListSelected = action.payload
        }
    },
});


export const { pokemonAddList, pokemonUpdateList } = pokemonSlice.actions;

export default pokemonSlice.reducer;