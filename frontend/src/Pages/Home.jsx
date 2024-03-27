import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { image } from "../../helper/";
import EventCard from "../components/EventCard";
import WhyUs from "../components/WhyUs";

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    { id: 1, src: image.slider1, alt: "Image 1" },
    { id: 2, src: image.slider2, alt: "Image 2" },
    { id: 3, src: image.slider3, alt: "Image 3" },
  ];

  return (
    <>
      <div className="home ">
        <h1 className="text-3xl text-red-500">Home</h1>
        <Slider {...sliderSettings}>
          {images.map((img) => (
            <div className="w-screen h-screen" key={img.id}>
              <img className="w-screen h-screen" src={img.src} alt={img.alt} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center items-center py-20">
        <EventCard />
      </div>
      <div className="flex flex-col items-center">
        <WhyUs/>
      </div>
    </>
  );
};

export default Home;
