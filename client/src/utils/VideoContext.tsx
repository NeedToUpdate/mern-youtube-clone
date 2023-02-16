import { createContext, useContext, useEffect, useReducer } from "react";
import { getVideos } from "../api/videos";
import { ActionMap, Video } from "./Types";

//best practice would have you use a better more comprehensive library like Redux,
//but since what we have is very simple, we call roll our own simple context reducer

export enum VideoActions {
  Add = "ADD",
  Fetch = "FETCH",
  Update = "UPDATE",
  Remove = "REMOVE",
}

type VideoPayload = {
  [VideoActions.Add]: { video: Video };
  [VideoActions.Fetch]: { videos: Video[] };
  [VideoActions.Update]: { title?: string; description?: string; shortId: string };
  [VideoActions.Remove]: { shortId: string };
};

export type VideoActionMap = ActionMap<VideoPayload>[keyof ActionMap<VideoPayload>];

export type VideoData = {
  videos: Video[];
  initialized: boolean;
};

export const videoReducer = (state: VideoData, action: VideoActionMap) => {
  switch (action.type) {
    case VideoActions.Add:
      return { ...state, videos: state.videos.concat([action.payload.video]) };
    case VideoActions.Fetch:
      return { ...state, videos: action.payload.videos, initialized: true };
    case VideoActions.Update:
      return {
        ...state,
        videos: state.videos.map((video) => {
          if (video.shortId === action.payload.shortId) {
            if (action.payload.title) {
              video.title = action.payload.title;
            }
            if (action.payload.description) {
              video.description = action.payload.description;
            }
          }
          return video;
        }),
      };
    case VideoActions.Remove:
      return { ...state, videos: state.videos.filter((x) => x.shortId !== action.payload.shortId) };
    default:
      return state;
  }
};

const VideoContext = createContext<{ state: VideoData; dispatch: React.Dispatch<VideoActionMap> }>({
  state: {} as VideoData,
  dispatch: () => null,
});

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(videoReducer, { videos: [] as Video[], initialized: false });
  useEffect(() => {
    if (state.initialized) return;
    getVideos().then((res) => {
      dispatch({ type: VideoActions.Fetch, payload: { videos: res } });
    });
  }, []);
  return <VideoContext.Provider value={{ state, dispatch }}>{children}</VideoContext.Provider>;
};

const useVideoContext = () => useContext(VideoContext);

export { VideoProvider, useVideoContext };
