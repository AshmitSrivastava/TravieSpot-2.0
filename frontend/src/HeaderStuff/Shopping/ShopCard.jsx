import React from 'react';
import { useCart } from 'react-use-cart';

const ShopCard = (props) => {
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem({
      id: props.title,
      name: props.title,
      price: (props.price),
      quantity: 1,
      src:(props.src)
    });
  };
  return (
    <div className="flex items-center justify-center">
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2 bg-white">
      <img
        src={props.src}
        alt="Product"
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{props.description}
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {props.price}
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
};

export default ShopCard;
