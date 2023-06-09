import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmbdApiKey = process.env.REACT_APP_TMDB_KEY;

//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmbdApi = createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${tmbdApiKey}`;
      },
    }),
    //* GET movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //*get movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmbdApiKey}`;
        }

        //* Get movies by catagories
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmbdApiKey}`;
        }

        //* get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmbdApiKey}`;
        }

        //default popoular movies
        return `movie/popular?page=${page}&api_key=${tmbdApiKey}`;
      },
    }),
    // GET movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmbdApiKey}`,
    }),
    // GET recommended movies
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmbdApiKey}`,
    }),

    //GET actor info
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmbdApiKey}`,
    }),

    //GET Movies by actor id
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmbdApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} = tmbdApi;
