import React from 'react';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
// import { alpha } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Actors, MovieInformation, Movies, NavBar, Profile } from './';
// import useStyles from './styles';

const App = () => {
  return (
    <Router>
      <Box
        className='root'
        sx={{
          display: 'flex',
          height: '100%',
        }}
      >
        <CssBaseline />
        <NavBar />
        <Box
          className='content'
          sx={{
            flexGrow: 1,
            padding: '2em',
          }}
        >
          <Box
            className='toolbar'
            sx={{
              height: '70px',
            }}
          />
          <Routes>
            <Route exact path='/movie/:id' element={<MovieInformation />} />
            <Route exact path='/actors/:id' element={<Actors />} />
            <Route exact path='/' element={<Movies />} />
            <Route exact path='/profile/:id' element={<Profile />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
