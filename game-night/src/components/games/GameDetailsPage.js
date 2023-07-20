import React, { useEffect, useContext, lazy } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import ContentContainer from "../common/ContentContainer";
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
  const { game, checkGameCache } = useContext(DataContext);
  const gameID = useParams().id;

  useEffect(() => {
    checkGameCache(gameID);
    // eslint-disable-next-line
  }, []);

  const images = game.detail_images || [];
  const videos = game.videos || [];

  return (
    <Stack spacing={".3rem"}>
      <ContentContainer>
        <GameDescriptionComp game={game} />
      </ContentContainer>
      {
        images.length
          ? (
            <ContentContainer header="Images" divider>
              <MediaContainerComp items={images} />
            </ContentContainer>
          )
          : null
      }
      {
        videos.length
          ? (
            <ContentContainer header="Videos" divider>
              <MediaContainerComp items={videos} isVideo={true} />
            </ContentContainer>
          )
          : null
      }
      <ContentContainer header="Details" divider>
        <GameDetailsComp game={game} />
      </ContentContainer>
    </Stack>
  );
};