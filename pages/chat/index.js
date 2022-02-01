import { useState } from "react";
import User from "../../Components/Users/User";
import { Wrong } from "../../Components/Boxes/AleartBox";
const chat = () => {
  const [box, setbox] = useState(true);

  return (
    <>
      {/* <Wrong
        name="Succesfully Reload"
        box={box}
        setbox={setbox}
      /> */}
      <User />
    </>
  );
};

export default chat;
