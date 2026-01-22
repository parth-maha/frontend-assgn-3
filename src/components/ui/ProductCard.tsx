import React, { useEffect, useState } from "react";
import type { Item } from "../../types/types";
import { CiShoppingCart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductCard: React.FC = () => {
  const productId = useParams();
  const [product, setProduct] = useState<Item>();
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  const fetchProductById = async () => {
    const res = await api.get(`/product/${productId}`);
    setProduct(res.data);
    return;
  };

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  return (
    <div className="w-full max-h-72 pt-10 max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
      <a href="#">
        <img
          className="rounded-base mb-6"
          src={product?.images?.at(0)}
          alt="product image"
        />
      </a>
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
            {product?.rating}
          </span>
        </div>
        <a href="#">
          <h5 className="text-xl text-heading font-semibold tracking-tight">
            {product?.title}
          </h5>
        </a>
        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-extrabold text-heading">
            {product?.price}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            <CiShoppingCart />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
