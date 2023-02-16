import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../api/videos";
import { useVideoContext, VideoActions } from "../../utils/VideoContext";
import { Button } from "../basic/Button";
import { InputField } from "../basic/InputField";

interface props {
  onSubmit?: Function; //best practices would use this to then pass the data to a handler wrapper
}

export default function UploadForm(props: props) {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { dispatch } = useVideoContext();
  const [data, setData] = useState({
    title: "",
  });
  const [videoFile, setVideoFile] = useState(null as FileList | null);
  const [errors, setErrors] = useState({
    title: [] as string[],
  });
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <InputField
        value={data.title}
        errors={errors.title}
        label={"Video Title"}
        type={"title"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.title.length)}
        name={"Video Title"}
        onChange={(ev) => {
          setData((old) => ({ ...old, title: ev.target.value }));
        }}
      ></InputField>
      <input
        type="file"
        accept="video/mp4"
        onInput={(ev) => {
          const target = ev.target as HTMLInputElement;
          setVideoFile(target.files);
        }}
      />
      {/* You would want to store the accepted mimetypes in an outside storage so the backend and frontend match */}
      <Button
        disabled={buttonDisabled}
        className="bg-emerald-500 hover:bg-emerald-200 duration-150 text-white font-bold"
        onClick={async () => {
          setButtonDisabled(true);
          setErrors({ title: [] });
          const fd = new FormData();
          if (!data.title || !videoFile) {
            setButtonDisabled(false);
            return;
          }
          fd.set("title", data.title);
          fd.set("video", videoFile![0]);
          try {
            const res = await uploadVideo({
              formData: fd,
              config: {
                onUploadProgress: (ev) => {
                  console.log(ev);
                  if (ev.loaded >= ev.total) {
                    setButtonDisabled(false);
                    navigate("/");
                  }
                },
              },
            });
            dispatch({ type: VideoActions.Add, payload: { video: res } });
          } catch (e) {
            setErrors({ title: [(e as any).response.data.message] });
          }
        }}
      >
        Upload
      </Button>
    </form>
  );
}
