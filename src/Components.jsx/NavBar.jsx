import { IconButton, Input, InputAdornment } from "@mui/material";
import Kebab from "./Kebab";

import { ArrowBack, Clear, Search } from "@mui/icons-material";
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
            <img
              src="../src/assets/icons8-check.svg"
              className="h-8 w-8"
              alt="image"
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
  const { setSearchQuery, searchQuery } = useTodoList();
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
      <div>
        <Input
          type="text"
          sx={{ border: "none", color: "white", outline: "none" }}
          value={searchQuery}
          inputRef={inputElement}
          onChange={(e) => setSearchQuery(e.target.value)}
          startAdornment={<Search />}
          endAdornment={
            searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery("")}>
                  <Clear sx={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </div>
    </div>
  );
}
