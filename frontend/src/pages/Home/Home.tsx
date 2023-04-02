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
  const [items, setItems] = useState<IBook[]>([]);
  const [crudAction, setCrudAction] = useState(false);

  useEffect(() => {
    // const bookInfo = JSON.parse(localStorage.getItem('book-info') || '[]');
    // if (bookInfo) {
    //   setItems(bookInfo);
    // }

    axios.get(API_BOOKING_URL).then((res) => {
      console.log('res!!!', res);

      setItems(res.data);
    });
    setCrudAction(false);
  }, [crudAction]);

  function handleDelete(id: string) {
    // const itemsAfterDelete = items.filter((item) => item.id !== id);
    // setItems(itemsAfterDelete);
    // localStorage.setItem('book-info', JSON.stringify(itemsAfterDelete));
    // toast.warn(`Reservation is deleted`);

    if (window.confirm('Are you sure you want to delete this booking?')) {
      axios.delete(API_BOOKING_URL + `/${id}`).then(() => {
        setCrudAction(true);
        toast.warn(`Reservation is deleted`);
      });
    }
  }

  return (
    <div className='home_page_container'>
      <Header />

      {items && items.length === 0 ? (
        <div className='no_reservations_label'>No reservations found</div>
      ) : (
        items &&
        items.map((item) => {
          return (
            <ReservationItem
              key={item._id}
              item={item}
              onDelete={() => handleDelete(item._id)}
            />
          );
        })
      )}
    </div>
  );
}
