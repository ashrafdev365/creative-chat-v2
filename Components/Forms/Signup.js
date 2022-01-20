import { useState, useEffect } from "react";
import Image from "next/image";
import gog from "../../public/google.svg";
import fb from "../../public/fb.svg";
import twitter from "../../public/twitter.svg";
import github from "../../public/github.svg";
import { useAuth } from "../../Firebase/Context";
import { useRouter } from "next/router";
import {
  onSnapshot,
  doc,
  collection,
  query,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../Firebase/_firebase";
export const Signup = ({ setmodel, form, setform }) => {
  const [img, setimg] = useState({
    width: "40px",
    height: "40px",
  });
  const { google, currentUser } = useAuth();
  const router = useRouter();
  const handleGoogle = () => {
    google();
  };

  const handleSigninUser = async () => {
    if (currentUser) {
      await setDoc(doc(db, "creative-chat", currentUser.email), {
        userData: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          photo: currentUser.photoURL,
        },
      });

      setTimeout(async () => {
        await addDoc(
          collection(
            db,
            `/creative-chat/ashrafchy338@gmail.com/ashraf chy & ${currentUser.displayName}`
          ),
          {
            timestemp: serverTimestamp(),
            msg: "Hello Ahraf",
            uid: currentUser.uid,
          }
        );
      }, 1000);
    } else {
      return alert("pleace change the state");
    }

    setTimeout(() => {
      router.push("/user");
      setmodel(false);
    }, 4000);
  };
  useEffect(() => {
    window.innerWidth <= 550
      ? setimg({
          width: "30px",
          height: "30px",
        })
      : setimg({
          width: "40px",
          height: "40px",
        });
  }, []);
  const { width, height } = img;
  return (
    <>
      {form == false && (
        <div className="form">
          <button onClick={() => setmodel(false)} className="close_form">
            <i className="fal fa-times"></i>
          </button>
          <h1>Sign Up</h1>
          <section>
            <button onClick={() => setform(true)} className="login_form_btn">
              Log in
            </button>
            <button onClick={handleGoogle}>
              <span>
                <Image
                  src={gog}
                  alt="creative chat"
                  title="creative chat sign up"
                  width={width}
                  height={height}
                />
              </span>
              Continue With Google
            </button>
            <button>
              <span>
                <Image
                  src={fb}
                  alt="creative chat"
                  width={width}
                  height={height}
                  title="creative chat sign up"
                />
              </span>
              Continue With Facebook
            </button>
            <button>
              <span>
                <Image
                  src={twitter}
                  alt="creative chat"
                  title="creative chat sign up"
                  width={width}
                  height={height}
                />
              </span>
              Continue With Twitter
            </button>
            <button>
              <span>
                <Image
                  src={github}
                  alt="creative chat"
                  title="creative chat sign up"
                  width={width}
                  height={height}
                />
              </span>
              Continue With Github
            </button>
            {currentUser && (
              <button className="continue" onClick={handleSigninUser} f>
                Continue Chat
              </button>
            )}
          </section>
        </div>
      )}
    </>
  );
};
