import Link from "next/link";
import { useState } from "react";
import {
  onSnapshot,
  doc,
  collection,
  query,
  limit,
  addDoc,
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
const signup = () => {
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profile, setprofile] = useState("");
  const [profileUpload, setprofileUpload] = useState("");
  const { signup, google, currentUser } = useAuth();
  const { router } = useRouter();
  const q = query(collection(db, `userInfo`));

  console.log(currentUser);
  console.log(`${profileUpload} : ${profile}`);
  let value, name;
  const handleData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = input;
    if (!name || !email || !password) {
      return alert("fill up");
    } else {
      await addDoc(q, {
        name: name,
        email: email,
        pass: password,
        image: profile,
      });
      await signup(email, password);
      setinput({
        name: "",
        email: "",
        password: "",
      });
    }
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
          <button type="submit">Submit</button>

          <button className="google" onClick={() => google()}>
            <i className="fab fa-google"></i> Continue With Google
          </button>
        </form>
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
