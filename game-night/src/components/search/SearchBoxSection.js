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
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  height: '1rem',
  fontSize: '.7rem'
}))

export default function SearchBoxSection({
  sectionName = null,
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
          padding: '0.3rem',
          maxWidth: '328px'
        }}
      >
        <Suspense fallback={<CircularLoading size={"1.5rem"} />}>
          {
            items
              ? items.map(i => (
                <Grid key={i.id} item sx={{ padding: 0, margin: 0 }}>
                  <SearchBoxButton
                    size="small"
                    onClick={() => handleClick(sectionName.toLowerCase(), i.id)}
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