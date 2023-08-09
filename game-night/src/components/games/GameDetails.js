import React from 'react';
import { Table, TableBody, TableCell, TableRow, Grid } from '@mui/material';
import DetailListItem from './DetailListItem';
import styled from '@emotion/styled';
import ContentContainer from '../common/ContentContainer';

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
  if (game) {
    if (game.mechanics.length) {
      MechanicsComps = game.mechanics.map((m, idx) => (
        <DetailListItem
          key={idx}
          param={'mechanics'}
          item={m}
          lastItem={game.mechanics.length - 1 === idx}
        />
      ));
    }

    if (game.categories.length) {
      CategoriesComps = game.categories.map((c, idx) => (
        <DetailListItem
          key={idx}
          param={'categories'}
          item={c}
          lastItem={game.categories.length - 1 === idx}
        />
      ));
    }

    const year = game.year_published ? game.year_published : 'N/A';
    const publisher = game.primary_publisher
      ? game.primary_publisher.name
      : 'N/A';
    rows = [
      createData('Year Published', year),
      createData('Publisher', publisher),
      createData(
        'Mechanics',
        <Grid
          container
          spacing={2}
          direction={'row'}
        >
          {MechanicsComps}
        </Grid>
      ),
      createData(
        'Categories',
        <Grid
          container
          spacing={2}
          direction={'row'}
        >
          {CategoriesComps}
        </Grid>
      ),
    ];
  }
  return (
    <ContentContainer header='Details'>
      <Table>
        <TableBody>
          {rows
            ? rows.map((row, idx) => (
                <StyledRow key={idx}>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      width: '40ch',
                      color: 'primary.text',
                      fontSize: '1.2rem',
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'primary.text',
                      fontSize: '1.1rem',
                    }}
                  >
                    {row.data}
                  </TableCell>
                </StyledRow>
              ))
            : null}
        </TableBody>
      </Table>
    </ContentContainer>
  );
}
