import React from "react";
import { useState } from "react";
import { updateVideo } from "../../api/videos";
import { useVideoContext, VideoActions } from "../../utils/VideoContext";
import { Button } from "../basic/Button";
import { InputField } from "../basic/InputField";

interface props {
  id: string;
  onSubmit: Function;
  onCancel: Function;
}

//this isn't best practice to manually write out each form. using something like Mantine is much better, as we can have more complex forms without
//rewriting to much code. But that is outside the scope of this project, and we just need 4 forms with 2 fields, so copy pasting is ok for now.

export default function EditVideoForm(props: props) {
  const { id } = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { dispatch } = useVideoContext();
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: [] as string[],
    description: [] as string[],
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
        label={"title"}
        type={"text"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.title.length)}
        name={"title"}
        onChange={(ev) => {
          setData((old) => ({ ...old, title: ev.target.value }));
        }}
      ></InputField>
      <InputField
        value={data.description}
        errors={errors.description}
        label={"description"}
        type={"text"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.description.length)}
        name={"description"}
        onChange={(ev) => {
          setData((old) => ({ ...old, description: ev.target.value }));
        }}
      ></InputField>
      <div className="flex gap-1">
        <Button
          disabled={buttonDisabled}
          onClick={async () => {
            setButtonDisabled(true);
            setErrors({ title: [], description: [] });
            try {
              const res = await updateVideo(id, data);
              if (res.status === 200) {
                dispatch({ type: VideoActions.Update, payload: { shortId: id, title: data.title, description: data.description } });
                props.onSubmit();
              }
            } catch (e) {
              //best practice would be to make a whole handler for zod errors. This one might crash easily
              //also you would handle the sanitization and error checking here client-side first as well
              //that way we can prevent unnecessary calls to the backend
              (e as any).response.data[0].errors.issues.forEach((error: any) => {
                const field = error.path[0] as "title" | "description";
                const message = error.message;
                setErrors((old) => ({ ...old, [field]: old[field].concat([message]) }));
              });
            }

            setButtonDisabled(false);
          }}
          className="bg-emerald-300 p-2 w-20 hover:bg-emerald-200 duration-150"
        >
          Submit
        </Button>
        <Button
          disabled={buttonDisabled}
          onClick={() => {
            props.onCancel();
          }}
          className="bg-amber-300 p-2 w-20 hover:bg-amber-200 duration-150"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
