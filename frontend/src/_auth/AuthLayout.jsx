import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen w-screen flex justify-center items-center text-black">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
