import { useState, useEffect, createContext, useContext } from "react";
import { db } from "./firebase";
import { onSnapshot, doc, collection, query } from "firebase/firestore";

export const UserContext = createContext();

export const userData = () => useContext(UserContext);

const UserDataProvider = ({ children }) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "userInfo"));
    const userData = onSnapshot(q, (snapshot) => {
      setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const value = {
    data,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserDataProvider;
