import React, { useEffect, useState } from "react";

const BookingPage = ({bookedSlots,setBookedSlots,selectedSlot,setSelectedSlot,setTab}) => {
 
  const [selectedDate , setSelectedDate] = useState("")
  const [warning , setWarning] = useState("")

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  

  const handleSetDate=(e)=>{
    setSelectedDate(e.target.value)
  }

 
  useEffect(()=>{
    console.log(selectedDate)
  },[selectedDate])

  const handleBook=(e)=>{
    e.preventDefault()
    console.log(warning)
    if(selectedDate == ""){
      setWarning("Enter Date!!!")
      setTimeout(()=>{setWarning("")},3000)
    }
  }

  return (
    <div>
      
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 underline">Court Booking</h1>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-4"> Select From Available Time Slots</h2>
          <div className=" p-2 m-3">Select Date : <input type="date" value={selectedDate} onChange={handleSetDate} className="outline-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md text-center cursor-pointer
              ${
                selectedSlot.includes(slot)
                  ? "bg-cyan-300"
                  : "bg-blue-100 hover:bg-blue-300"
              } 
              `}
                onClick={() => {
                  if (selectedSlot.includes(slot)) {
                    setSelectedSlot((prev) => {
                      return prev.filter((current) => current != slot);
                    });
                  } else {
                    setSelectedSlot((prev) => [...prev, slot]);
                  }
                }}
              >
                <p className="text-lg">{slot}</p>

                
              </div>
            ))}
          </div>
        </div>

<div className="m-4 my-12 p-4 border bg-transparent max-w-4xl    rounded-xl flex flex-col">
     
      <div className="w-1/1  flex flex-col items-center justify-center gap-3">
      <div className="h-6 text-red-600 ">{warning}</div>
        <form className="flex flex-col items-center gap-3 w-full" onSubmit={(e)=>{handleBook(e)}}>
          <input type="text" placeholder='Name' className="bg-gray-500 p-2 w-9/10 h-10 rounded-md" />
          <input type="text" placeholder="Mobile Number" className="bg-gray-500 p-2 w-9/10 h-10 rounded-md" />
          <button type="submit" className="h-10 px-8 bg-green-700 rounded-md text-white cursor-pointer  " >
            Book
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Date : {selectedDate}</h1>
      {selectedSlot.map((slot,index)=>
      (
        <div key={index} className="w-full flex justify-between border-b-2 border-gray-500 pb-2">
          {slot}
          <button className="bg-red-400 border rounded cursor-pointer px-2" onClick={
            ()=>{
              setSelectedSlot(prev=>{
                return prev.filter(current => current != slot)
              })
            }
          }>Remove</button>
        </div>
      ))}

      </div>
      </div>
    </div>



    </div>
  );
};

export default BookingPage;
