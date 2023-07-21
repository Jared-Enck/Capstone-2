import React, { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import {
  Stack,
  Typography
} from "@mui/material";

export default function CollectionStats({ size }) {
  const { colValue, getCollectionValue } = useContext(DataContext);

  useEffect(() => {
    if (!colValue) {
      getCollectionValue();
    }
  }, [colValue, getCollectionValue]);

  return (
    <Stack spacing={1} sx={{ padding: 2 }}>
      <Typography variant="h5" color={"primary.contrastText"}>
        Collection
      </Typography>
      <Typography color={"primary.text"}>
        Total Games: {size}
      </Typography>
      <Typography color={"primary.text"}>
        Estimated Value: {`$${colValue.toLocaleString('en-Us')}`}
      </Typography>
    </Stack>
  );
};