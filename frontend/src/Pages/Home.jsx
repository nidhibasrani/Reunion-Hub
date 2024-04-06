import React, { useState, useEffect } from "react";
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { image } from "../../helper/";
import EventCard from "../components/EventCard";
import WhyUs from "../components/WhyUs";
import { useSelector } from "react-redux";
import Testimonials from "../components/Testimonials";
import Hero from "../components/Hero";



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

  const user = useSelector(state => state.auth.user);

  return (
    <>
      <div className="home py-10 ">
        {/* <h1 className="text-3xl text-red-500">Home</h1> */}
        {/* <Slider {...sliderSettings}>
          {images.map((img) => (
            <div className="w-screen h-screen" key={img.id}>
              <img className="w-screen h-screen" src={img.src} alt={img.alt} />
            </div>
          ))}
        </Slider> */}
        <Hero />
      </div>
      <div className="text-center  ">
        <h1 className="text-3xl montserrat my-10 font-bold"> Upcoming Events</h1>
        <div className="">

          <EventCard />

        </div>
      <div className="my-10">
        <Testimonials />
      </div>
        <div className="flex flex-col items-center my-10 pb-10">
          <WhyUs />
        </div>
      </div>
    </>
  );
};

export default Home;
