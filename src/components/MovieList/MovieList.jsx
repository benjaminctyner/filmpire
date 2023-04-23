import React from 'react';
import { Grid } from '@mui/material';
import styled from './styled';
import Movie from '../Movie/Movie';

function MovieList({ movies }) {
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
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
