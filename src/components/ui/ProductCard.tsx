import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { IoArrowBack } from "react-icons/io5";
import Loaders from "./loaders";

const ProductCard: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => (await api.get(`/product/${productId}`)).data,
    enabled: !!productId,
  });

  if (isLoading)
    return (
      <Loaders/>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        Product not found
      </div>
    );

  return (
    <div className="flex justify-center items-center w-full min-h-56] p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <IoArrowBack /> Back
        </button>
        <div className="mt-8 mb-6 flex justify-center h-64 w-full">
          <img
            className="h-full w-full object-contain rounded-lg"
            src={product?.images?.at(0)}
            alt={product?.title}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Rating: {product?.rating}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
                {product?.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1 capitalize">{product?.category}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
            <span className="text-3xl font-extrabold text-gray-900">
              ${product?.price}
            </span>

            <button
              type="button"
              onClick={() => dispatch(addToCart(product))}
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg text-sm px-6 py-3 transition-all active:scale-95 shadow-md"
            >
              <CiShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;