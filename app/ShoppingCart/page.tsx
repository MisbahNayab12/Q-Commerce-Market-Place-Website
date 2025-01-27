'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CaretRight from '../../public/CaretRight.png';
import Delete from '../../public/X.png';
import { useAppSelector } from '@/redux/features/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/features/store';
import { updateCart } from '@/redux/features/cart-slice';
import Link from 'next/link';

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

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const [CartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0); // NEW STATE to store the total bill amount.


  const incrementCartItem = (index: number) => {
    const updatedCart = CartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const decrementCartItem = (index: number) => {
    const updatedCart = CartItems.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const removeCartItem = (index: number) => {
    const updatedCart = CartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  // Select the cart items from Redux state.
  const cartArray: CartItem[] = useAppSelector((state) => state.cartReducer);

  // Update CartItems from Redux whenever cartArray changes.
  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  // Function to calculate the total amount dynamically.
  useEffect(() => {
    const calculateTotal = () => {
      const total = CartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total); // Update the total amount in state.
    };

    calculateTotal(); // Recalculate total every time CartItems changes.
  }, [CartItems]);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-hero-image bg-cover bg-center h-80 w-full flex justify-center items-center mt-[30px]">
        <div>
          <h1 className="text-white font-sans text-5xl font-bold">Shopping Cart</h1>
          <div className="flex justify-center items-center">
            <h2 className="text-white leading-[56px] text-inter"> Home </h2>
            <Image src={CaretRight} alt="icon" />
            <h2 className="text-primary">Shopping cart</h2>
          </div>
        </div>
      </div>

      <div className="lg:mx-[150px]  md:ml-12">
        <div>
          {CartItems.length !== 0 ? (
            <div className="hidden md:grid grid-cols-5 place-items-center font-bold mt-14">
              <h1 className="mr-32">Product</h1>
              <h1 className="hidden md:block">Price</h1>
              <h1 className="hidden md:block">Quantity</h1>
              <h1 className="hidden md:block">Total</h1>
              <h1>Remove</h1>
            </div>
          ) : null}

          {CartItems.map((item, index) => (
            <div key={item._id}>
              <div className="md:grid md:grid-cols-5 place-items-center mt-10">
                <div className="flex justify-start gap-3 w-[200px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-[100px]"
                    width={200}
                    height={200}
                  />
                  <h3 className="font-bold">{item.name}</h3>
                </div>

                <h3 className='mt-3 md:mt-0'> ${item.price}</h3>
                <div className="flex justify-center items-center">
                  <div className="flex justify-center items-center border gap-5 w-30 h-10 px-8 rounded-full">
                    <button onClick={() => decrementCartItem(index)}>-</button>
                    <span>{item.quantity}</span>

                    <button onClick={() => incrementCartItem(index)}>+</button>
                  </div>
                </div>
                <h2 className="font-bold hidden md:block">${item.price * item.quantity}</h2>
                <h2 onClick={() => removeCartItem(index)} className='text-red-500 md:hidden'> Remove </h2>
                <div className=" hover:opacity-30 cursor-pointer hidden md:block">
                  <Image
                    src={Delete}
                    alt="image"
                    onClick={() => removeCartItem(index)}
                  />
                </div>
              </div>
              <div className="border mt-5"></div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-start py-10 mt-7 gap-10 p-3">
            <div className="w-full md:w-1/2">
              <h1 className="font-bold text-xl md:text-2xl">Coupon Code</h1>
              <div className="border mt-5 p-4">
                <p className="text-sm md:text-base text-gray-500">
                  Enter coupon code to get amazing discount!
                </p>
                <div className="flex flex-col md:flex-row mt-4 gap-4">
                  <input
                    type="text"
                    placeholder="Enter your code"
                    className="border py-2 px-4 rounded-md focus:outline-none w-full"
                  />
                  <button className=" bg-primary text-white hover:bg-amber-400 py-2 px-4 rounded-md w-full md:w-auto">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="font-bold text-xl md:text-2xl">Total Bill</h1>
              <div className="border mt-5 p-4">
                <div className="flex justify-between items-center font-bold ">
                  <p className="text-sm md:text-base">Cart Subtotal</p>
                  <p className="text-sm md:text-base">${totalAmount.toFixed(2)}</p> {/* Displaying Total Bill */}
                </div>

                <div className="flex justify-between items-center text-sm md:text-base text-gray-500 mt-2">
                  <p>Shipping Charges</p>
                  <p>$0.00</p>
                </div>


              </div>
              <div className="border px-4">
                <div className="flex justify-between items-center font-bold my-3">
                  <p className="text-sm md:text-base">Total Amount</p>
                  <p className="text-sm md:text-base">${totalAmount.toFixed(2)}</p> {/* Same as Subtotal */}
                </div>
              </div>
              <Link href="/Checkout">
                <button className=" bg-primary text-white hover:bg-amber-400 py-2 px-4 rounded-md w-full mt-3"> Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
