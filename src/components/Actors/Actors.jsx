import React, { useState } from 'react';
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
} from '@mui/material';
import {
  ImagePoster,
  ImageGenre,
  ImageCast,
  LinkGenre,
  Iframe,
} from './styled';
import { MovieList, Pagination } from '..';

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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMBD';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

//use params actor id
//make a new actor redux toolkit query get actor detials, get api docs
//usegetActor hook
///movie/550988 freeguy
//dispatch(selectGenreOrCategory(genre.id))

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate.goBack()}
          color='primary'
        >
          Go back
        </Button>
      </Box>
    );
  }

  console.log(data);
  return (
    <>
      <Grid className='containerSpaceAround' container spacing={3}>
        <Grid className='containerPoster' item lg={5} xl={4}>
          <ImagePoster
            className='poster'
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
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
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h2' gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='justify' paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button
              variant='contained'
              color='primary'
              target='_blank'
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate.goBack()}
              color='primary'
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
