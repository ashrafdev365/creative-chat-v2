import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
const login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const { login, google, currentUser } = useAuth();
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
    const { email, password } = input;
    if (!email || !password) {
      return alert("fill up");
    } else {
      await login(email, password);
      setinput({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <main className="form">
        <h1>Log In</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            value={input.email}
            onChange={handleData}
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            value={input.password}
            onChange={handleData}
            placeholder="Password"
            name="password"
          />
          <div>
            <p>
              Have an Account:
              <Link href="/signup">
                <span>Log in</span>
              </Link>
            </p>
            <p>
              <Link href="/forget">Forget Password!</Link>
            </p>
          </div>
          <button type="submit">Submit</button>

          <button className="google" onClick={() => google()}>
            <i className="fab fa-google"></i> Continue With Google
          </button>
        </form>
      </main>
    </>
  );
};

export default login;
