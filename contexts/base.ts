import { createContext, useContext } from 'react';
import { User } from 'types';

interface Context {
  loading: boolean;
  user: User | null;
  logout: () => void;
  setUserFromJwtOrClear: () => void;
}
export const BaseContext = createContext<Context>({
  loading: false,
  user: null,
  logout: () => {},
  setUserFromJwtOrClear: () => {},
});
export const useBaseContext = () => {
  const context = useContext(BaseContext);
  return context;
};
