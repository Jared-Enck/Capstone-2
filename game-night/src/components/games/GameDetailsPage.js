import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  Stack
} from "@mui/material";
import GameDescription from "./GameDescription";
import GameDescSkeleton from "./GameDescSkeleton";
import MediaContainer from "./MediaContainer";
import MediaSkeleton from "./MediaSkeleton";
import GameDetails from "./GameDetails";

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
    }
    if (game.detail_images) setImages(game.detail_images);
    if (game.videos) setVideos(game.videos);
    // eslint-disable-next-line
  }, [game]);

  return (
    <Stack spacing={".3rem"}>
      {
        game.videos
          ? <GameDescription game={game} />
          : <GameDescSkeleton />
      }
      {
        images
          ? (
            images.length
              ? <MediaContainer items={images} />
              : null
          )
          : <MediaSkeleton />
      }
      {
        videos
          ? (
            videos.length
              ? <MediaContainer items={videos} isVideo />
              : null
          )
          : <MediaSkeleton isVideo />
      }
      <GameDetails game={game} />
    </Stack>
  );
};