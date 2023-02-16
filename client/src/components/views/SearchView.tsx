import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchVideos } from "../../api/videos";
import { Video } from "../../utils/Types";
import VideoCard from "../videos/VideoCard";

export default function SearchView() {
  let { query } = useParams();
  const [initialized, setInitialized] = useState(false);
  const [videoData, setVideoData] = useState([] as Video[]);
  useEffect(() => {
    async function search() {
      if (query) {
        const res = await searchVideos(query);
        setVideoData(res.data.data);
        setInitialized(true);
      }
    }
    search();
  }, [query]);

  return (
    <div className="flex gap-1 flex-wrap">
      {!initialized ? (
        <>loading...</>
      ) : (
        <>
          {videoData.length ? (
            <>
              {videoData.map((video) => {
                return <VideoCard key={video.shortId} video={video}></VideoCard>;
              })}
            </>
          ) : (
            <p className="italic m-5">No Results</p>
          )}
        </>
      )}
    </div>
  );
}
