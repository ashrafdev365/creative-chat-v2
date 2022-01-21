import Link from "next/link";
import { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  collection,
  query,
  limit,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesm,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase/firebase";
import { useAuth } from "../Firebase/Context";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";

const signup = () => {
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profile, setprofile] = useState("");
  const [profileUpload, setprofileUpload] = useState("");
  const [btn, setbtn] = useState();
  const { signup, google, currentUser } = useAuth();
  const router = useRouter();
  const q = query(collection(db, `userInfo`));

  // useEffect(() => {
  //   currentUser ? router.push("/") : null;
  // });

  let value, name;
  const handleData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };
  console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = input;
    if (!name || !email || !password || !profile) {
      return alert("fill up");
    } else {
      await setDoc(doc(db, "userInfo", email), {
        uid: Math.floor(Math.random() * 900000000000000),
        name: name,
        photo: profile,
      });
      await signup(email, password);
    }
  };

  const updateUserProfile = async () => {
    await updateProfile(currentUser, {
      displayName: input.name,
      photoURL: profile,
    });
    setinput({
      name: "",
      email: "",
      password: "",
    });
    setTimeout(() => {
      router.push("/chat");
    }, 1000);
  };

  const handleImages = (e) => {
    const file = e.target.files[0];
    console.log(file);
    uploadImage(file);
  };
  const uploadImage = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, `files/ ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          setprofileUpload(snapshot.bytesTransferred / snapshot.totalBytes) *
          100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setprofile(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <main className="form">
        {profile ? (
          <img src={profile} alt="" />
        ) : (
          <button className="add_img_btn">
            <input type="file" name="image" onChange={handleImages} />
            <i className="fal fa-plus"></i>
          </button>
        )}

        <h3>Profile Picture {profileUpload}</h3>
        <h1>Sign up</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="name"
            value={input.name}
            onChange={handleData}
            placeholder="Name"
            name="name"
          />
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
              <Link href="/login">
                <span>Log in</span>
              </Link>
            </p>
          </div>

          {!currentUser && (
            <button className="submit" type="submit">
              Submit
            </button>
          )}
        </form>
        {currentUser && (
          <button className="submit" onClick={updateUserProfile}>
            Continue
          </button>
        )}
        <button type="normal" className="google" onClick={() => google()}>
          <i className="fab fa-google"></i> Continue With Google
        </button>
      </main>
    </>
  );
};

export default signup;

// switch (snapshot.state) {
//     case "paused":
//       console.log("Upload is paused");
//       break;
//     case "running":
//       console.log("Upload is running");
//       break;
//   }
