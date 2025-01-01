import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post("http://localhost:4000/login", data, {
        withCredentials: true
      });

      console.log("Login successful:", response.data);
      login(response.data.token, response.data.user);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }

    reset();
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center text-black">
      <div className="bg-white rounded-3xl p-8">
        <img src="../logo.jpg" className="h-12 w-12" alt="Logo" />
        <h1 className="font-bold text-xl pt-6">Sign in</h1>
        <p className="text-zinc-600 text-lg pb-6">to continue to Threads</p>

        <button className="w-full border-gray-300 border-[1px] p-2 text-left font-semibold text-sm rounded-md mb-2 align-middle">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/glyph-neue/64/github.png"
            alt="github"
            className="inline mr-3"
          />
          Continue with GitHub
        </button>
        <button className="w-full border-gray-300 border-[1px] p-2 text-left font-semibold text-sm rounded-md">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency/48/google-logo.png"
            alt="google-logo"
            className="inline mr-3"
          />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-gray-300 border-t-[1px]"></div>
          <span className="text-gray-400">or</span>
          <div className="flex-1 border-gray-300 border-t-[1px]"></div>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="text-sm font-normal">
              Email address
            </label>
            <input
              name="email"
              placeholder="Email"
              className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 text-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-normal">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 text-sm"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button className="w-full border-gray-300 border-[1px] p-2 font-semibold text-sm rounded-md bg-zinc-700 text-white">
            Continue
          </button>
        </form>

        <p className="text-sm text-gray-500 font-medium pt-2">
          No account?
          <Link to="/register" className="text-black">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
