import React from 'react';
import ShopCard from './ShopCard';
import { CartProvider, useCart } from 'react-use-cart';
import cities from './cities.json'; // Import your cities data from cities.json

const Shop = () => {
  const { addItem } = useCart();

  const handleAddToCart = (item) => {
    addItem(item);
  };

  return (
    <CartProvider>
      <div className="justify-center grid grid-cols-3">
        {cities.map((city) => (
          <ShopCard key={city.id} {...city} />
        ))}
      </div>
    </CartProvider>
  );
};

export default Shop;
