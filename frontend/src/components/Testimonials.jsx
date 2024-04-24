import React from 'react'

const Testimonials = () => {
    return (
        <div className="flex justify-center bg-[#001524] py-5">
            <div className="flex flex-col justify-center items-center pb-10">
                <div className="text-white text-3xl font-medium my-10">Our Trusted</div>
                <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
                    <div className="overflow-hidden w-full m-4 flex justify-center bg-white rounded-lg md:w-[33%] px-8">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <div className="items-center justify-center flex py-2">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <img src="https://source.unsplash.com/150x150/?man,boy" alt="" className="rounded-full" />
                                    <div className="text-stone-600 font-medium m-2">Best Platform for Reunions. </div>
                                    <div className="font-bold">John Doe</div>
                                    <div className="text-cyan-600 italic"><a href="#">Client</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full m-4 flex justify-center bg-white rounded-lg md:w-[33%] px-8">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <div className="items-center justify-center flex py-2">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <img src="https://source.unsplash.com/150x150/?girl" alt="" className="rounded-full" />
                                    <div className="text-stone-600 font-medium m-2">Best Platform for Reunions.</div>
                                    <div className="font-bold">Jessie</div>
                                    <div className="text-cyan-600 italic"><a href="#">Client</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full m-4 flex justify-center bg-white rounded-lg md:w-[33%] px-8">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <div className="items-center justify-center flex py-2">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <img src="https://source.unsplash.com/150x150/?girl,woman" alt="" className="rounded-full" />
                                    <div className="text-stone-600 font-medium m-2">Best Platform for Reunions.</div>
                                    <div className="font-bold">Davina Claire</div>
                                    <div className="text-cyan-600 italic"><a href="#">Client</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Testimonials