import React from "react";
import {
  Grid
} from "@mui/material";
import MediaCard from "./MediaCard";
import ContentContainer from "../common/ContentContainer";

export default function MediaContainer({ items, isVideo }) {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const header = isVideo ? "Videos" : "Images";

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
    <ContentContainer header={header} divider>
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
        }
      </Grid>
    </ContentContainer>
  )
};