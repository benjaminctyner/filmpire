import React from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
  Link,
} from '@mui/material';
import { ImagePoster, ImageGenre } from './styled';
import genreIcons from '../../assets/genres';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMBD';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  console.log(data);
  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong! Go Back!</Link>
      </Box>
    );
  }
  return (
    <Grid
      container
      className='containerSpaceArround'
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [(theme) => theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          flexWrap: 'wrap',
        },
      }}
    >
      <Grid item sm={12} lg={4}>
        <ImagePoster
          className='poster'
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          sx={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
            width: '80%',
            [(theme) => theme.breakpoints.down('sm')]: {
              margin: '0 auto',
              width: '100%',
              height: '350px',
              marginBottom: '30px',
            },
            [(theme) => theme.breakpoints.down('md')]: {
              margin: '0 auto',
              width: '50%',
              height: '350px',
            },
          }}
        />
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title + ' '}({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center'>
          {data?.tagline}
        </Typography>
        <Grid
          item
          className='containerSpaceAround'
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px 0 !important',
            [(theme) => theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              flexWrap: 'wrap',
            },
          }}
        >
          <Box display='flex' align='center'>
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant='subtitle1'
              sx={{
                marginLeft: '10px',
              }}
            >
              {(data?.vote_average / 2).toFixed(2)}
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid
          item
          className='genresContainer'
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'warp',
          }}
        >
          {data?.genres.map((genre, i) => (
            <Link
              key={genre.name}
              className='links'
              to='/'
              onClick={() => {}}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                [(theme) => theme.breakpoints.down('sm')]: {
                  padding: '0.5rem 1rem',
                },
              }}
            >
              <ImageGenre
                src={genreIcons[genre.name.toLowerCase()]}
                className='genreImages'
                sx={{
                  color: [
                    (theme) => {
                      theme.palette.mode === 'dark' ? 'dark' : 'invert(1)';
                    },
                  ],
                  marginRight: '10px',

                  textDecoration: 'none',
                  height: '30px',
                }}
              />
              <Typography variant='subtitle1' color='textPrimary'>
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
