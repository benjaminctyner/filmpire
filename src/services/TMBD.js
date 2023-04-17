import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmbdApiKey = process.env.REACT_APP_TMBD_KEY;
const page = 1;

//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmbdApi = createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* GET movies by [Type]
    getMovies: builder.query({
      query: () => {
        return `movie/popular?page=${page}&api_key=${tmbdApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmbdApi;
