import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  status: "loading",
  showMenu: false,
  searchQuery: "",
  newTaskName: "",
  taskDate: "",
  tasks: [],
};

const TodoListContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setShowMenu":
      return { ...state, showMenu: action.payload };
    case "dataFetched":
      return { ...state, tasks: action.payload, status: "ready" };
    case "setSearchQuery":
      return { ...state, searchQuery: action.payload };
    case "addTasks":
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
        newTaskName: "",
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

  useEffect(() => {
    const fetchedData = JSON.parse(localStorage.getItem("tasks"))||[];
    if (fetchedData) {
      dispatch({ type: "dataFetched", payload: fetchedData });
    }
  }, []);
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
        status,
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
