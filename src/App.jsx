import React, { useState } from 'react'
import BookingPage from './Component/BookingPage'

const App = () => {
  
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
  return (
    <div className=''>
      <BookingPage bookedSlots={bookedSlots} setBookedSlots={setBookedSlots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      
      
    </div>
  )
}

export default App