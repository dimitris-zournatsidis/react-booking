import React from 'react';
import './ReservationItem.css';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IBook } from '../../pages/Home/Home';

interface ReservationItemProps {
  item: IBook;
  onDelete: (id: string) => void;
}

export default function ReservationItem(props: ReservationItemProps) {
  //console.log('item in reservationItem', props.item);
  return (
    <div className='reservation_item_container'>
      <div className='info_container'>
        <span>{props.item.name}</span>
        <span>{props.item.checkIn}</span>
        <span>{props.item.checkOut}</span>
      </div>

      <div className='trash_icon_container'>
        <BsFillTrash3Fill
          className='trash_icon'
          onClick={() => props.onDelete(props.item._id)}
        />
      </div>
    </div>
  );
}
