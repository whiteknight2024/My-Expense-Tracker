import { AuthContextType, UserType } from "@/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth, firestore } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<AuthContextType | null>(null);

//13.14 video 4
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //create a document for the user
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  //9.35
  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;

      //return { success: false, msg };
      console.log("error: ", error);
    }
  };
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//useauth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthProvider");
  }
  return context;
};
