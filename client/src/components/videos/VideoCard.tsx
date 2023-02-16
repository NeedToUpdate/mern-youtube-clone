import React from "react";
import { Video } from "../../utils/Types";

interface props {
  video: Video;
}

function getThumbnailFromId(id: string) {
  const MAX_THUMB = 6; //we only have thumbnails up to 6
  const firstDigit = parseInt(id.charCodeAt(0).toString().at(-1) || "0"); //gets the last digit of the first letter of the charcode of the ID.
  //essentially a simple hash function to always get the same digit so the thumbnail stays the same.
  return Math.min(firstDigit, MAX_THUMB);
}

export default function VideoCard(props: props) {
  const { video } = props;

  //obviously you would want to implement some thumbnail logic. You would extract some frames from the video when its uploading
  //and save it as an image, then allow users to upload their own. Here we just give them a random one from a
  //random thumbnail generator
  return (
    <div className="flex gap-2 flex-col rounded-md overflow-hidden justify-start m-2 shadow-sm hover:shadow-md hover:translate-y-[-1px] duration-200 w-fit">
      <img src={`/thumbnails/thumb${getThumbnailFromId(video.shortId)}.jpg`} alt={video.title} width={400} height={180} />
      <p className="font-bold text-lg capitalize ml-4">{video.title}</p>
    </div>
  );
}