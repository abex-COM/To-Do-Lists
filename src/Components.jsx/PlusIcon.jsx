import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PlusIcon() {
  const navige = useNavigate();
  return (
    <div className="fixed bottom-12 right-10 ">
      <IconButton
        onClick={()=>navige("/newTask")}
        sx={{ background: "white", ":hover": { backgroundColor: "green" } }}
      >
        <AddIcon sx={{ color: "blue" }} />
      </IconButton>
    </div>
  );
}
