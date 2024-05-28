import { CartService, useCartService } from 'hooks/useCartService.hook';
import { createContext, useContext } from 'react';

export const CartCTX = createContext<CartService>({} as CartService);

export const useCart = () => useContext<CartService>(CartCTX);

const CartProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const cartService = useCartService();

  return <CartCTX.Provider value={cartService}>{children}</CartCTX.Provider>;
};

export default CartProvider;
