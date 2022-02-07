import Link from "next/link";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  useLayoutEffect(() => {
    currentUser ? router.push("/chat") : null;
  });

  // useEffect(() => {
  //   navigator.onLine ? console.log("yes") : console.log("no");
  // }, []);

  return (
    <>
      <header>
        <div className="main_image_div">
          <div className="style1"></div>
          <div className="style2"></div>
          <img src="./ashraf.png" alt="ashraf" title="ashraf" />
        </div>
        <h1>
          Hi, I’m <span> Ashraf</span>
          <br /> Chowury
        </h1>
        <h2>Welcome To My Chat Application</h2>
        {!currentUser ? (
          <Link href={`/signup`}>
            <button>Sign Up</button>
          </Link>
        ) : (
          <Link href={`/chat`}>
            <button>Continue</button>
          </Link>
        )}
      </header>
    </>
  );
}
