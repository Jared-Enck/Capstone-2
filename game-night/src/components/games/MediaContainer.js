import React from "react";
import {
  Grid
} from "@mui/material";
import MediaCard from "./MediaCard";

export default function MediaContainer({ header, items, isVideo = null }) {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const ImageCardComponent = (item) => (
    <MediaCard
      item={item}
      size={"medium"}
      height={200}
      width={200}
      handleClick={handleClick}
    />
  );

  const VideoCardComponent = (item) => (
    <MediaCard
      item={item}
      height={200}
      width={300}
      handleClick={handleClick}
      isVideo
    />
  );

  return (
    <>
      <Grid
        sx={{
          alignItems: "center",
          height: 220,
          overflow: "auto",
          marginTop: ".3rem"
        }}
        container
        direction={"row"}
        spacing={2}
      >
        {
          items
            ? (
              items.map(i => (
                <Grid
                  key={i.id}
                  item
                  justifyContent={"center"}
                >
                  {
                    isVideo
                      ? VideoCardComponent(i)
                      : ImageCardComponent(i)
                  }
                </Grid>
              ))
            )
            : null
        }
      </Grid>
    </>
  )
};