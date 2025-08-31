import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingPage = ({
  userInfo,
  setUserInfo,
  availableSlots,
  setAvailableSlots,
  selectedSlot,
  setSelectedSlot,
  setTab,
  warning,
  setWarning
}) => {

  const url = import.meta.env.VITE_API_BASE_URL

 


  const [selectedDate, setSelectedDate] = useState("");

  
  const handleCheckAvailability = ()=>{
    if(selectedDate == ""){
      window.alert("Select a date")
      return
    }
    console.log(selectedDate)
    axios.post(`${url}/getavailability`,{date:selectedDate})
    .then(res=>{
      // console.log(res.data)
      setAvailableSlots(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }


  const handleSetDate =  (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleBook = (e) => {
    e.preventDefault();
    console.log(warning);
    if (selectedDate == "") {
      setWarning("Enter Date!!!");
      setTimeout(() => {
        setWarning("");
      }, 3000);
    } else if (selectedSlot.length == 0) {
      setWarning("Select at least 1 time slot");
      setTimeout(() => {
        setWarning("");
      }, 3000);
    }
    else if(userInfo.userName.trim()==="" || userInfo.mob == "" || userInfo.mob.trim() == ""){
      setWarning("Check Name and Mobile Number")
      setTimeout(() => {
        setWarning("");
      }, 3000);
    }
    else{
      const data = []

      for(const i of selectedSlot){
        const booking = {
          userName:userInfo.userName,
          mobileNumber:userInfo.mob,
          bookingDate : selectedDate,
          bookingTime : i

        }
        data.push(booking)
      }
      
      axios.post(`${url}/addbookings`,data)
      .then(res=>{
        setWarning("Booking Successfull!")
        etTimeout(() => {
        setWarning("");
      }, 3000);
      setUserInfo({
      userName: "",
      mob: ""
    })
        // console.log(res.data)
      })
      .catch(error=>{
        console.log(error)
      })
    }



  };


  // useEffect(()=>{

  //   console.log(userInfo)
  // },[userInfo])

  

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 underline">
          Court Booking
        </h1>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            Select From Available Time Slots
          </h2>
          <div className="flex flex-row max-sm:flex-col justify-between p-2 m-3 ">

          <div className="  flex items-center">
            Select Date :{" "}
            <input
              type="date"
              value={selectedDate}
              onChange={handleSetDate}
              className="outline-none"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="bg-green-400 p-2 w-fit  border rounded cursor-pointer" onClick={handleCheckAvailability}>Check Availability</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            { !availableSlots.length>0 ? "Select a date" :  availableSlots.map((slot, index) => (
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
            <form
              className="flex flex-col items-center gap-3 w-full"
              onSubmit={(e) => {
                handleBook(e);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                onChange={(e)=>{
                  setUserInfo((prev)=>{return {...prev,userName:e.target.value}})
                }}
                className="bg-gray-500 p-2 w-9/10 h-10 rounded-md"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                onChange={(e)=>{
                  setUserInfo((prev)=>{return {...prev,mob:e.target.value}})
                }}
                className="bg-gray-500 p-2 w-9/10 h-10 rounded-md"
              />
              <button
                type="submit"
                className="h-10 px-8 bg-green-700 rounded-md text-white cursor-pointer  "
              >
                Book
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Date : {selectedDate}</h1>
            {selectedSlot.map((slot, index) => (
              <div
                key={index}
                className="w-full flex justify-between border-b-2 border-gray-500 pb-2"
              >
                {slot}
                <button
                  className="bg-red-400 border rounded cursor-pointer px-2"
                  onClick={() => {
                    setSelectedSlot((prev) => {
                      return prev.filter((current) => current != slot);
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
