import { useAuth } from "../../Firebase/Context";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { userData } from "../../Firebase/UserContext";

const User = () => {
  const [search, setsearch] = useState("");
  const { currentUser } = useAuth();
  const { data } = userData();
  const router = useRouter();
  useEffect(() => {
    !currentUser ? router.push("/") : null;
  });

  return (
    <>
      <nav className="user_nav">
        <div className="user_info">
          <img src={currentUser?.photoURL} alt="" />
          <h1>{currentUser?.displayName}</h1>
        </div>
        <Link href="/settings">
          <button className="settings_btn">Settings</button>
        </Link>
      </nav>
      <div className="search">
        <span>
          <i className="far fa-search"></i>
        </span>
        <input
          type="search"
          placeholder="Search User"
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <main className="users_section">
        {data
          .filter((value) => {
            return value?.id != currentUser?.email;
          })
          .filter((value) => {
            return value?.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((val) => {
            return (
              <Link href={`/chat/${val.uid}`}>
                <div className="user">
                  <img src={val?.photo} alt="" />
                  <div>
                    <h2>{val?.name}</h2>
                  </div>
                  <i className="far fa-ellipsis-v"></i>
                </div>
              </Link>
            );
          })}
      </main>
    </>
  );
};

export default User;
