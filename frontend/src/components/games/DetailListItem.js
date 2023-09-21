import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import { Link } from '@mui/material';
import { Typography, Grid } from '@mui/material';

export default function DetailListItem({ param, item, isLastItem }) {
  const { setSearchResults, setResultsHeader, resultsHeader } =
    useContext(DataContext);
  const { navigate } = useContext(UserContext);

  // handle list item click
  const handleClick = () => {
    if (resultsHeader !== item._text) {
      // clear previous results
      setSearchResults({ pages: {} });
      setResultsHeader('');
    }
    navigate(`/search/${param}/${item.objectid}`);
  };
  return (
    <Grid item>
      {/* <Link
        onClick={handleClick}
        variant='subtitle1'
        sx={{
          textDecoration: 'none',
          cursor: 'pointer',
        }}
        aria-label={`search ${param} ${item.value}`}
      > */}
      <Typography
        sx={{
          color: 'primary.text',
          // transition: 'all 250ms',
          // '&:hover': {
          //   color: 'secondary.main',
          // },
        }}
      >
        {isLastItem ? item._text : item._text + ','}
      </Typography>
      {/* </Link> */}
    </Grid>
  );
}
