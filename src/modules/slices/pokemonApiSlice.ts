import { mainApi } from "../../axios/axiosConfig";
import { middlewareApi } from "../../store/MiddlewareApi";
import { PokemonResponse } from "../interfaces/PokemonResponse";

export const pokemonApiSlice = middlewareApi.injectEndpoints({
    endpoints: (builder) => ({
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
    usePokemonSearchBynameQuery
} = pokemonApiSlice