import React, { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import { useParams } from "react-router-dom";
import VideoJS from "../videos/VideoPlayer";
import Player from "video.js/dist/types/player";
import { videosUri } from "../../utils/URIs";
import { Video } from "../../utils/Types";
import { getVideoById } from "../../api/videos";
import { useUserContext } from "../../utils/UserContext";
import { Button } from "../basic/Button";

export default function SingleVideoView() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState({} as Video);
  const { user, refetch } = useUserContext();
  const [editingMode, setEditingMode] = useState(false);
  useEffect(() => {
    const getVideo = async () => {
      if (id) {
        const data = await getVideoById(id);
        setVideoData(data.data.data);
        refetch();
      }
    };
    getVideo();
  }, [id]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${videosUri}/${id}`,
        type: "video/mp4",
      },
    ],
  };
  return (
    <div className="flex items-center justify-center h-full gap-5">
      <div className="w-[600px]">
        <VideoJS options={videoJsOptions} />
      </div>
      <div className="flex flex-col gap-5 h-[300px] justify-start">
        {editingMode ? (
          <></>
        ) : (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{videoData.title}</h2>
            <p className="italic">{videoData.description || "[no description]"}</p>
          </div>
        )}
        {user && user._id === videoData.author ? (
          <>
            {editingMode ? (
              <div className="flex gap-1">
                <Button onClick={() => {}} className="bg-emerald-300 p-2 w-20 hover:bg-emerald-200 duration-150">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setEditingMode(false);
                  }}
                  className="bg-amber-300 p-2 w-20 hover:bg-amber-200 duration-150"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    setEditingMode(true);
                  }}
                  className="bg-blue-300 p-2 w-20 hover:bg-blue-200 duration-150"
                >
                  Edit
                </Button>
                <Button onClick={() => {}} className="bg-red-300 p-2 w-20 hover:bg-red-200 duration-150">
                  Delete
                </Button>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
