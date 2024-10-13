import { IconButton, Input, InputAdornment } from "@mui/material";
import Kebab from "./Kebab";

import { ArrowBack, CheckCircle, Clear, Search } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useTodoList } from "../Contexts/Context";
export default function NavBar({ children }) {
  const [searchInput, setSearchInput] = useState(false);
  function handleShowInput() {
    setSearchInput((prev) => !prev);
  }
  return (
    <nav className="flex h-10 items-center justify-between bg-sky-600 p-1 py-2 text-sm text-sky-200 shadow-md">
      {!searchInput ? (
        <>
          <div className="flex gap-2">
            <CheckCircle
              sx={{
                fontSize: {
                  xs: "2rem", // Extra small devices min 0px- 600px
                  sm: "2.5rem", // Small devices (600px and up)
                  md: "3rem", // Medium devices (960px and up)
                  lg: "2rem", // Large devices (1280px and up)
                },
              }}
            />
            <select className="border-none bg-transparent outline-none">
              <option>All Lists</option>
              <option>All Lists</option>
              <option>All Lists</option>
            </select>
          </div>
          <div className="flex items-center">
            <div>
              <IconButton onClick={handleShowInput}>
                <Search sx={{ color: "white" }} />
              </IconButton>
            </div>

            <Kebab />
          </div>
        </>
      ) : (
        <SearchInput onshowInput={handleShowInput} />
      )}
    </nav>
  );
}

function SearchInput({ onshowInput }) {
  const { setSearchQuery, searchQuery, dispatch } = useTodoList();
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className="flex gap-3 p-3">
      <IconButton onClick={onshowInput}>
        <ArrowBack sx={{ color: "white" }} />
      </IconButton>
      <div className="flex items-center justify-center">
        <Search />
        <Input
          type="text"
          disableUnderline
          sx={{ border: "none", color: "white", outline: "none" }}
          value={searchQuery}
          inputRef={inputElement}
          onChange={(e) =>
            dispatch({ type: "setSearchQuery", payload: e.target.value })
          }
        />
        {searchQuery && (
          <InputAdornment position="end">
            <IconButton onClick={() => setSearchQuery("")}>
              <Clear sx={{ color: "white" }} />
            </IconButton>
          </InputAdornment>
        )}
      </div>
    </div>
  );
}
