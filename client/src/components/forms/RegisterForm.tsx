import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";
import { Button } from "../basic/Button";
import { InputField } from "../basic/InputField";

interface props {
  onSubmit?: Function; //best practices would use this to then pass the data to a handler wrapper
}

export default function RegisterForm(props: props) {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],
  });
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <InputField
        value={data.username}
        errors={errors.username}
        label={"Username"}
        type={"text"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.username.length)}
        name={"Username"}
        onChange={(ev) => {
          setData((old) => ({ ...old, username: ev.target.value }));
        }}
      ></InputField>
      <InputField
        value={data.password}
        errors={errors.password}
        label={"Password"}
        type={"password"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.password.length)}
        name={"Password"}
        onChange={(ev) => {
          setData((old) => ({ ...old, password: ev.target.value }));
        }}
      ></InputField>
      <InputField
        value={data.confirmPassword}
        errors={errors.confirmPassword}
        label={"Confirm Password"}
        type={"password"}
        required={true}
        placeholder={""}
        invalid={Boolean(errors.confirmPassword.length)}
        name={"Confirm Password"}
        onChange={(ev) => {
          setData((old) => ({ ...old, confirmPassword: ev.target.value }));
        }}
      ></InputField>
      <Button
        disabled={buttonDisabled}
        className="bg-emerald-500 hover:bg-emerald-200 duration-150 text-white font-bold"
        onClick={async () => {
          setButtonDisabled(true);
          setErrors({ username: [], password: [], confirmPassword: [] });
          try {
            const res = await registerUser(data);
            if (res.status === 201) {
              navigate("/login");
            }
          } catch (e) {
            //best practice would be to make a whole handler for zod errors. This one might crash easily
            //also you would handle the sanitization and error checking here client-side first as well
            //that way we can prevent unnecessary calls to the backend
            (e as any).response.data[0].errors.issues.forEach((error: any) => {
              const field = error.path[0] as "username" | "password" | "confirmPassword";
              const message = error.message;
              setErrors((old) => ({ ...old, [field]: old[field].concat([message]) }));
            });
          }

          setButtonDisabled(false);
        }}
      >
        Sign Up
      </Button>
    </form>
  );
}
