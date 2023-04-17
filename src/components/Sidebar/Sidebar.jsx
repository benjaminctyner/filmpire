import React, { useEffect } from 'react';
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
// import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Image, GenreImage } from './styled';

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

// const demoCategories = ['Comedy', 'Action', 'Horror', 'Animation'];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
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
          <Link key={value} className='links' to='/'>
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <GenreImage
                  src={redLogo}
                  className='genreImages'
                  sx={{
                    color: [
                      (theme) => {
                        theme.palette.mode === 'dark' ? 'dark' : 'invert(1)';
                      },
                    ],
                    textDecoration: 'none',
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className='links' to='/'>
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <GenreImage
                  src={redLogo}
                  className='genreImages'
                  sx={{
                    color: [
                      (theme) => {
                        theme.palette.mode === 'dark' ? 'dark' : 'invert(1)';
                      },
                    ],
                    textDecoration: 'none',
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
