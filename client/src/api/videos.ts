import axios from "axios";
import { Video } from "../utils/Types";
import { videosUri } from "../utils/URIs";

export const getVideos = async (): Promise<Video[]> => {
  const res = await axios.get(videosUri);
  if (res.status === 200) {
    return res.data.data as Video[];
  } else {
    return [] as Video[];
  }
};
