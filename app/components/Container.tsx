'use client'
import Image from "next/image"
import { FaBook, FaBookOpen, FaDocker, FaGithub, FaGithubSquare } from "react-icons/fa"

type Data = {
    id: number
    title: string
    image: string
    github: string
    docker: string
    documentation: string
    username: string
    profileImage: string

    }
   

const Container =({data}:{data:Data})=>{

    const onclickGithub =()=>{
        console.log("github is clicked")
    }
    const onclickDocker =()=>{
        console.log("docker is clicked")
    }
    const onclickDocumentation =()=>{
        alert(`documentation is clicked ${data.id}`)
    }

    return (
        <>
        <div className="items-center flex flex-col">
        <div className="h-38 w-48 rounded-2xl  justify-around p-1 flex flex-col bg-white">
            <div className="flex justify-between m-1">
            <Image src="/todo.png" width={100} height={100} className=" rounded-3xl" alt="manav-khadka"></Image>
            <div className="text-black text-4xl  justify-between flex flex-col mb-2">
                <div className='' onClick={onclickGithub}>
                <FaGithubSquare />
                </div>
                <div onClick={onclickDocker}><FaDocker className="text-blue-400 " /></div>
                
                <div onClick={onclickDocumentation}><FaBookOpen className="text-3xl" /></div>
            </div>
               
            </div>
            <div className="h-12 w-44 m-1 border rounded-xl flex justify-around items-center">
                    
                    <Image src="/manav.jpg" width={30} height={30} className="rounded-full" alt="profile"></Image>
               
                <div className="text-[12px]">{data.username}</div>
            </div>
            
            </div>
            <div className="text-white ">
                {data.title}
               </div>  
                </div>      
        </>
    )
}

export default Container