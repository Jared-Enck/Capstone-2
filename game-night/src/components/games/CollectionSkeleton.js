import React from "react";
import {
  Stack,
  Grid
} from "@mui/material";
import BaseSkeleton from "../common/BaseSkeleton";

export default function CollectionSkeleton({ itemsOnPage }) {
  let skelItems = [];

  for (let i = 0; i < itemsOnPage; i++) {
    skelItems.push(
      <Grid item key={i}>
        <BaseSkeleton width={345} height={383} />
      </Grid>
    );
  };

  return (
    <Grid
      container
      direction={"row"}
      spacing={3}
      padding={"1.5rem 1.5rem 0rem 1.5rem"}
    >
      <Grid item xs={12}>
        <Stack spacing={2} width={300}>
          <BaseSkeleton />
          <BaseSkeleton height="1.5rem" />
          <BaseSkeleton height="1.5rem" />
        </Stack>
      </Grid>
      <Grid item>
        <Grid container direction={"row"} spacing={2}>
          {
            skelItems.map(i => i)
          }
        </Grid>
      </Grid>
    </Grid>
  );
};