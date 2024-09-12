import { Mic } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";

export default function FooterInput() {
  return (
    <footer className="fixed bottom-0 w-full bg-sky-500 p-1 px-2">
      <Input
        type="text"
        sx={{ width: "100%", color: "white", fontWeight: "300" }}
        startAdornment={
          <IconButton>
            <Mic sx={{ color: "white" }} />
          </IconButton>
        }
      />
    </footer>
  );
}
