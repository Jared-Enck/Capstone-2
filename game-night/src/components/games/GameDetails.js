import React from "react";
import {
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
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
  const MechanicsComps = 
    game.mechanics.map((m, idx) => (
    <DetailListItem
      key={idx}
      name={m.name}
      lastItem={game.mechanics.length - 1 === idx}
    />
    ));
  const CategoriesComps = 
    game.categories.map((c, idx) => (
    <DetailListItem
      key={idx}
      name={c.name}
      lastItem={game.categories.length - 1 === idx}
    />
    ));
  const rows = [
    createData('Year Published', game.year_published),
    createData('Publisher', game.primary_publisher.name),
    createData('Mechanics', <Grid container spacing={2} direction={"row"}>{MechanicsComps}</Grid>),
    createData('Categories', <Grid container spacing={2} direction={"row"}>{CategoriesComps}</Grid>)
  ];
  return (
    <ContentContainer>
      <Typography
        variant={"h5"}
        sx={{
          color: "primary.contrastText"
        }}
        gutterBottom
      >
        Details
      </Typography>
      <Divider sx={{marginBottom: ".7rem"}} />
      <Table>
        <TableBody>
          {
            rows.map((row, idx) => (
              <StyledRow key={idx}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "40ch",
                    color: "primary.text",
                    fontWeight: "bold"
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.text"
                  }}
                >
                  {row.data}
                </TableCell>
              </StyledRow>
            ))
          }
        </TableBody>
      </Table>
    </ContentContainer>
  );
};