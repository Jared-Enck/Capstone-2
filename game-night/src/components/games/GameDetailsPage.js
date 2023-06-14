import React, { useContext, useEffect, Suspense, lazy } from "react";
import DataContext from "../../context/DataContext";
import CircularLoading from "../common/CircularLoading";
import {
  Stack,
} from "@mui/material";

const MediaContainerComp = lazy(
  () => import("./MediaContainer")
);
const GameDescriptionComp = lazy(
  () => import("./GameDescription")
);
const GameDetailsComp = lazy(
  () => import("./GameDetails")
);

export default function GameDetailsPage() {
  const { game } = useContext(DataContext);

  useEffect(() => {
    console.log(game)
  }, [])

  const images = game.detail_images || [];
  const videos = game.videos || [];

  return (
    <Stack spacing={".3rem"}>
      <Suspense fallback={<CircularLoading />}>
        <GameDescriptionComp game={game} />
        {
          images.length
          ? (
            <MediaContainerComp header="Images" items={images} />
          )
          : null
        }
        {
          videos.length
          ? (
            <MediaContainerComp header="Videos" items={videos} isVideo={true} />
          )
          : null
        }
        <GameDetailsComp game={game} />
      </Suspense>
    </Stack>
  );
};