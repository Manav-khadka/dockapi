import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
interface UploadFormProps {
  isUploadForm: boolean;
  setisUploadForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const uploadFormStyle: React.CSSProperties = {
  position: "fixed",
  height: "80%",
  width: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  background: "white",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "auto",
};

const UploadForm = ({ isUploadForm, setisUploadForm }: UploadFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [dockerLink, setDockerLink] = useState("");
  const [dockerCommand, setDockerCommand] = useState("");
  const [environmentDetails, setEnvironmentDetails] = useState("");
  const [documentationLink, setDocumentationLink] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);

      console.log("Selected image:", image);
    }
  };
  const preset_key = "dxkinsbe";
  const cloud_name = "dk3gyeopv";

  const handleUpload = () => {
    if (
      projectName === "" ||
      projectDescription === "" ||
      githubLink === "" ||
      dockerLink === "" ||
      dockerCommand === "" ||
      environmentDetails === "" ||
      documentationLink === "" ||
      !image
    ) {
      alert("Please fill in all the fields");
      return;
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", image as File);
        formData.append("upload_preset", preset_key);
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            formData
          )
          .then((response) => {
            console.log(response.data.secure_url);
            const data = {
              title: projectName,
              description: projectDescription,
              github: githubLink,
              docker: dockerLink,
              docker_command: dockerCommand,
              environment: environmentDetails,
              documentation: documentationLink,
              image: response.data.secure_url,
            };
            console.log(data);
            setisUploadForm(false);
            alert("Project uploaded successfully");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={uploadFormStyle}>
      <div className="text-xl pr-2 pt-2 flex justify-end cursor-pointer ">
        <AiOutlineCloseCircle onClick={() => setisUploadForm(false)} />
      </div>
      <div className="flex justify-center">
        <div className="w-3/4">
          <div className="text-2xl font-bold">Upload Your Project</div>
          <div className="text-sm">
            Fill in the details below to upload your project
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Project Name"
              onChange={(e) => setProjectName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <textarea
              placeholder="Project Description"
              onChange={(e) => setProjectDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="GitHub Link"
              onChange={(e) => setGithubLink(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Docker Link"
              onChange={(e) => setDockerLink(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Docker Command"
              onChange={(e) => setDockerCommand(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <textarea
              placeholder="Environment details"
              onChange={(e) => setEnvironmentDetails(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Documentation Link"
              onChange={(e) => setDocumentationLink(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            <text>Choose project image:</text>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 rounded-md"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
