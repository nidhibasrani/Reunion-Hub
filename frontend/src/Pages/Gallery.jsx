import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/website-gallery`);
      if (res.status === 200) {
        setGallery(res.data);
        console.log(res.data);
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
        <h1 className=" py-10 text-xl montserrat font-bold text-center">
          Gallery
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
                    className="w-[500px] h-full object-cover"
                  />
                 
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
