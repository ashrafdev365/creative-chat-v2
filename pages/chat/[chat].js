import { useAuth } from "../../Firebase/Context";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { userData } from "../../Firebase/UserContext";
import { db } from "../../Firebase/firebase";

import {
  onSnapshot,
  doc,
  collection,
  query,
  setDoc,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const chat = () => {
  const [message, setmessage] = useState([]);
  const [input, setinput] = useState("");
  const [image, setimage] = useState("");
  const { currentUser } = useAuth();
  const { data } = userData();
  const router = useRouter();
  const { email, displayName } = currentUser;
  const scroll = useRef();

  //filter chat user data
  const user = data
    .filter((value) => {
      return value.uid == router.query.chat;
    })
    .map((value) => value);
  const userId = user[0];

  //filter my data
  const myData = data
    .filter((value) => {
      return value.id == email;
    })
    .map((value) => value);
  const myId = myData[0];

  //when the currentUser first time enter the chat user then create a document
  useEffect(async () => {
    await setDoc(doc(db, "message", `${myId?.uid + userId?.uid}`), {
      fistUserName: displayName,
      secondUserName: userId?.name,
    });
  });

  //check the user is authenticated
  useLayoutEffect(() => {
    !currentUser ? router.push("/") : null;
  });

  ///get the message data
  useLayoutEffect(() => {
    const q = query(
      collection(db, "message", `${myId?.uid + userId?.uid}`, "data"),
      orderBy("timestemp", "asc")
    );
    const userData = onSnapshot(q, (snapshot) => {
      setmessage(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docId = myId?.uid + userId?.uid;
    const q = query(collection(db, "message", `${docId}`, "data"));
    if (!input && !image) {
      return console.log("Please write something");
    } else {
      await addDoc(q, {
        img: image,
        msg: input,
        timestemp: serverTimestamp(),
        uid: currentUser.uid,
      });
      setinput("");
      setimage("");
      // scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //get the image info
  const handleImage = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  //upload the image on firebase storage & get the image URL
  const uploadImage = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, `${displayName}/ ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          console.log(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimage(downloadURL);
        });
      }
    );
  };

  const handleDownloadImage = (imageURL) => {
    const sort = imageURL.split("?alt")[0];
    console.log(sort);
    // Create a reference with an initial file path and name
    const storage = getStorage();
    const pathReference = ref(storage, `${displayName}/${imageURL}`);

    getDownloadURL()
      .then((url) => {
        <img src={url} />;
        console.log(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            console.log("File doesnt exist");
            break;
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log(" User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
        }
      });
  };

  return (
    <main className="user_chat_section">
      <nav>
        <i className="fas fa-chevron-left" onClick={() => router.back()}></i>

        {data
          .filter((value) => {
            return value.uid == router.query.chat;
          })
          .map((value) => {
            return (
              <div>
                <img src={value?.photo} alt="" />
                <h1>{value?.name}</h1>
              </div>
            );
          })}
      </nav>

      <section className="user_chats">
        {message.map((val) => {
          return (
            <div
              className={
                val.uid == currentUser.uid ? "right_user" : "left_user"
              }
              key={val.id}
              onClick={() => navigator.clipboard.writeText(val.msg)}
            >
              {val.img ? (
                <img
                  src={val.img}
                  onClick={() => handleDownloadImage(val.img)}
                  alt=""
                />
              ) : (
                <p>{val.msg}</p>
              )}
            </div>
          );
        })}
        {/* <div ref={scroll} /> */}
      </section>

      {/**/}
      <form className="messsage_div" onSubmit={handleSubmit}>
        <div>
          <i class="fas fa-images" id="image">
            <input type="file" onChange={handleImage} />
          </i>

          <i className="fas fa-grin-beam"></i>
          <input
            type="text"
            placeholder="Write Message.."
            className="message"
            onChange={(e) => setinput(e.target.value)}
            value={!image || image == "" ? input : image}
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </main>
  );
};

export default chat;
