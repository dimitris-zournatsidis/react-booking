import React from 'react';
import './ReservationItem.css';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IBook } from '../../pages/Home/Home';

interface ReservationItemProps {
  booking: IBook;
  onDelete: (booking: IBook) => void;
}

export default function ReservationItem(props: ReservationItemProps) {
  return (
    <div className='reservation_item_container'>
      <div className='info_container'>
        <span>{props.booking.name}</span>
        <span>{props.booking.email}</span>
        <span>{props.booking.checkIn}</span>
        <span>{props.booking.checkOut}</span>
      </div>

      <div className='trash_icon_container'>
        <BsFillTrash3Fill className='trash_icon' onClick={() => props.onDelete(props.booking)} />
      </div>
    </div>
  );
}
