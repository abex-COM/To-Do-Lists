import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useTodoList } from "../Contexts/Context";
export default function KebabMenu() {
  const { showMenu, handleKebab } = useTodoList();

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleKebab}>
        <MoreVertIcon sx={{ color: "white" }} />
      </IconButton>
      {showMenu && (
        <nav className="fixed right-0 top-0 rounded-md bg-sky-500 p-1 shadow-md duration-300">
          <ul className="flex flex-col gap-4">
            <li className="p-1 hover:bg-sky-600">
              <Link to="">TaskList</Link>
            </li>
            <li className="p-1 hover:bg-sky-600">
              <Link to="">Send Feedback</Link>
            </li>
            <li className="p-1 hover:bg-sky-600">
              <Link to="">Follow us</Link>
            </li>
            <li className="p-1 hover:bg-sky-600">
              <Link to="">Settings</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
