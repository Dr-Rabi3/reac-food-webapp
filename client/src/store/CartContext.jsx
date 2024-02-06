import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  clearCart: () => { }
});

function cartReducer(state, action) {
  if (action.type === "Add_Item") {
    const existId = state.items.findIndex((item) => item.id === action.item.id);
    const updateState = [...state.items];
    if (existId > -1) { // exited
      const item = updateState[existId];
      const updateItem = {
        ...item,
        quantity: item.quantity + 1,
      };
      updateState[existId] = updateItem;
    }
    else {
      updateState.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateState };
  }
  if (action.type === 'Remove_Item') { 
    const existId = state.items.findIndex((item) => item.id === action.id);
    const item = state.items[existId];
    const updateState = [...state.items];
    if (item.quantity === 1) {
      // updateState = updateState.filter((item) => item.id !== action.id);
      updateState.splice(existId, 1);
    }
    else {
      const updateItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      updateState[existId] = updateItem;
    }
    return { ...state, items: updateState };
  }
  if (action.type === 'Clear_Cart') {
    return {...state, items: []};
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart,dispatchCart] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCart({ type: 'Add_Item', item });
  }
  function removeItem(id) {
    dispatchCart({ type: "Remove_Item", id });
  }
  function clearCart() {
    dispatchCart({ type: "Clear_Cart" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
