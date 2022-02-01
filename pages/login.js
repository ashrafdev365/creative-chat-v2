import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
import { Succes, Wrong } from "../Components/Boxes/AleartBox";

const login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const [box, setbox] = useState(false);
  const [filed_aleart, setfiled_aleart] = useState("");
  const [success, setsuccess] = useState(false);
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
      setfiled_aleart("Please Fillup All Fileds");
      setbox(true);
    } else {
      try {
        await login(email, password);
        setsuccess(true);
        setinput({
          email: "",
          password: "",
        });
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setbox(true);
            setfiled_aleart("Your Email Is Not Exist");
            break;
          case "auth/wrong-password":
            setbox(true);
            setfiled_aleart("Password Not Mached");
            break;
        }
      }
    }
  };

  return (
    <>
      <Wrong name={filed_aleart} setbox={setbox} box={box} />
      <Succes
        name="Your Account Created Successfully Click The Continue "
        box={success}
        setbox={setsuccess}
      />
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
              Create Account:{" "}
              <Link href="/signup">
                <span>Log in</span>
              </Link>
            </p>
            <p>
              <Link href="/forget">Forget Password!</Link>
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

export default login;
