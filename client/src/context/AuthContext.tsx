import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Teaching-friendly minimal user context.
export type User = { id?: string; name?: string } | null;
export type Product = { id?: string; name?: string };

type ContextShape = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
};

// 1 create context
export const UserContext = createContext<ContextShape | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Use the Vite dev-server proxy (see vite.config.ts) so we avoid CORS
      // during local development. The proxy rewrites /api -> http://localhost:3000.
      try {
        const { data } = await axios.get(`/api/products`);
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, users, setUsers, products, setProducts }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 2 using the context
export const useAuth = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
};
