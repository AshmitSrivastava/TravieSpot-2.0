import React from 'react';
import ShopCard from './ShopCard';
//import { CartProvider, useCart } from 'react-use-cart';
import cities from './cities.json'; // Import your cities data from cities.json
import axios from 'axios';

axios.defaults.withCredentials = true;

const Shop = () => {
  const handleAddToCart = async (item) => {
    try {
      await axios.post('http://localhost:3000/api/cart/add', {
        id : item.id,
        productId: item.id,
        quantity: 1,
        price : item.price,
      }, {withCredentials : true});
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  return (
    <div className="justify-center grid grid-cols-3">
      {cities.map((city) => (
        <ShopCard key={city.id} {...city} addItem={handleAddToCart} />
      ))}
    </div>
  );
};

export default Shop;
