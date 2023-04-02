import React from 'react';
import './ReservationItem.css';
import { BsFillTrash3Fill } from 'react-icons/bs';

interface ReservationItemProps {
  item: {
    id: string;
    name: string;
    email: string;
    date: string;
  };
  onDelete: (id: string) => void;
}

export default function ReservationItem(props: ReservationItemProps) {
  //console.log('item in reservationItem', props.item);
  return (
    <div className='reservation_item_container'>
      <div className='info_container'>
        <span>{props.item.name}</span>
        <span>{props.item.email}</span>
        <span>{props.item.date}</span>
      </div>

      <div className='trash_icon_container'>
        <BsFillTrash3Fill
          className='trash_icon'
          onClick={() => props.onDelete(props.item.id)}
        />
      </div>
    </div>
  );
}
