import React, { useState } from "react";
import axios from "../axios";

const Gallery = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

   
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("gallery", selectedFiles[i]);
      }

      const response = await axios.post("/admin/website-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        window.alert("Images Uploaded Successfully");
        console.log(response.data);

        setSelectedFiles([]);
        setImagePreviews([]);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      // Handle errors here
    }
  };

  return (
    <>
      <div className="">
        <h1 className="text-center montserrat text-2xl font-bold">
          Add Items To Gallery
        </h1>

        <input
          type="file"
          name="files"
          id="files"
          className="mt-4"
          onChange={handleFileChange}
          multiple
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0} 
        >
          Upload
        </button>
      </div>

      { selectedFiles.length> 0 && (

        <> 
      <h1 className="my-10 text-xl montserrat">Preview</h1>
      <div className="preview-container flex gap-20 my-10">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="image-preview">
            <img src={preview} alt={`Preview ${index}`} width={100} />
          </div>
        ))}
      </div>
      </>
     )}
    </>
  );
};

export default Gallery;
