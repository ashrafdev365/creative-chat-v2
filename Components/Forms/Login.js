import { useState, useEffect } from "react";
import Image from "next/image";
import gog from "../../public/google.svg";
import fb from "../../public/fb.svg";
import twitter from "../../public/twitter.svg";
import github from "../../public/github.svg";
import { useAuth } from "../../Firebase/Context";
import { useRouter } from "next/router";

export const Login = ({ setmodel, form, setform }) => {
  const [img, setimg] = useState({
    width: "40px",
    height: "40px",
  });
  const { google, currentUser } = useAuth();
  const router = useRouter();
  const handleGoogle = () => {
    google();
  };

  const handleSigninUser = () => {
    setTimeout(() => {
      router.push("/user");
      setmodel(false);
    }, 1000);
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
      {form && (
        <div className="form">
          <button onClick={() => setmodel(false)} className="close_form">
            <i className="fal fa-times"></i>
          </button>
          <h1>Log in</h1>
          <section>
            <button onClick={() => setform(false)} className="login_form_btn">Create Account</button>
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
