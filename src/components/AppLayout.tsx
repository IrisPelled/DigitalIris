import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-14">
        <Outlet />
      </main>
    </>
  );
}
