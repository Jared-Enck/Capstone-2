import React, { useEffect, useContext, lazy, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  Stack
} from "@mui/material";
import GameDescSkeleton from "./GameDescSkeleton";
import GameDetails from "./GameDetails";
import MediaSkeleton from "./MediaSkeleton";

const MediaContainerComp = lazy(
  () => import("./MediaContainer")
);

const GameDescriptionComp = lazy(
  () => import("./GameDescription")
);

export default function GameDetailsPage() {
  const { game, checkGameCache } = useContext(DataContext);
  const gameID = useParams().id;
  const [images, setImages] = useState('');
  const [videos, setVideos] = useState('');

  useEffect(() => {
    if (!game.videos) {
      setImages('');
      setVideos('');
      checkGameCache(gameID);
      console.log('game:', game)
    }
    if (game.detail_images) setImages(game.detail_images);
    if (game.videos) setVideos(game.videos);
    // eslint-disable-next-line
  }, [game]);

  return (
    <Stack spacing={".3rem"}>
      {
        game.videos
          ? <GameDescriptionComp game={game} />
          : <GameDescSkeleton />
      }
      {
        images
          ? (
            images.length
              ? <MediaContainerComp items={images} />
              : null
          )
          : <MediaSkeleton />
      }
      {
        videos
          ? (
            videos.length
              ? <MediaContainerComp items={videos} isVideo />
              : null
          )
          : <MediaSkeleton isVideo />
      }
      <GameDetails game={game} />
    </Stack>
  );
};