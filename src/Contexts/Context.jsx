import { createContext, useContext, useEffect, useState } from "react";

const TodoListContext = createContext();

function TodoListProvider({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleKebab = (e) => {
    e.stopPropagation();

    setShowMenu((prev) => !prev);
  };

  const callBack = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", callBack);
    return () => {
      document.removeEventListener("click", callBack);
    };
  }, []);

  return (
    <TodoListContext.Provider
      value={{ showMenu, searchQuery, setSearchQuery, handleKebab }}
    >
      {children}
    </TodoListContext.Provider>
  );
}

function useTodoList() {
  const context = useContext(TodoListContext);
  if (context === undefined)
    throw new Error("Provider used outside of its scope");
  return context;
}

export { TodoListProvider, useTodoList };
