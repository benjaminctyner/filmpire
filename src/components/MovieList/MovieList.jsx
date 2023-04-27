import React from 'react';
import { Grid } from '@mui/material';
import styled from './styled';
import Movie from '../Movie/Movie';

function MovieList({ movies, numberOfMovies }) {
  return (
    <Grid
      container
      className='moviesContainer'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        [(theme) => theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
        },
      }}
    >
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
