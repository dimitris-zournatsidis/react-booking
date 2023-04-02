import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import { toast } from 'react-toastify';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const bookInfo = JSON.parse(localStorage.getItem('book-info') || '[]');
    if (bookInfo) {
      setItems(bookInfo);
    }
  }, []);

  function handleDelete(id: string) {
    const itemsAfterDelete = items.filter((item) => item.id !== id);
    setItems(itemsAfterDelete);
    localStorage.setItem('book-info', JSON.stringify(itemsAfterDelete));
    toast.warn(`Reservation is deleted`);
  }

  return (
    <div className='home_page_container'>
      <Header />

      {items && items.length === 0 ? (
        <div className='no_reservations_label'>No reservations found</div>
      ) : (
        items.map((item) => {
          return (
            <ReservationItem
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          );
        })
      )}
    </div>
  );
}
