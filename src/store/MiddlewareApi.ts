import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const middlewareApi = createApi({
    reducerPath: 'globalApi',
    tagTypes: [],
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({})
});