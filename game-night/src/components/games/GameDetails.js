import React, { useContext, useEffect, Suspense, lazy } from "react";
import DataContext from "../../context/DataContext";
import CircularLoading from "../common/CircularLoading";
import {
  Container,
  Box,
  Typography
} from "@mui/material"

const MediaContainerComp = lazy(
  () => import("./MediaContainer")
);

export default function GameDetails() {
  const { game } = useContext(DataContext);

  useEffect(() => {
    console.log(game)
  },[])
  
  const images = game.detail_images || [];
  const videos = game.videos || [];

  return (
    <Container maxWidth={"xl"}>
      <Typography variant={"h3"}>
        {game.name}
      </Typography>
      <Box sx={{
        width: 400
      }}>
        <Typography variant={"h6"}>
          Description
        </Typography>
        <p>
          {game.description_preview}
        </p>
      </Box>
      {
        images.length
        ? (
          <Suspense fallback={<CircularLoading />}>
            <MediaContainerComp header="Images" items={images} />
          </Suspense>
        )
        : null
      }
      {
        videos.length
        ? (
          <Suspense fallback={<CircularLoading />}>
            <MediaContainerComp header="Videos" items={videos} isVideos={true} />
          </Suspense>
        )
        : null
      }
    </Container>
  );
};