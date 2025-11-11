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

type ContextShape = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
};

export const UserContext = createContext<ContextShape | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Use the Vite dev-server proxy (see vite.config.ts) so we avoid CORS
      // during local development. The proxy rewrites /api -> http://localhost:3000.
      const { data } = await axios.get(`/api/users`);
      console.log(data);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
};
