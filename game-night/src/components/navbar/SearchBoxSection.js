import React, { Suspense } from "react";
import {
  Typography,
  Grid,
  Button
} from "@mui/material";
import styled from "@emotion/styled";
import CircularLoading from "../common/CircularLoading";

const SearchBoxButton = styled(Button)(({ theme }) => ({
  borderRadius: '9999px',
  color: theme.palette.primary.text,
  backgroundColor: theme.palette.primary.main,
  height: '1.5rem',
  fontSize: '.7rem',
  padding: '.5rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.contrastText,
  }
}))

export default function SearchBoxSection({
  sectionName,
  items,
  handleClick
}) {
  return (
    <>
      <Typography sx={{
        marginLeft: '.3rem',
        textAlign: 'left',
        color: 'primary.contrastText'
      }}>
        {sectionName}
      </Typography>
      <Grid
        container
        direction={'row'}
        sx={{
          padding: '0.3rem'
        }}
      >
        <Suspense fallback={<CircularLoading size={"1.5rem"} />}>
          {
            items
              ? items.map(i => (
                <Grid key={i.id} item sx={{ marginRight: ".5rem" }}>
                  <SearchBoxButton
                    size="small"
                    onClick={() => handleClick(sectionName.toLowerCase(), i)}
                  >
                    {i.name}
                  </SearchBoxButton>
                </Grid>
              ))
              : null
          }
        </Suspense>
      </Grid>
    </>
  );
};