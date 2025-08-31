import React, { useState } from 'react'
import BookingPage from './Component/BookingPage'
import ViewBookings from './Component/ViewBookings';

const App = () => {
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
    const [warning, setWarning] = useState("");

 const [userInfo, setUserInfo] = useState({
        userName: "",
        mob: "",
      });
   
    
  const [tab , setTab] = useState("Home")
  const tabs = {
    "Home" :  <BookingPage userInfo={userInfo} setUserInfo={setUserInfo} availableSlots={availableSlots} setAvailableSlots={setAvailableSlots} warning={warning} setWarning={setWarning}  selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setTab={setTab} />,
    "View Bookings" : <ViewBookings userInfo={userInfo} setUserInfo={setUserInfo} warning={warning} setWarning={setWarning} />
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

      </div>
      {
        tabs[tab]
      }
     
      
      
    </div>
  )
}

export default App