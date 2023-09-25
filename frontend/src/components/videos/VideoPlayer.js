import React, { useEffect } from 'react';
import 'mui-player/dist/mui-player.min.css';
import MuiPlayer from 'mui-player';
import { useEffect } from 'react';

export default function VideoPlayer() {
  const mp = new MuiPlayer({
    container: '#mui-player',
    title: 'Title',
    src: 'src',
    autoplay: true,
    lang: 'en',
  });

  useEffect(() => {
    mp();
  }, []);

  return <div id='mui-player'></div>;
}
