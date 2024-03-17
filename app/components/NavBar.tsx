'use client'
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const NavBar =() =>{
    const signIn = ()=> {
        console.log("sign in clicked")
    }
        return (
                <div className="w-2/4 h-20 bg-white rounded-3xl justify-between items-center flex p-10 ">
                    <div className="text-3xl text-black  ">
                        DockAPI
                    </div>
                    <div onClick={signIn} className="flex items-center gap-3 h-10 w-32 border justify-center bg-white text-2xl text-black rounded-3xl hover:bg-black hover:text-white">
                       Login
                        <FaGithub />
                    </div>

                </div>
        )
}

export default NavBar;