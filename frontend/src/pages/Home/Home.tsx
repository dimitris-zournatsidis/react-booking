import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import ReservationItem from '../../components/ReservationItem/ReservationItem';

export default function Home() {
  const [items, setItems] = useState<[]>([]);

  useEffect(() => {
    const bookInfo = JSON.parse(localStorage.getItem('book-info') || '[]');
    //console.log('booki info!!!!!', bookInfo);
    if (bookInfo) {
      setItems(bookInfo);
    }
  },[]);

  //console.log('items in home', items);

  function handleDelete(id: string) {
    //items.filter(item => item.id != id)
  }
  

  return (
    <div className='home_page_container'>
      <Header />

      {items.map((item) => {
        console.log('ena item', item);
        return (
          <ReservationItem
            key={item}
            item={item} 
            onDelete={() => handleDelete(item)} // TODO !!!!!!!!!
          />
        )
      })}
    </div>
  );
}
