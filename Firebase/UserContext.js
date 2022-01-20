import { useState, useEffect, createContext, useContext } from "react";
import { db } from "./firebase";
import {
  onSnapshot,
  doc,
  collection,
  query,
} from "firebase/firestore";

export const UserContext = createContext();

export const userDatas = () => useContext(UserContext);

const UserDataProvider = ({ children }) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    //this is for sort messages by time
    const q = query(collection(db, "creative-chat"));
    //this is for show all new massage instently
    const userData = onSnapshot(q, (snapshot) => {
      setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return userData;
  }, []);

  const value = {
    data,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserDataProvider;
