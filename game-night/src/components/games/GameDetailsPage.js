import React, { useState, useContext, useEffect, Suspense, lazy } from "react";
import DataContext from "../../context/DataContext";
import CircularLoading from "../common/CircularLoading";
import GameDescription from "./GameDescription";
import GameDetails from "./GameDetails";
import {
  Container,
  Box,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";

const MediaContainerComp = lazy(
  () => import("./MediaContainer")
);

const ContentBox = styled(Box)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius
}));

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
        <ContentBox>
          <GameDescription game={game} />
        </ContentBox>
        <ContentBox>
          <GameDetails game={game} />
        </ContentBox>
        {
          images.length || videos.length
          ? (
            <ContentBox>
              <Container maxWidth={"lg"}>
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
              </Container>
            </ContentBox>
          )
          : null
        }
      </Stack>
    </Suspense>
  );
};