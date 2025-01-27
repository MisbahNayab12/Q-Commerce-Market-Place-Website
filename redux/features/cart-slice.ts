import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image'

interface CartItemState {
    _id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    tags: string;
    image: string,
    description: string,
    available: boolean,
    quantity: number
}

const initialState: CartItemState[] = []

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart:(state, action:PayloadAction<CartItemState[]>) => {
            return action.payload
        }
    }
})

export const {updateCart} = cart.actions
export default cart.reducer

