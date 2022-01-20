import Link from "next/link";
import { useAuth } from "../Firebase/Context";

export default function Home() {
  const { currentUser } = useAuth();

  console.log(currentUser);
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
        <Link href={`/signup`}>
          <button>Sign Up</button>
        </Link>
      </header>
    </>
  );
}
