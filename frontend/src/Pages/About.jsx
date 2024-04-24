import React from "react";
import { image } from "../../helper/index";
const About = () => {
  return (
    // AboutUs.js

    <div className="flex flex-col justify-center items-center  my-10 ">

      

      <div className="flex justify-center items-center my-10">
      <img src={image.aboutimage} width={500} height={500} />
      </div>
      <h2 className="montserrat py-2 text-2xl">Welcome to Our Reunion!</h2>
      <p className="text-sm px-5">
        Our annual reunion brings together alumni from all walks of life to
        reconnect, reminisce, and celebrate cherished memories. Since its
        inception, our reunion has been a symbol of unity and camaraderie, and
        we're excited to continue that tradition this year.
      </p>

      <h3 className="font-bold montserrat text-xl py-2">Organizing Team</h3>
      <p>
        Meet the dedicated team behind the scenes who work tirelessly to make
        our reunion a success. From event planning to logistics, each member
        plays a vital role in ensuring that every attendee has a memorable
        experience.
      </p>
      {/* Add more sections as needed */}
    </div>
  );
};

export default About;
