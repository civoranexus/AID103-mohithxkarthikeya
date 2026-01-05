import React, { useState } from "react";
import API from "../api/api";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await API.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message + ": " + response.data.filename);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Something went wrong during upload"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
