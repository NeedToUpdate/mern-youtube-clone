import axios from "axios";
import { Video } from "../utils/Types";
import { videosUri } from "../utils/URIs";

export async function getVideos(): Promise<Video[]> {
  const res = await axios.get(videosUri);
  if (res.status === 200) {
    return res.data.data as Video[];
  } else {
    return [] as Video[];
  }
}

export function uploadVideo({ formData, config }: { formData: FormData; config: { onUploadProgress: (progressEvent: any) => void } }) {
  return axios
    .post(videosUri, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}
