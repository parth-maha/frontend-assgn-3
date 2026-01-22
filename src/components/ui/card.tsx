import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import type { Item } from "../../types/types";
import { useDispatch} from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface CardProps {
  item: Item;
  onRemove: (item: Item) => void;
}

const Card: React.FC<CardProps> = ({ item, onRemove }) => {
  const dispatch = useDispatch()
  
  function handleAddToCart (){
    dispatch(addToCart(item))
  }

  if (!item) {
    return <div className="text-center p-3">Out of Stock</div>;
  }
  return (
    <div className="border border-gray-300 rounded-lg p-4 relative bg-white shadow-sm flex flex-col gap-2 w-full">
      <h3 className="text-lg font-semibold">
        {item.title}
      </h3>
      <div className="">
        {item.price >= 500 ? (
          <p className="text-green-500 font-semibold text-sm">
            ${item.price}{" "}
            <span className="ml-1 text-white p-1 text-xs bg-cyan-400 rounded-sm">
              {" "}
              Premium
            </span>
          </p>
        ) : (
          <p className="text-green-500">${item.price}</p>
        )}
      </div>
      <div>
        {item.stock < 5 ? (
          <span className="text-black font-semibold text-sm">
            {item.stock}{" "}
            <span className="ml-1 text-white text-xs p-1 bg-orange-500 rounded-sm">
              {" "}
              Limited Quantity
            </span>
          </span>
        ) : (
          <p>{item.stock}</p>
        )}
      </div>
      <p className="text-gray-600 text-sm">{item.category.toUpperCase()}</p>
      <div className="mt-1">&nbsp;</div>
      <div className="flex gap-x-2 justify-around">
        <button onClick={() => handleAddToCart} className="bg-blue-500 w-full text-white rounded-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;