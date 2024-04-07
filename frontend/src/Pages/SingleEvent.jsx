import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAxios from "../axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

import { Splide, SplideSlide } from "@splidejs/react-splide";

const SingleEvent = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const mainSlider = useRef(null);
  const thumbnailSlider = useRef(null);
  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  const fetchEvent = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user/event/${id}`
      );

      if (res.status === 200) {
        setEvent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mainSlider.current && thumbnailSlider.current) {
      mainSlider.current.splide.sync(thumbnailSlider.current.splide);
    }
  }, [event]);
  const handleJoinEvent = async () => {
    if (!isAuthenticated) {
      navigate("/register");
    }

    if (
      event &&
      event.participants.some((participant) => participant._id === user._id)
    ) {
      toast.error("You have already joined this event");
      return; // Return to prevent further execution
    }
    try {
      const res = await authAxios.post(`/user/participate/${id}`, {
        amount: event?.price,
      });

      if (res.data.success) {
        const redirectUrl = res.data?.data.instrumentResponse.redirectInfo.url;
        console.log("redirect url", redirectUrl);
        // Redirect the user to the gateway page URL
        window.location.href = redirectUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again later.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      {event ? (
        <>
          <div className="event-details">
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="">
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src={import.meta.env.VITE_APP_URL + event.featuredImage}
                    width={700}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {event.title}
                    <br className="hidden lg:inline-block" />
                  </h1>
                  <p className="mb-8 leading-relaxed">{event.description}</p>
                  <div className="flex justify-center">
                    <button
                      className="mt-8 px-4 py-2 bg-orange text-white rounded-md"
                      onClick={handleJoinEvent}
                    >
                      Join This Event
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="slider-container mx-auto px-4 sm:px-6 lg:px-8 my-20 bg-dBlue">
              <h2 className="text-center py-10 montserrat text-2xl font-bold text-white">
                Gallery
              </h2>
              {/* <Slider {...settings}>
                {event.gallery.map((image, index) => (
                  <div key={index}>
                    <img
                      src={import.meta.env.VITE_APP_URL + image}
                      width={500}
                      alt={`Slide ${index}`}
                    />
                  </div>
                ))}
              </Slider> */}

              <div className=" flex flex-col gap-10 slider-container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
                {/* <h2>Gallery</h2> */}
                <div>
                  <Splide
                    className="my-10"
                    options={{
                      type: "fade",
                      heightRatio: 0.5,
                    }}
                    ref={mainSlider}
                  >
                    {event.gallery.map((image, index) => (
                      <SplideSlide
                        className="flex justify-center items-center"
                        key={index}
                      >
                        <img
                          src={import.meta.env.VITE_APP_URL + image}
                          alt={`Slide ${index}`}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                  <Splide
                    options={{
                      fixedWidth: 100,
                      fixedHeight: 64,
                      isNavigation: true,
                      gap: 10,
                      focus: "center",
                      pagination: false,
                      arrows: false,
                    }}
                    ref={thumbnailSlider}
                  >
                    {event.gallery.map((image, index) => (
                      <SplideSlide
                        className="flex justify-center items-center"
                        key={index}
                      >
                        <img
                          src={import.meta.env.VITE_APP_URL + image}
                          alt={`Thumbnail ${index}`}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-center my-5 montserrat text-xl font-bold">
            People Who Joined This Event
          </h2>
          {isAuthenticated && event.participants.length > 0 && (
            <div className="overflow-x-auto flex justify-center items-center">
              <table className="table-auto border-collapse border border-gray-400 w-[400px]">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Avatar</th>
                    <th className="px-4 py-2">Username</th>
                  </tr>
                </thead>
                <tbody>
                  {event.participants.map((participant) => (
                    <tr key={participant._id}>
                      <td className="border px-4 py-2 text-center">
                        <img
                          src={
                            import.meta.env.VITE_APP_URL +
                            participant.profileImage
                          }
                          alt={participant.userName}
                          className="avatar w-12 h-12 rounded-full mx-auto"
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <Link to={`/single-user/${participant?._id}`}>
                          {participant.userName}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleEvent;
