import React from 'react'
import { image } from '../../helper'

const WhyUs = () => {

    const data = [
        {
            image: image.people,
            heading: 'Alumni Community',
            description: "Connect with fellow graduates, forge lifelong friendships, and access valuable networking opportunities.",
        },
        {
            image: image.satisfaction,
            heading: 'Reunion Experiences',
            description: "Relive cherished memories, reconnect with old friends, and celebrate your alma mater's legacy.",
        },
        {
            image: image.handshake,
            heading: 'Support Network',
            description: "Receive ongoing assistance, guidance, and resources to empower your personal and professional growth.",
        },
    ]
    return (
        <>


            <h1 className='py-10 montserrat text-3xl font-bold '> Why Us</h1>
            <div className='flex gap-20 justify-center  items-center  flex-wrap'>

                {data.map((data, index) => (
                    <div className='flex flex-col justify-center items-center'>



                        <div>
                            <img className='' src={data.image} width={70} />
                        </div>
                        <div className='flex flex-col items-center py-2 text-center w-[250px] gap-2 '>
                            <h1 className='text-xl'>{data.heading}</h1>
                            <p className='text-sm'>{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WhyUs