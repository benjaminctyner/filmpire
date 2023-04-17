import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Sidebar } from '..';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  return (
    <div>
      <AppBar>
        <Toolbar
          className='toolbar'
          sx={{
            height: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '240px',
            [(theme) => theme.breakpoints.down('sm')]: {
              marginLeft: 0,
              flexWrap: 'wrap',
            },
          }}
        >
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className='menuButton'
              sx={{
                marginRight: (theme) => theme.spacing(2),
                [(theme) => theme.breakpoints.up('sm')]: {
                  display: 'hide',
                },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            className='brightnessButton'
            color='inherit'
            sx={{ ml: 1 }}
            onClick={() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={'/profile/:id'}
                className='linkbutton'
                onClick={() => {}}
                sx={{
                  '&:hover': {
                    color: 'white !important',
                    textDecoration: 'none',
                  },
                }}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt='profile'
                  src='https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
                />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <nav className='drawer'>
          {isMobile ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={mobileOpen}
              className='drawerBackground'
              classes={{ paper: { width: '240px' } }}
              ModalProps={{ keepMounted: true }}
              sx={{
                [(theme) => theme.breakpoints.up('sm')]: {
                  width: '240px',
                  flexShrink: 0,
                },
              }}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: { width: '240px' } }}
              variant='permanent'
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
