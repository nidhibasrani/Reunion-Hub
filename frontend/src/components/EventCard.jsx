import React from "react";
import { image } from "../../helper";

const EventCard = () => {
  const eventData = [
    {
      image: image.slider1,
      heading: 'This is heading 1',
      description: "This is description 1"
    },
    {
      image: image.slider2,
      heading: 'This is heading 2',
      description: "This is description 2"
    },
    {
      image: image.slider3,
      heading: 'This is heading 3',
      description: "This is description 3"
    },
  ];

  return (
    <>
    <div className="flex gap-5">
      {eventData.map((data, index) => (
        <div key={index}> 
          <div>
            <img src={data.image} width={400} alt="img" />
          </div>
          <div>
            <h1>{data.heading}</h1>
            <p className="text-xs">{data.description}</p>
          </div>
        </div>
      ))}
      </div>
      
    </>
  );
};

export default EventCard;
