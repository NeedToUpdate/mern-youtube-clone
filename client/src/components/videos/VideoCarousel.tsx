import React from "react";
import { shuffle } from "../../utils/functions";
import { Video } from "../../utils/Types";
import VideoCard from "./VideoCard";

interface props {
  sorting: "popular" | "hot" | "trending"; //this is just a template, not actually implemented, but it can be added to the backend search function
  videos: Video[];
  initialized: boolean;
}

export default function VideoCarousel(props: props) {
  const { videos, initialized, sorting } = props;
  return (
    <div className="flex gap-1 flex-wrap">
      {!initialized ? (
        <>loading...</>
      ) : (
        <>
          {videos
            .sort((a, b) => {
              //this would usually handle some basic sorts or filters. here we are mocking some random sorts
              if (sorting === "hot") {
                return a._id > b._id ? 1 : -1;
              } else if (sorting === "trending") {
                return a.shortId > b.shortId ? 1 : -1;
              } else {
                return 1;
              }
            })
            .map((video) => {
              return <VideoCard key={video.shortId} video={video}></VideoCard>;
            })}
        </>
      )}
    </div>
  );
}
