import React from 'react';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Button
        onClick={handlePrev}
        variant='contained'
        color='primary'
        type='button'
        sx={{ margin: '30px 2px' }}
      >
        Prev
      </Button>
      <Typography
        variant='h4'
        sx={{
          margin: '0 20px !important',
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        variant='contained'
        color='primary'
        type='button'
        sx={{ margin: '30px 2px' }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
