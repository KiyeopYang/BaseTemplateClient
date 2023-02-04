import { createContext, useContext } from 'react';
import { User } from 'types';

interface Context {
  loading: boolean;
  user: User | null;
  logout: () => void;
  setUserFromJwtOrClear: () => void;
}
export const DdleContext = createContext<Context>({
  loading: false,
  user: null,
  logout: () => {},
  setUserFromJwtOrClear: () => {},
});
export const useDdleContext = () => {
  const context = useContext(DdleContext);
  return context;
};
