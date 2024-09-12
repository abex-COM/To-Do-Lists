import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { TodoListProvider } from "./Contexts/Context";
import NewTask from "./Pages/NewTask";
export default function App() {
  return (
    <div className="h-screen bg-sky-900 font-Outfit">
      <TodoListProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="newTask" element={<NewTask />} />
          </Routes>
        </BrowserRouter>
      </TodoListProvider>
    </div>
  );
}
