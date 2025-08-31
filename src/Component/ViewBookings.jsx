import axios from "axios";
import React, { useState, useEffect } from "react";

const ViewBookings = ({userInfo,setUserInfo,warning,setWarning}) => {
  const url = import.meta.env.VITE_API_BASE_URL;



  const [bookings, setBookings] = useState([]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userInfo.userName.trim()==="" || userInfo.mob == "" || userInfo.mob.trim() == ""){
      setWarning("Check Username and Mobile Number");
      setTimeout(() => {
        setWarning("");
      }, 3000);
      return
    }
    
        axios.post(`${url}/getbookings`,{userName : userInfo.userName , mob : userInfo.mob})
        .then((res) => {
          // console.log(res.data)
          setBookings(res.data)
        })
        .catch(error=>{
          console.log(error)
        })

        setUserInfo({ userName: "", mob: "" });
      
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="w-4/5 m-4 my-12 p-4 border bg-transparent max-w-4xl rounded-xl flex flex-col items-center">
              <div className="h-6 text-red-600 ">{warning}</div>

        <div className="w-1/1 flex flex-col items-center justify-center gap-3">
          <form
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              value={userInfo.userName}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, userName: e.target.value }))
              }
              className="bg-gray-500 p-2 w-9/10 h-10 rounded-md"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={userInfo.mob}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, mob: e.target.value }))
              }
              className="bg-gray-500 p-2 w-9/10 h-10 rounded-md"
            />
            <button
              type="submit"
              className=" px-8 py-1 bg-green-700 rounded-md text-white cursor-pointer"
            >
              View Bookings
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 w-4/5 max-w-4xl grid grid-cols-2">
              <div className="border-b pb-2 text-2xl">Date</div>
              <div className="border-b pb-2 text-2xl">Time</div>
        {bookings.map((data, index) => (
          <React.Fragment key={index}>
          <div className="border-b pb-2">{data.bookingDate}</div>
          <div className="border-b">{data.bookingTime}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ViewBookings;
