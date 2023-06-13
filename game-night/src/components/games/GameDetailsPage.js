import React, { useState, useContext, useEffect, Suspense, lazy } from "react";
import DataContext from "../../context/DataContext";
import CircularLoading from "../common/CircularLoading";
import GameDescription from "./GameDescription";
import GameDetails from "./GameDetails";
import {
  Stack,
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";

const MediaContainerComp = lazy(
  () => import("./MediaContainer")
);

export default function GameDetailsPage() {
  const { game } = useContext(DataContext);

  useEffect(() => {
    console.log(game)
  }, [])

  const images = game.detail_images || [];
  const videos = game.videos || [];

  return (
    <Suspense fallback={<CircularLoading />}>
      <Stack spacing={".3rem"}>
        <ContentContainer>
          <GameDescription game={game} />
        </ContentContainer>
        <ContentContainer>
          <GameDetails game={game} />
        </ContentContainer>
        {
          images.length || videos.length
          ? (
            <ContentContainer>
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
                      <MediaContainerComp header="Videos" items={videos} isVideo={true} />
                    </Suspense>
                  )
                  : null
              }
            </ContentContainer>
          )
          : null
        }
      </Stack>
    </Suspense>
  );
};