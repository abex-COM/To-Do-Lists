import { Outlet } from "react-router-dom";
import FooterInput from "../Components.jsx/FooterInput";
import NavBar from "../Components.jsx/NavBar";
import PlusIcon from "../Components.jsx/PlusIcon";

export default function HomePage() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <PlusIcon />
    </div>
  );
}
