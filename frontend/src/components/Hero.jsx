import React from "react";
import { Link } from "react-router-dom";
import { image } from "../../helper";

const Hero = () => {
  return (
    <div class="bg-white">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section class="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
          <div class="flex flex-col justify-center sm:text-center lg:text-left xl:w-5/12 ">
            <p class="mb-4 font-semibold text-[#dd6b20] md:mb-6 md:text-lg xl:text-xl">
              Very proud to introduce our reunionhub
            </p>

            <h1 class="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
              Reconnect and Remember
            </h1>

            <p class="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
            "Welcome to our reunion hub! Reconnect with old friends, reminisce about cherished memories, and make new ones at our upcoming event. Explore photos, RSVP, and stay updated on schedules and activities. Join us for a weekend of laughter, nostalgia, and celebration!"






            </p>

            <div class="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/register"
                class="inline-block rounded-lg bg-dBlue px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Start now
              </Link>

              {/* <a href="#" class="inline-block rounded-lg bg-orange px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Take tour</a> */}
            </div>
          </div>

          <div class="flex justify-center items-center lg:h-auto xl:w-5/12">
            {/* <img src={image.scsitimage} loading="lazy" alt="Photo by Fakurian Design" className="" />
             */}
            <video controls autoPlay loop >
              <source src={image.reunion} type="video/mp4" />
            </video>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
