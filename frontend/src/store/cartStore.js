import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
    
  addToCart: (product, qty) => set((state) => {
    const existItem = state.cartItems.find((x) => x._id === product._id);
    let newItems;
    if (existItem) {
      newItems = state.cartItems.map((x) => 
        x._id === existItem._id ? { ...product, qty: existItem.qty + qty } : x
      );
    } else {
      newItems = [...state.cartItems, { ...product, qty }];
    }
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return { cartItems: newItems };
  }),

  removeFromCart: (id) => set((state) => {
    const newItems = state.cartItems.filter((x) => x._id !== id);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return { cartItems: newItems };
  }),

  clearCart: () => {
    localStorage.removeItem('cartItems');
    return { cartItems: [] };
  }
}));

export default useCartStore;