import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const Image = styled('img')({
  borderRadius: '20px',
  height: '300px',
  marginBottom: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

export const GenreImage = styled('img')({});
export const LinkMovie = styled(Link)({
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
});
