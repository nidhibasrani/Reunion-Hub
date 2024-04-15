import React, { useEffect, useState } from "react";
import axios from "../axios";

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("/admin/website-gallery");
      if (res.status === 200) {
        setGallery(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, imageIndex) => {
    try {
      const res = await axios.delete(`/admin/website-gallery/${id}/${imageIndex}`);
      if (res.status === 200) {
        // If deletion is successful, fetch the updated gallery
        fetchGallery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-xl montserrat font-bold text-center">
          Manage Gallery
        </h1>

        {gallery.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-center items-center gap-20 my-10"
            >
              {item.gallery.map((imagePath, imageIndex) => (
                <div className="flex flex-col justify-center items-center">
                  <img
                    key={imageIndex}
                    src={import.meta.env.VITE_APP_URL + imagePath}
                    alt=""
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <button onClick={() => handleDelete(item._id, imageIndex)}>Delete</button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ManageGallery;
