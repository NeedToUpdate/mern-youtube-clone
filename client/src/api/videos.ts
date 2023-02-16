import axios from "axios";
import { Video } from "../utils/Types";
import { videosUri } from "../utils/URIs";

export const getVideos = async (): Promise<Video[]> => {
  const res = await axios.get(videosUri);
  console.log(res);
  return res.data as Video[];
};
