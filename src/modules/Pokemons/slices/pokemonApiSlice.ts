import { PokemonResponse } from "../interfaces/PokemonResponse";
import { PokemonListPaginate } from '../interfaces/PokemonListPaginate';
import { middlewareApi } from '../../../store/MiddlewareApi';
import { mainApi } from "../../../axios/axiosConfig";

export const pokemonApiSlice = middlewareApi.injectEndpoints({
    endpoints: (builder) => ({
        pokemonListPaginate: builder.query<PokemonListPaginate, { limit: number, offset: number }>({
            queryFn: async ({ limit, offset }, { dispatch }) => {
                try {
                    const { data } = await mainApi.get<PokemonListPaginate>(`/pokemon?offset=${offset.toString()}&limit=${limit.toString()}`);
                    return { data };
                } catch (error: any) {
                    return { error }

                }
            }
        }),

        pokemonSearchByname: builder.query<PokemonResponse, { name: string }>({
            queryFn: async ({ name }, { dispatch }) => {
                try {
                    const { data } = await mainApi.get<PokemonResponse>(`/pokemon/${name}?limit=5`);

                    return { data };
                } catch (error: any) {
                    return { error }
                }
            }
        }),
    }),
});

export const {
    usePokemonListPaginateQuery,
    usePokemonSearchBynameQuery
} = pokemonApiSlice