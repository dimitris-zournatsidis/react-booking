import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import { toast } from 'react-toastify';
import axios from 'axios';

export interface IBook {
  _id: string;
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
}

const API_BOOKING_URL = 'http://localhost:5000/api/bookings';

export default function Home() {
  const [bookings, setBookings] = useState<IBook[]>([]);
  const [crudAction, setCrudAction] = useState(false);

  useEffect(() => {
    axios.get(API_BOOKING_URL).then((res) => {
      setBookings(res.data);
    });
    setCrudAction(false);
  }, [crudAction]);

  function handleDelete(booking: IBook) {
    if (window.confirm(`Are you sure you want to delete the booking by ${booking.name}?`)) {
      axios.delete(API_BOOKING_URL + `/${booking._id}`).then(() => {
        setCrudAction(true);
        toast.warn(`Reservation is deleted`);
      });
    }
  }

  return (
    <div className='home_page_container'>
      <Header />

      {bookings.length === 0 ? (
        <div className='no_reservations_label'>No reservations found</div>
      ) : (
        bookings.map((booking) => {
          return <ReservationItem key={booking._id} booking={booking} onDelete={() => handleDelete(booking)} />;
        })
      )}
    </div>
  );
}
