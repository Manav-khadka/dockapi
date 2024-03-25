import axios from "axios";

export async function upload(file) {
    const formData = new FormData();
    alert(file.size);
    formData.append("image", file);
    console.log("Uploading file", formData);

    const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log(response.data);

    return response.data;
}