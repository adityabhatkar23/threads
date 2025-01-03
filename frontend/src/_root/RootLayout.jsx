import { Outlet } from "react-router-dom";
import Leftsidebar from "../components/shared/Leftsidebar";
import Rightsidebar from "../components/shared/Rightsidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen gap-4">
      <Leftsidebar />
      <section className="flex min-h-screen flex-1 flex-col items-center pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-scroll overflow-x-hidden custom-scrollbar">
        <Outlet />
      </section>

      <Rightsidebar />
    </div>
  );
};

export default RootLayout;
