import { useState } from "react";
import { Signup } from "../Forms/Signup";
import { Login } from "../Forms/Login";
export const Model = ({ model, setmodel }) => {
  const [form, setform] = useState(false);
  return (
    <>
      {model && (
        <div className="model">
          <Signup setmodel={setmodel} setform={setform} form={form} />
          <Login setmodel={setmodel} form={form} setform={setform} />
        </div>
      )}
    </>
  );
};
