import React from 'react'
import { image } from '../../helper'

const WhyUs = () => {

    const data = [
        {
        image : image.slider1,
        heading : 'Heading',
        description : "Description",
    },
        {
        image : image.slider1,
        heading : 'Heading',
        description : "Description",
    },
        {
        image : image.slider1,
        heading : 'Heading',
        description : "Description",
    },
]
  return (
    <> 

    
    <h1 className='py-5'> Why Us?</h1>
    <div className='flex gap-20'>
    
    {data.map((data, index) =>(
        <div>


    
        <div>
            <img className='' src={image.slider1} width={100} />
        </div>
        <div>
            <h1>Pointer</h1>
            <p className='text-xs'>Description</p>
        </div>
    </div>
    ))}
    </div>
    </>
  )
}

export default WhyUs