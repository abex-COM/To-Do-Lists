import React, { useEffect, useState } from "react";
import { useTodoList } from "../Contexts/Context";
import Loader from "../Components.jsx/Loader";
export default function TaskList() {
  const [checkedTasks, setCheckedTasks] = useState({});
  const { tasks, handleDelete, searchQuery, status } = useTodoList();
  const [filteredTask, setFilteredTask] = useState(tasks);
  function handleCheckBox(taskID) {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskID]: !prev[taskID],
    }));
  }

  useEffect(() => {
    if (searchQuery.trim() == "") {
      setFilteredTask(tasks);
    } else {
      const searchedItem =
        tasks.length > 0
          ? tasks.filter((task) =>
              task.taskName
                .toLocaleLowerCase()
                .includes(searchQuery.toLocaleLowerCase()),
            )
          : tasks;
      setFilteredTask(searchedItem);
    }
  }, [searchQuery, tasks]);

  const checkedTasksCount = Object.keys(checkedTasks).filter(
    (taskID) => checkedTasks[taskID],
  ).length;

  const selectedTaskIDs = Object.keys(checkedTasks).filter(
    (taskID) => checkedTasks[taskID],
  );
  return (
    <div className="fixed h-full w-full text-sky-300">
      <div className="h-8 w-full text-center">
        {checkedTasksCount ? (
          <button
            onClick={() => handleDelete(selectedTaskIDs)} // Ensure it's sending an array of IDs
            className="cursor-pointer text-red-600 hover:text-red-500 sm:bottom-20 sm:left-64"
          >
            Delete
          </button>
        ) : null}
      </div>
      <ul className="relative grid h-full content-start items-center gap-2 overflow-y-scroll rounded-md px-2 pb-20 sm:grid-cols-2 sm:pb-32 md:grid-cols-3">
        {status == "loading" ? (
          <div className="absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Loader />
          </div>
        ) : tasks.length == 0 ? (
          "No task added, please add the task"
        ) : filteredTask == 0 ? (
          "No such task"
        ) : (
          filteredTask.map((task) => (
            <li
              key={task.id}
              className="grid h-max cursor-pointer grid-cols-[2rem_1fr_auto] items-center justify-center gap-2 bg-sky-700 p-3 pl-5 text-justify hover:text-blue-400 hover:underline"
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                onChange={() => handleCheckBox(task.id)}
                checked={!!checkedTasks[task.id]}
              />
              <p className="capitalize">
                {task.taskName.length > 20
                  ? task.taskName.slice(0, 10) + "..."
                  : task.taskName}
              </p>
              <p className="text-xs">{task.date}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
