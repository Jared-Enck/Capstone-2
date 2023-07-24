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
import ContentContainer from "../common/ContentContainer";

const createData = (name, data = "N/A") => {
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
    if (game.mechanics.length) {
      MechanicsComps =
        game.mechanics.map((m, idx) => (
          <DetailListItem
            key={idx}
            name={m.name}
            lastItem={game.mechanics.length - 1 === idx}
          />
        ));
    } else {
      MechanicsComps = <DetailListItem name={"N/A"} lastItem={true} />
    }
    if (game.categories.length) {
      CategoriesComps =
        game.categories.map((c, idx) => (
          <DetailListItem
            key={idx}
            name={c.name}
            lastItem={game.categories.length - 1 === idx}
          />
        ));
    } else {
      CategoriesComps = <DetailListItem name={"N/A"} lastItem={true} />
    }
    const year = game.year_published ? game.year_published : "N/A";
    const publisher = game.primary_publisher ? game.primary_publisher.name : "N/A";
    rows = [
      createData('Year Published', year),
      createData('Publisher', publisher),
      createData('Mechanics', <Grid container spacing={2} direction={"row"}>{MechanicsComps}</Grid>),
      createData('Categories', <Grid container spacing={2} direction={"row"}>{CategoriesComps}</Grid>)
    ];
  }
  return (
    <ContentContainer header="Details" divider>
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
    </ContentContainer>
  );
};