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
import { MovieList } from '..';
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
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMBD';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

///movie/550988 freeguy
//dispatch(selectGenreOrCategory(genre.id))

const MovieInformation = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: '/recommendations',
      movie_id: id,
    });
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;
  const addToFavorites = () => {};
  const addToWatchlist = () => {};

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
      <Grid
        item
        sm={12}
        lg={4}
        sx={{ display: 'flex', marginBottom: '30px', justifyContent: 'center' }}
      >
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
            <LinkGenre
              key={genre.name}
              className='links'
              to='/'
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                [(theme) => theme.breakpoints.down('sm')]: {
                  padding: '0.5rem 1rem',
                },
                textDecoration: 'none',
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
              <Typography variant='subtitle1' sx={{ color: 'textPrimary' }}>
                {genre.name}
              </Typography>
            </LinkGenre>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom sx={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography sx={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ImageCast
                        className='castImage'
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                        sx={{
                          width: '100%',
                          maxWidth: '7em',
                          height: '8em',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                      <Typography color='textPrimary'>
                        {character?.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character?.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container sx={{ marginTop: '2rem' }}>
          <Box
            className='buttonsContainer'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              [(theme) => theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            <Grid
              className='buttonsContainer'
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                [(theme) => theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  target='_blank'
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href='#'
                  endIcon={<Theaters />}
                >
                  TRAILER
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              className='buttonsContainer'
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                [(theme) => theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  {isMovieWatchlisted ? 'Unwatchlist' : 'Watchlist'}
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    component={Link}
                    to='/'
                    variant='subtitle2'
                    sx={{ textDecoration: 'none' }}
                  >
                    BACK
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like:
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found!</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {data?.videos?.results?.length > 0 && (
          <Iframe
            autoPlay
            frameBorder='0'
            title='Trailer'
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
