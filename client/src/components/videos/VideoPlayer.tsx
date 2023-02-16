import * as React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

//This file is taken from the video.js site and slightly adapted to fit the project

interface IVideoPlayerProps {
  options: any;
}

const initialOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>();
  const player = React.useRef<Player>();

  React.useEffect(() => {
    //@ts-ignore-next-line
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  //@ts-ignore-next-line
  return <video ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
