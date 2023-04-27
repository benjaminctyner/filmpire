import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Image, GenreImage } from './styled';
import { Box } from '@mui/system';

function Movie({ movie, i }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      className='movie'
      sx={{ padding: '10px' }}
    >
      <Grow in key={i} timeout={(i + 1) * 150}>
        <Link
          className='links'
          to={`/movie/${movie.id}`}
          sx={{
            alignItems: 'center',
            fontWeight: 'bolder',
            textDecoration: 'none',
            [(theme) => theme.breakpoints.up('xs')]: {
              display: 'flex',
              flexDirection: 'column',
            },
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Image
            alt={movie.title}
            className='image'
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurry.com/200/300'
            }
          />
          <Typography
            className='title'
            variant='h5'
            sx={{
              color: [(theme) => theme.palette.title.primary],
              textOverflow: 'ellipsis',
              width: '230px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginTop: '10px',
              marginBottom: 0,
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average / 2} / 5`}>
            <Box textAlign='center'>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </Box>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}
Grid;

export default Movie;
