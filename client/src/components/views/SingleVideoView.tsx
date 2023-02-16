import React, { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import { useNavigate, useParams } from "react-router-dom";
import VideoJS from "../videos/VideoPlayer";
import Player from "video.js/dist/types/player";
import { videosUri } from "../../utils/URIs";
import { Video } from "../../utils/Types";
import { deleteVideo, getVideoById } from "../../api/videos";
import { useUserContext } from "../../utils/UserContext";
import { Button } from "../basic/Button";
import EditVideoForm from "../forms/EditVideoForm.";
import { useVideoContext, VideoActions } from "../../utils/VideoContext";

export default function SingleVideoView() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState({} as Video);
  const { user, refetch } = useUserContext();
  const [editingMode, setEditingMode] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useVideoContext();
  const getVideo = async () => {
    if (id) {
      const data = await getVideoById(id);
      setVideoData(data.data.data);
      refetch();
    }
  };
  useEffect(() => {
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
        {editingMode && id ? (
          <EditVideoForm
            id={id}
            onCancel={() => {
              setEditingMode(false);
            }}
            onSubmit={() => {
              setEditingMode(false);
              getVideo();
            }}
          ></EditVideoForm>
        ) : (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{videoData.title}</h2>
            <p className="italic">{videoData.description || "[no description]"}</p>
          </div>
        )}
        {user && user._id === videoData.author ? (
          <>
            {editingMode ? (
              <></>
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
                <Button
                  onClick={async () => {
                    if (!id) return;
                    const res = await deleteVideo(id);
                    if (res.status === 204) {
                      dispatch({ type: VideoActions.Remove, payload: { shortId: id } });
                      //best practices would ask for confirmation, and not actually delete the video, just mark it deleted.
                      navigate("/");
                    }
                  }}
                  className="bg-red-300 p-2 w-20 hover:bg-red-200 duration-150"
                >
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
