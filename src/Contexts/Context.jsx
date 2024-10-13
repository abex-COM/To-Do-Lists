import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  status: "loading",
  showMenu: false,
  searchQuery: "",
  newTaskName: "",
  taskDate: "",
  tasks: [
    { id: 1, taskName: "Tasyrtsydtayrdyardt7at7dr7tq7qd7k 1", date: "2024-10-11" },
    { id: 2, taskName: "Task 1", date: "2024-10-12" }, // Duplicate task name, but unique id
  ],
};

const TodoListContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setShowMenu":
      return { ...state, showMenu: action.payload };
    case "setSearchQuery":
      return { ...state, searchQuery: action.payload };
    case "addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "setTask":
      return { ...state, newTaskName: action.payload };
    case "setDate":
      return { ...state, taskDate: action.payload };
    case "deleteTask":
      const selectedIds = action.payload; // This should be an array of IDs
      return {
        ...state,
        tasks: state.tasks.filter((task) => !selectedIds.includes(task.id)), // Corrected to exclude the IDs
      };
    default:
      return state; // Default case to return the current state
  }
}

function TodoListProvider({ children }) {
  const [
    { status, tasks, showMenu, searchQuery, newTaskName, taskDate },
    dispatch,
  ] = useReducer(reducer, initialState);

  const callBack = (e) => {
    if (e.target.closest(".MuiIconButton-root")) return; // If click is on the IconButton, don't close
    dispatch({ type: "setShowMenu", payload: false });
  };

  function handleDelete(taskIds) {
    dispatch({ type: "deleteTask", payload: taskIds }); // Send the array of selected IDs
  }

  useEffect(() => {
    document.addEventListener("click", callBack);
    return () => {
      document.removeEventListener("click", callBack);
    };
  }, []);

  return (
    <TodoListContext.Provider
      value={{
        showMenu,
        searchQuery,
        dispatch,
        newTaskName,
        taskDate,
        tasks,
        handleDelete,
      }}
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
