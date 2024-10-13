import { CheckCircle } from "@mui/icons-material";

import { useTodoList } from "../Contexts/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export default function NewTask() {
  const { newTaskName, taskDate, dispatch, tasks } = useTodoList();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentDate = getCurrentDate();
  useEffect(() => {
    dispatch({ type: "setDate", payload: currentDate });
  }, []);
  useEffect(() => {
    if (newTaskName !== "") setError("");
  }, []);
  function handleForm(e) {
    e.preventDefault();
    if (newTaskName == "" || taskDate == "") {
      setError("Field is required");
      return;
    }
    const newTasks = {
      ...tasks,
      id: Date.now(),
      taskName: newTaskName,
      date: taskDate,
    };
    dispatch({ type: "addTask", payload: newTasks });
    navigate("/");
  }
  return (
    <form
      onSubmit={handleForm}
      className="flex h-screen flex-col bg-sky-900 p-2"
    >
      <div className="grid gap-2">
        <label className="text-sky-300">What is to be done? </label>
        <textarea
          className="w-full rounded-md bg-slate-200 p-4 text-slate-400 outline-sky-500"
          rows={2}
          cols={30}
          placeholder="Add new task"
          value={newTaskName}
          onChange={(e) =>
            dispatch({ type: "setTask", payload: e.target.value })
          }
        />
        <span className="h-10 text-red-600">{error && error}</span>
      </div>
      <div className="flex w-max flex-col gap-4">
        <label className="text-sky-300">Due date</label>
        <input
          className="rounded-md bg-sky-400 p-4"
          type="date"
          sx={{ color: "skyblue" }}
          value={taskDate}
          onChange={(e) =>
            dispatch({ type: "setDate", payload: e.target.value })
          }
        />
      </div>
      <div className="fixed bottom-4 right-4">
        <button>
          <CheckCircle
            sx={{
              color: "skyblue",

              fontSize: {
                xs: "2rem", // Extra small devices min 0px- 600px
                sm: "2.5rem", // Small devices (600px and up)
                md: "3rem", // Medium devices (960px and up)
                lg: "3rem", // Large devices (1280px and up)
              },
            }}
          />
        </button>
      </div>
    </form>
  );
}
