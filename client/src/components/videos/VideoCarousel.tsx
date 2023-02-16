import React from "react";
import { Video } from "../../utils/Types";
import VideoCard from "./VideoCard";

interface props {
  sorting: "popular" | "hot" | "trending"; //this is just a template, not actually implemented, but it can be added to the backend search function
  videos: Video[];
  initialized: boolean;
}

export default function VideoCarousel(props: props) {
  const { videos, initialized } = props;
  return (
    <div>
      {!initialized ? (
        <>loading...</>
      ) : (
        <>
          {videos.map((video) => {
            return <VideoCard key={video.shortId} video={video}></VideoCard>;
          })}
        </>
      )}
    </div>
  );
}
