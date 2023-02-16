import React, { useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import { useUserContext } from "../utils/UserProvider";
import { getVideos } from "../api/videos";
export default function Home() {
  const { user, refetch } = useUserContext();
  useEffect(() => {
    console.log(user);
    getVideos().then((res) => {
      console.log(res);
    });
  }, [user]);
  return (
    <div>
      <h4 className="font-bold text-xl text-emerald-700">Popular Videos:</h4>
      <VideoCarousel sorting="popular"></VideoCarousel>
    </div>
  );
}
