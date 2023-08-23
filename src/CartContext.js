import React, { createContext, useContext, useReducer } from 'react';

// Define initial cart state
const initialCartState = {
  items: [],
};

// Create the CartContext
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists in the cart, increment its quantity
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      } else {
        // If the item is not in the cart, add it with quantity 1
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }

    case 'INCREMENT_ITEM':
      const incrementedItems = state.items.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, items: incrementedItems };

    case 'DECREMENT_ITEM':
      const decrementedItems = state.items.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
      );
      return { ...state, items: decrementedItems };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: filteredItems };

    case 'REMOVE_ITEM_IF_ZERO':
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: updatedItems };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};



const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
// Custom hook to access the CartContext
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
