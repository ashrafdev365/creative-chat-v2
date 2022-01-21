import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../Firebase/Context";
const settings = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  useEffect(() => {
    !currentUser ? router.push("/") : null;
  });
  const handleLogout = () => {
    if (currentUser) {
      logout();
      router.push("/");
    } else {
      null;
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div></div>
      <p onClick={handleLogout}>Log Out</p>
    </div>
  );
};

export default settings;
