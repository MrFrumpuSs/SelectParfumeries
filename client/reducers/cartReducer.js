import {createSlice} from "@reduxjs/toolkit";

const countItems = (items) => {
    let count = 0;
    items.map(item=>{
        count += +item.count;
    });

    return count;
}

const cartReducer = createSlice({
    name: "cartReducer",
    initialState: {
        cart: [],
        count: 0
    },
    reducers: {
        getCart: (state) => {
            if(localStorage.getItem('cart')) {
                try {
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    state.cart = cart;
                    state.count = countItems(state.cart);

                } catch (e) {
                    console.log(e);
                }
            }
        },
        addToCart: (state, action) => {
            let products = state.cart.find(e=> e.variation === action.payload.variation);

            if(!products) {
                state.cart.push({...action.payload, count: 1});
            }

            state.count = countItems(state.cart);

            localStorage.setItem('cart', JSON.stringify(state.cart));
            
        },
        setCount: (state, action) => {

            let foundIndex = state.cart.findIndex(e => e.variation == action.payload.variation);

            state.cart[foundIndex] = {...state.cart[foundIndex], count: action.payload.count};
            
            state.count = countItems(state.cart);

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(e => e.variation !== action.payload.variation);
            
            state.count = countItems(state.cart);


            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCart: (state) => {
            state.cart = [];
            state.count = 0;
            localStorage.removeItem('cart');
        }
    }
});

export default cartReducer.reducer;
export const { getCart, addToCart, setCount, removeFromCart, removeCart } = cartReducer.actions;