'use client'
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { account } from '../appwrite.js'
import { OAuthProvider } from 'appwrite'

const NavBar = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator


  const login = async () => {
    setIsLoading(true); // Set loading state before redirection
    try {
      const session =  account.createOAuth2Session(
        OAuthProvider.Github,
        "dockapi.vercel.app",
        "dockapi.vercel.app/fail"
      );
      setUser({"session":session}); // Update user state after session creation
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Clear loading state after operation completes
    }
  };


  const getUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      // Handle error here (e.g., display message for guest users)
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Empty dependency array to run only once on mount
console.log("user",user)
  return (
    <div className="w-2/4 h-20 bg-white rounded-3xl flex items-center justify-between ">
      <div className="">
        <Image src="/2.png" width={200} height={200} alt="logo" />
      </div>
      {
      Object.entries(user).length>0 ? ( 
        // Show user information and other functionalities if logged in
        <div
          className="flex items-center gap-3 h-10 w-32 border justify-center bg-white text-2xl text-black rounded-3xl hover:bg-black hover:text-white cursor-pointer"
        >
          Welcome, 
        </div>
      ) : (
        // Show login button or guest UI if not logged in
        <div
          className="flex items-center gap-3 h-10 w-32 border justify-center bg-white text-2xl text-black rounded-3xl hover:bg-black hover:text-white cursor-pointer"
          onClick={login}
        >
         {isLoading ? 'Loading...' : 'Login'} <FaGithub />
        </div>
      )}
    </div>
  );
};

export default NavBar;
