import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        shippingInfo: {}
    },
    reducers: {
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action){
            const item = action.payload

            const isItemExist = state.items.find( i => i.product === item.product);
            
            if(isItemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            }else{
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                
                axios.post('/api/vi/cart/add', item)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            return state
            
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            });
            axios.put(`/api/v1/cart/${action.payload}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            });
            axios.patch(`/api/v1/cart/${action.payload}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            });
            axios.delete(`/api/v1/cart/remove/${action.payload}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            return {
                ...state,
                items: filterItems
            }
        },saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        }
       ,
       orderCompleted(state, action) {
        localStorage.removeItem('shippingInfo');
        localStorage.removeItem('cartItems');
        sessionStorage.removeItem('orderInfo');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            }
        }

    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest, 
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
 } = actions;

export default reducer;
