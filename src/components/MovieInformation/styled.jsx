import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const ImagePoster = styled('img')({});

export const ImageGenre = styled('img')({});

export const ImageCast = styled('img')({});

export const LinkGenre = styled(Link)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [(theme) => theme.breakpoints.down('sm')]: {
    padding: '0.5rem 1rem',
  },
  textDecoration: 'none',
});

export const Iframe = styled('iframe')({
  width: '50%',
  height: '50%',
  alignItems: 'center',
  [(theme) => theme.breakpoints.down('sm')]: {
    width: '90%',
    height: '90%',
  },
});
