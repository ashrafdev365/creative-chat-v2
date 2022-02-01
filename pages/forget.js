import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
import { Succes, Wrong } from "../Components/Boxes/AleartBox";

const forget = () => {
  const [input, setinput] = useState("");
  const [box, setbox] = useState(false);
  const [filed_aleart, setfiled_aleart] = useState("");
  const { forgrt, currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    currentUser ? router.push("/") : null;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input) {
      return setbox(true);
    } else {
      try {
        await forgrt(input);
        setfiled_aleart("Please Check Your Inbox");
        setbox(true);
        setinput("");
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  return (
    <>
      <Wrong name="Please Type You Email" setbox={setbox} box={box} />
      <main className="form">
        <h1>forget</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Email"
            name="email"
          />

          <div>
            <p>
              Create Account:{" "}
              <Link href="/signup">
                <span>Sign Up</span>
              </Link>
            </p>
            <p>
              Have an Account:{" "}
              <Link href="/login">
                <span>Login</span>
              </Link>
            </p>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default forget;
