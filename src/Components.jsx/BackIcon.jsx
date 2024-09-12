import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
export default function BackIcon() {
  return (
    <div>
      <IconButton>
        <ArrowBackIcon
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "3rem",
              md: "4rem",
              lg: "5rem",
              xl: "6rem",
            },
          }}
        />
      </IconButton>
    </div>
  );
}
