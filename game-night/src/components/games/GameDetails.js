import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid
} from "@mui/material";
import DetailListItem from "./DetailListItem";
import styled from "@emotion/styled";

const createData = (name, data) => {
  return { name, data }
};

const StyledRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& td, & th': {
    border: 0,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function GameDetails({ game }) {
  let MechanicsComps;
  let CategoriesComps;
  let rows;
  if (game) {
    MechanicsComps = 
      game.mechanics.map((m, idx) => (
      <DetailListItem
        key={idx}
        name={m.name}
        lastItem={game.mechanics.length - 1 === idx}
      />
      ));
    CategoriesComps = 
      game.categories.map((c, idx) => (
      <DetailListItem
        key={idx}
        name={c.name}
        lastItem={game.categories.length - 1 === idx}
      />
      ));
    rows = [
      createData('Year Published', game.year_published),
      createData('Publisher', game.primary_publisher.name),
      createData('Mechanics', <Grid container spacing={2} direction={"row"}>{MechanicsComps}</Grid>),
      createData('Categories', <Grid container spacing={2} direction={"row"}>{CategoriesComps}</Grid>)
    ];
  }
  return (
    <>
      <Table>
        <TableBody>
          {
            rows
            ? rows.map((row, idx) => (
              <StyledRow key={idx}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "40ch",
                    color: "primary.text",
                    fontWeight: "bold",
                    fontSize: "1.1rem"
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.text",
                    fontSize: "1.1rem"
                  }}
                >
                  {row.data}
                </TableCell>
              </StyledRow>
            ))
            : null
          }
        </TableBody>
      </Table>
    </>
  );
};