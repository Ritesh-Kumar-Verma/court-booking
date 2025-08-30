import React, { useState } from "react";

const BookingPage = () => {
  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBooking = (slot) => {
    if (bookedSlots.includes(slot)) {
      alert("This slot is already booked.");
      return;
    }
    setBookedSlots([...bookedSlots, slot]);
    alert(`You have successfully booked ${slot}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Court Booking</h1>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg shadow-md text-center cursor-pointer 
                ${bookedSlots.includes(slot) ? "bg-gray-300" : "bg-blue-100 hover:bg-blue-200"} 
                ${selectedSlot === slot ? "border-blue-500" : ""}`}
              onClick={() => !bookedSlots.includes(slot) && setSelectedSlot(slot)}
            >
              <p className="text-lg">{slot}</p>
              {!bookedSlots.includes(slot) && (
                <button
                  className="mt-2 py-1 px-4 bg-green-500 text-white rounded"
                  onClick={() => handleBooking(slot)}
                >
                  Book
                </button>
              )}
              {bookedSlots.includes(slot) && (
                <p className="mt-2 text-sm text-gray-500">Booked</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedSlot && !bookedSlots.includes(selectedSlot) && (
        <div className="mt-6 text-center">
          <h3 className="text-xl">You have selected: {selectedSlot}</h3>
          <button
            className="mt-4 py-2 px-6 bg-blue-500 text-white rounded"
            onClick={() => handleBooking(selectedSlot)}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
