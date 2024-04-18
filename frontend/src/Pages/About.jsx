import React from 'react'
import {image} from '../../helper/index'

const About = () => {
  return (
   // AboutUs.js

    <div>
       <h2>My Component</h2>
        <img src={image.aboutus} alt="Example"  />

      <h2>Welcome to Our Reunion!</h2>
      <p>
        Our annual reunion brings together alumni from all walks of life to reconnect, reminisce, and celebrate
        cherished memories. Since its inception, our reunion has been a symbol of unity and camaraderie, and we're
        excited to continue that tradition this year.
      </p>
      
      <h3>Organizing Team</h3>
      <p>
        Meet the dedicated team behind the scenes who work tirelessly to make our reunion a success. From event
        planning to logistics, each member plays a vital role in ensuring that every attendee has a memorable
        experience.
      </p>
      {/* Add more sections as needed */}
    </div>
  );
};

export default About;

  


