import { create } from 'zustand';
import cartApi from '@/services/cart/api/cart.api';
import { ICartItem } from '@/services/cart/types/cart.types';

interface CartStore {
  cartItemsCount: number;
  cartItems: ICartItem[];
  setCartItemsCount: (count: number) => void;
  setCartItems: (items: ICartItem[]) => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItemsCount: 0,
  cartItems: [],
  setCartItemsCount: (count) => set({ cartItemsCount: count }),
  setCartItems: (items) => set({ cartItems: items }),
  
  fetchCart: async () => {
    try {
      const response = await cartApi.getCart();
      if (response.data?.data?.cart?.items) {
        const items = response.data.data.cart.items;
        set({
          cartItems: items,
          cartItemsCount: response.data.data.item
        });
      } else {
        set({
          cartItems: [],
          cartItemsCount: 0
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      set({
        cartItems: [],
        cartItemsCount: 0
      });
    }
  }
}));
