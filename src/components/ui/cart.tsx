import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart,decrementItem,clearCart } from "../../store/cartSlice";
import type { Item } from "../../types/types";
function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state: any) => state.cart.cart);
const cartValue = cart.reduce((total: number, item: Item) => {
    return total + (item.price * item.stock);
  }, 0);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-10 bg-gray-50">
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item : Item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded shadow"
              >
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => decrementItem(item)}
                    className="px-3 py-1 bg-gray-800 text-white rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.stock}</span>

                  <button
                    onClick={()=> dispatch(addToCart(item))}
                    className="px-3 py-1 bg-gray-800 text-white rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="ml-3 text-red-500 text-xl"
                    title="Remove item"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold">
              Total: ${cartValue.toFixed(2)}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={()=> dispatch(clearCart())}
                className="px-6 py-2 bg-red-500 text-white rounded"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;