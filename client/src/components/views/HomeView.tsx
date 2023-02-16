import VideoCarousel from "../videos/VideoCarousel";
import { useVideoContext } from "../../utils/VideoContext";
export default function Home() {
  const { state } = useVideoContext();
  return (
    <div>
      <div className="flex flex-col gap-3 mb-10">
        <h4 className="m-4 font-bold text-xl text-emerald-700">Popular Videos:</h4>
        <VideoCarousel sorting="popular" videos={state.videos} initialized={state.initialized}></VideoCarousel>
      </div>
      <div className="flex flex-col gap-3 mb-10">
        <h4 className="m-4 font-bold text-xl text-emerald-700">Trending Videos:</h4>
        <VideoCarousel sorting="popular" videos={state.videos} initialized={state.initialized}></VideoCarousel>
      </div>
      <div className="flex flex-col gap-3 mb-10">
        <h4 className="m-4 font-bold text-xl text-emerald-700">Other Videos:</h4>
        <VideoCarousel sorting="popular" videos={state.videos} initialized={state.initialized}></VideoCarousel>
      </div>
    </div>
  );
}
