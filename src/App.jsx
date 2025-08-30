import React, { useState } from 'react'
import BookingPage from './Component/BookingPage'
import ViewBookings from './Component/ViewBookings';

const App = () => {
  
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);

   const [userInfo, setUserInfo] = useState({
      username: "Guest",
      mob: "0000000000",
    });
    
  const [tab , setTab] = useState("Home")
  const tabs = {
    "Home" :  <BookingPage bookedSlots={bookedSlots} setBookedSlots={setBookedSlots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setTab={setTab} />,
    "View Bookings" : <ViewBookings/>
  }

  return (
    <div className=''>
      <div
        className="flex justify-around p-2
      border-b-2 text-lg"
      >
        
        {
          Object.keys(tabs).map((tabName,index)=>{
              return (<div key={index} className="login cursor-pointer hover:text-blue-400" onClick={()=>setTab(tabName)}>
                {tabName}
        </div>)
          })

        }

        <div className="text-right pr-3">Username : {userInfo.username}</div>
      </div>
      {
        tabs[tab]
      }
     
      
      
    </div>
  )
}

export default App