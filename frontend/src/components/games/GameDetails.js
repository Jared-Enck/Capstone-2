import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  useMediaQuery,
} from '@mui/material';
import DetailListItem from './DetailListItem';
import styled from '@emotion/styled';
import ContentContainer from '../common/ContentContainer';
import CircularLoading from '../common/CircularLoading';
import { useTheme } from '@mui/material/styles';

// create data for rows in table
const createData = (name, data = 'N/A') => {
  return { name, data };
};

const StyledRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& td, & th': {
    border: 0,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function GameDetails({ game }) {
  let MechanicsComps;
  let CategoriesComps;
  let rows;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const gridSpacing = isSmallScreen ? 1 : 2;

  if (game) {
    MechanicsComps = game.boardgamemechanic.length
      ? game.boardgamemechanic.map((m, idx) => (
          <DetailListItem
            key={idx}
            // param={'mechanics'}
            isSmallScreen={isSmallScreen}
            item={m}
            isLastItem={game.boardgamemechanic.length - 1 === idx}
          />
        ))
      : 'N/A';

    CategoriesComps = game.boardgamecategory.length
      ? game.boardgamecategory.map((c, idx) => (
          <DetailListItem
            key={idx}
            // param={'categories'}
            isSmallScreen={isSmallScreen}
            item={c}
            isLastItem={game.boardgamecategory.length - 1 === idx}
          />
        ))
      : 'N/A';

    const year = game.yearpublished ? game.yearpublished : 'N/A';
    const publishers = game.publishers.length
      ? game.publishers.join(', ')
      : 'N/A';
    const artists = game.artists ? game.artists.join(', ') : 'N/A';
    const ages = game.age.concat('+');

    rows = [
      createData('Ages', ages),
      createData('Year Published', year),
      createData('Publishers', publishers),
      createData('Artists', artists),
      createData(
        'Mechanics',
        <Grid
          container
          spacing={gridSpacing}
          direction={'row'}
        >
          {MechanicsComps}
        </Grid>
      ),
      createData(
        'Categories',
        <Grid
          container
          spacing={gridSpacing}
          direction={'row'}
        >
          {CategoriesComps}
        </Grid>
      ),
    ];
  }
  return (
    <ContentContainer header='Details'>
      {game ? (
        <Table>
          <TableBody>
            {rows
              ? rows.map((row, idx) => (
                  <StyledRow key={idx}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        color: 'primary.text',
                        fontSize: isSmallScreen ? '1.1rem' : '1.3rem',
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'primary.text',
                        fontSize: isSmallScreen ? '.9rem' : '1.1rem',
                      }}
                    >
                      {row.data}
                    </TableCell>
                  </StyledRow>
                ))
              : null}
          </TableBody>
        </Table>
      ) : (
        <CircularLoading />
      )}
    </ContentContainer>
  );
}
