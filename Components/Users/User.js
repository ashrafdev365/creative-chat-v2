import { useAuth } from "../../Firebase/Context";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import { onSnapshot, doc, collection, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
const User = () => {
  const { currentUser } = useAuth();
  const [data, setdata] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const q = query(collection(db, "userInfo"));
    const userData = onSnapshot(q, (snapshot) => {
      setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return userData;
  }, []);
  console.log(data);
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
          <button>Settings</button>
        </Link>
      </nav>
      <div className="search">
        <span>
          <i className="far fa-search"></i>
        </span>
        <input type="search" placeholder="Search User" />
      </div>
      <main className="users_section">
        {data
          .filter((value) => {
            return value?.id != currentUser?.email;
          })
          .map((val) => {
            return (
              <Link href={`/chat/${val.uid}`}>
                <div className="user">
                  <img src={val?.photo} alt="" />
                  <div>
                    <h2>{val?.name}</h2>
                    <p>You: How Are you</p>
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
