import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    cartsItems: localStorage.getItem('cartsItems')
      ? JSON.parse(localStorage.getItem('cartsItems'))
      : [],
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART_ITEM':
      // add to cart
      const newItem = action.payload;
      const itemExists = state.cart.cartsItems.find(
        (item) => item._id === newItem._id
      );
      const cartsItems = itemExists
        ? state.cart.cartsItems.map((item) =>
            item._id === itemExists._id ? newItem : item
          )
        : [...state.cart.cartsItems, newItem];
      localStorage.setItem('cartsItems', JSON.stringify(cartsItems));
      return { ...state, cart: { ...state.cart, cartsItems } };
    case 'REMOVE_ITEM': {
      // remove item:
      const cartsItems = state.cart.cartsItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartsItems', JSON.stringify(cartsItems));
      return { ...state, cart: { ...state.cart, cartsItems } };
    }
    case 'CLEAR_CART': {
      return { ...state, cart: { ...state.cart, cartsItems: [] } };
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartsItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    case 'SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_WAY':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
