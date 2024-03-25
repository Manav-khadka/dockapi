import React, { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from 'axios'; // Consider using axios for a cleaner approach

import {upload} from '../upload.js';

interface UploadFormProps {
  isUploadForm: boolean;
  setisUploadForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const uploadFormStyle: React.CSSProperties = {
  position: 'fixed',
  height: '80%',
  width: '50%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  background: 'white',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'auto',
};

const UploadForm = ({ isUploadForm, setisUploadForm }: UploadFormProps) => {
  const [image, setImage] = useState<File | null>(null);

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
      
  console.log('Selected image:', image);
    }
  };

const  handleUpload =  () => {
    console.log('Uploading image:', image);
    
    const res= upload(image);
    
  }

 
  return (
    <div style={uploadFormStyle}>
      <div className='text-xl pr-2 pt-2 flex justify-end cursor-pointer ' onClick={() => setisUploadForm(false)}><AiOutlineCloseCircle /></div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <div className="text-2xl font-bold">Upload Your Project</div>
          <div className="text-sm">Fill in the details below to upload your project</div>
          <div className="flex flex-col gap-4 mt-4">
            <input type="text" placeholder="Project Name" className="border border-gray-300 p-2 rounded-md" />
            <textarea placeholder="Project Description" className="border border-gray-300 p-2 rounded-md" />
            <input type="text" placeholder="GitHub Link" className="border border-gray-300 p-2 rounded-md" />
            <input type="text" placeholder="Docker Link" className="border border-gray-300 p-2 rounded-md" />
            <input type="text" placeholder="Docker Command" className="border border-gray-300 p-2 rounded-md" />
            <textarea placeholder="Environment details" className="border border-gray-300 p-2 rounded-md" />
            <input type="text" placeholder="Documentation Link" className="border border-gray-300 p-2 rounded-md" />
            <text>Choose project image:</text>
            <input type="file" onChange={handleImageChange} className="border border-gray-300 p-2 rounded-md" />
            <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
