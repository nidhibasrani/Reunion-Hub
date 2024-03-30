import React, {useState, useEffect} from 'react'
import axios from '../axios'

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([])


    useEffect(()=>{
        fetchMyEvents()
    }, [])
    const fetchMyEvents = async ()=>{
        try {
            const res = await axios.get(`/user/my-events`)
            if(res.status === 200 ){
                // console.log('my events', res.data)
                setMyEvents(res.data)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <>

  {myEvents?.length > 0 ? myEvents.map((event, index) => (
    <div key={index}>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
    </div>
  )) : <p>No events found</p>
}
    </>
  )
}

export default MyEvents