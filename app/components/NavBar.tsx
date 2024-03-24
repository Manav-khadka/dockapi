'use client';
import firebase from "firebase/compat/app";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
    const signIn = async () => {
        alert("hi")
        try {
            const provider = new firebase.auth.GithubAuthProvider();
            await firebase.auth().signInWithPopup(provider);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-2/4 h-20 bg-white rounded-3xl flex items-center justify-between pr-10">
            <div className="">
                <Image src="/2.png" width={200} height={200} alt="logo" />
            </div>
            <div
                className="flex items-center gap-3 h-10 w-32 border justify-center bg-white text-2xl text-black rounded-3xl hover:bg-black hover:text-white cursor-pointer"
                onClick={signIn}
            >
                Login <FaGithub />
            </div>
        </div>
    );
};

export default NavBar;
