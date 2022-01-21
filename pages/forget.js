import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
const login = () => {
  const [input, setinput] = useState({
    email: "",
  });
  const { forgrt, currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    currentUser ? router.push("/") : null;
  });

  let value, name;
  const handleData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = input;
    if (!email) {
      return alert("fill up");
    } else {
      await forgrt(email);
      setinput({
        email: "",
      });
    }
  };

  return (
    <>
      <main className="form">
        <h1>forget</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            value={input.email}
            onChange={handleData}
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
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default login;
