"use client";

import React, { useState } from "react";
import CaretRight from "../../../public/CaretRight.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/features/store";
import { updateCart } from "@/redux/features/cart-slice";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  tags: string;
  image: string;
  description: string;
  available: boolean;
}

interface CartItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  tags: string;
  image: string;
  description: string;
  available: boolean;
  quantity: number;
}


const ProductDetail: React.FC<{product: Product}> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cartReducer);

  const [quantity, setQuantity] = useState(1); // Start with quantity 1

  const increment = () => {
    setQuantity(quantity + 1);
    updateCartQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartQuantity(quantity - 1);
    }
  };

  const updateCartQuantity = (newQuantity: number) => {
    const itemIndex = cartArray.findIndex((item) => item._id === product._id);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: newQuantity } : item
      );
      dispatch(updateCart(updatedCart));
    }
  };

  const addToCart = () => {
    const itemIndex = cartArray.findIndex((item) => item._id === product._id);

    if (itemIndex === -1) {
      const newCartItem: CartItem = {
        ...product,
        quantity: quantity,
      };
      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    } else {
      updateCartQuantity(quantity);
    }
  };

  return (
    <div className="bg-white pb-12">
      <div className="bg-hero-image bg-cover bg-center h-80 w-full flex justify-center items-center mt-[30px]">
        <div className="">
          <h1 className="text-white font-sans text-5xl font-bold ">Shop Details</h1>
          <div className="flex justify-center items-center">
            <h2 className="text-white leading-[56px] text-inter"> Home </h2>
            <Image src={CaretRight} alt="icon" />
            <h2 className="text-primary">Shop details</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:mx-8 xl:mx-[200px] gap-6 xl:gap-40 p-10 md:py-32 2xl:mx-[600px] 2xl:gap-32">
        <div className="flex justify-center">
          <Image src={product.image} alt={product.name} width={400} height={400} />
        </div>
        <div className="flex flex-col items-left mt-8">
          <p className="text-green-600 text-center lg:text-left"> {product.available ? "In Stock" : "Out of Stock"}</p>
          <h1 className="text-[48px] font-bold font-sans text-center lg:text-left lg:mt-0"> {product.name} </h1>
          <p className="text-gray-600 text-center lg:text-left">{product.description}</p>
          <p className="font-bold text-xl mt-3 text-center lg:text-left"> Price: ${product.price} </p>
          <p className="text-primary mt-3 text-center lg:text-left">Category: {product.category}</p>

          <div className="flex justify-center gap-7 lg:justify-between lg:gap-0 items-center mt-6 ">
            <div className="flex justify-center items-center">
              <button onClick={decrement} className='border w-10 h-10 flex justify-center items-center'>-</button>
              <span className='border w-10 h-10 text-center p-2'>{quantity}</span>
              <button onClick={increment} className='border w-10 h-10 flex justify-center items-center'>+</button>
            </div>

            <button onClick={addToCart} className="flex justify-center items-center bg-primary h-10 px-6 gap-3 hover:bg-amber-400 text-white"> Add to Cart </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
