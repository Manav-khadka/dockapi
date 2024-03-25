'use client'
import Image from "next/image";
import { FaGithub, FaUpload, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect, SetStateAction } from "react";
import { signInWithGithub, signOut, onAuthStateChanged } from "../auth.js";
import UploadForm from "./UploadForm";


interface User {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
}
interface NavBarProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn?: boolean;
    setisUploadForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({user,setUser,setIsSignedIn,isSignedIn,setisUploadForm} : NavBarProps) => {

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user: SetStateAction<User>) => {
      if (user) {
        // User is signed in.
        setUser(user);
        setIsSignedIn(true);
        
      } else {
        // User is signed out.
        setUser({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="lg:w-2/4   h-20 bg-white rounded-3xl flex items-center justify-between ">
      <div className="">
        <Image src="/2.png" width={200} height={200} alt="logo" />
      </div>
      
       {isSignedIn
       ? 
      <div className="flex gap-3">

         <div
        className="flex items-center gap-3 h-10 w-28 
        border justify-center bg-white text-sm text-black 
        rounded-3xl hover:bg-black hover:text-white cursor-pointer"
        onClick={() => setisUploadForm(true)}
        >
           <div className="text-sm  "> { 'Upload'}</div> <FaUpload />
            </div>
         <div
        className="flex items-center gap-3 h-10 w-28
        border justify-center bg-white text-sm text-black rounded-3xl
         hover:bg-black hover:text-white cursor-pointer"
         onClick={signOut}
         >
           < div className="text-sm "> { 'logout'}</div><FaSignOutAlt />
            </div>
       </div>
       : <div
          className="flex items-center gap-3 h-10 w-28 border justify-center bg-white text-xl text-black rounded-3xl hover:bg-black hover:text-white cursor-pointer"
          onClick={signInWithGithub}
        >
          <div className="text-sm  "> { 'login'}</div> <FaGithub />
        </div>}
      

      
    </div>
  );
};

export default NavBar;
