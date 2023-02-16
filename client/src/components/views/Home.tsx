import React, { useEffect } from "react";
import VideoCarousel from "../videos/VideoCarousel";
import { useUserContext } from "../../utils/UserContext";
import { getVideos } from "../../api/videos";
import { useVideoContext } from "../../utils/VideoContext";
export default function Home() {
  const { user, refetch } = useUserContext();
  const { state, dispatch } = useVideoContext();
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <h4 className="font-bold text-xl text-emerald-700">Popular Videos:</h4>
      <VideoCarousel sorting="popular" videos={state.videos} initialized={state.initialized}></VideoCarousel>
    </div>
  );
}
