import {FC, ReactNode, useState, createContext, useEffect} from 'react';

interface ITodoContext {}

interface IContextProvider {
  children: ReactNode;
}

export const TodoContext = createContext({} as ITodoContext);

const TodoProvider: FC<IContextProvider> = ({children}) => {
  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
