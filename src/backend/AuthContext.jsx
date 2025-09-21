// src/context/AuthContext.jsx
import React, {createContext, useState, useEffect} from "react";
import {auth} from "./Firebase"; // Import your Firebase auth
import {onAuthStateChanged} from "firebase/auth";

// Create a Context
export const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [UID, setUID] = useState(null);
   // Set up an observer on the Firebase auth state
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setUID(currentUser ? currentUser.uid : null); // ✅ safe assignment
      });

      return () => unsubscribe();
   }, []);

   return (
      <AuthContext.Provider value={{user, UID}}>
         {children}
      </AuthContext.Provider>
   );
};
