import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { TodoListProvider } from "./Contexts/Context";
import NewTask from "./Pages/NewTask";
import PageNotFound from "./Pages/PageNotFound";
import TaskList from "./Pages/TaskList";
export default function App() {
  return (
    <div className="h-screen overflow-hidden bg-sky-900 font-Outfit">
      <TodoListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<TaskList />} />
            </Route>
            <Route path="newTask" element={<NewTask />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TodoListProvider>
    </div>
  );
}
