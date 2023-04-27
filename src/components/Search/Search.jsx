import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  InputBase,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const SearchField = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'light' && 'black',
    filter: theme.palette.mode === 'light' && 'invert(1)',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
    // borderRadius: 4,
    // position: 'relative',
    // backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    // border: '1px solid #ced4da',
    // fontSize: 16,
    // width: 'auto',
    // padding: '10px 12px',
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    // // Use the system font instead of the default Roboto font.
    // '&:focus': {
    //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    //   borderColor: theme.palette.primary.main,
    // },
  },
}));

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('here,', query);
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <Box
      sx={{
        [(theme) => theme.breakpoints.down('sm')]: {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        },
      }}
    >
      <SearchField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant='standard'
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default Search;
