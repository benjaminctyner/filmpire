import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Image, GenreImage, LinkGenre } from './styled';
import { useGetGenresQuery } from '../../services/TMBD';
import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link
        to='/'
        className='imageLink'
        sx={{ display: 'flex', justifyContent: 'center', padding: '10% 0' }}
      >
        <Image
          className='image'
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt='filmpire logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <LinkGenre
            key={value}
            className='links'
            to='/'
            sx={{ textDecoration: 'none' }}
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <GenreImage
                  src={genreIcons[label.toLowerCase()]}
                  className='genreImages'
                  sx={{
                    color: [
                      (theme) => {
                        theme.palette.mode === 'dark' ? 'dark' : 'invert(1)';
                      },
                    ],
                    textDecoration: 'none',
                    height: '30px',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </LinkGenre>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <LinkGenre key={name} className='links' to='/'>
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <GenreImage
                    src={genreIcons[name.toLowerCase()]}
                    className='genreImages'
                    sx={{
                      color: [
                        (theme) => {
                          theme.palette.mode === 'dark' ? 'dark' : 'invert(1)';
                        },
                      ],
                      textDecoration: 'none',
                      height: '30px',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </LinkGenre>
          ))
        )}
      </List>
    </>
  );
}

export default Sidebar;
