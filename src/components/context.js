import { createContext } from 'react';

const dataContext = createContext({
  flag: false,
  setFlag: null,
});

export default dataContext;
