import  Container from "./components/Container";
import NavBar from "./components/NavBar";

export default function Home() {
  const data =[
    {
      id:1,
      title:"Todo API",
      image:"/todo.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com",
      username:"manav-khadka",
      profileImage:"/manav.jpg"
    },
    {
      id:2,

      title:"School API",
      image:"/school.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com"
      ,
      username:"manav-khadka",
      profileImage:"/manav.jpg"
    }
    ,
    {
      id:3,
      title:"Social Media API",
      image:"/social.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com",username:"manav-khadka",
      profileImage:"/manav.jpg"
    }
    ,
    {
      id:4,
      title:"Social Media API",
      image:"/social.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com",username:"manav-khadka",
      profileImage:"/manav.jpg"
    }
    ,
    {
      id:5,
      title:"Social Media API",
      image:"/social.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com",username:"manav-khadka",
      profileImage:"/manav.jpg"
    }
    ,
    {
      id:6,
      title:"Social Media API",
      image:"/social.png",
      github:"github.com",
      docker:"docker.com",
      documentation:"docs.com",username:"manav-khadka",
      profileImage:"/manav.jpg"
    }
   ]

  return (
    <main className={`${"w-screen h-full p-10 bg-slate-900 "} `}>
    
      <div className="flex justify-center flex-col items-center"> 
      <NavBar/>

      <div className="flex justify-center gap-10 p-10 flex-wrap w-5/6">
       {
          data.map((item,index)=>{
            return <Container key={index} data={item} />
          })  
       }
        
        </div>
    </div>
    </main>
  );
}
