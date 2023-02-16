import React from "react";
import { useParams } from "react-router-dom";

export default function EditVideoView() {
  let { id } = useParams();
  return <div>EditVideoView {id}</div>;
}
