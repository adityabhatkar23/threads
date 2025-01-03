import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from 'react';

const Onboarding = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // Pre-fill form with existing user data
  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('bio', user.bio || '');
      setValue('link', user.link || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/update-profile",
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("Profile updated:", response.data);
      
      // Update auth context with new user data
      if (response.data.token) {
        login(response.data.token, response.data.user);
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // Protect the route
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex justify-center items-center text-black">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center">
        <img src="../logo.jpg" className="h-12 w-12" alt="Logo" />
        <h1 className="font-bold text-2xl pt-6">Profile</h1>
        <p className="text-zinc-600 text-lg pb-6">Customize your Threads profile</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-8">
            <div>
              <label htmlFor="name" className="text-sm font-normal">
                Your Name
              </label>
              <input
                name="name"
                placeholder="name"
                className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 text-sm"
                {...register("name", {
                  required: "Name is required"
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="h-16 rounded-full w-16 bg-slate-400 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user?.email || 'default'}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="text-sm font-normal">
              Bio
            </label>
            <input
              name="bio"
              type="text"
              placeholder="Write Bio"
              className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 text-sm"
              {...register("bio", {
                maxLength: {
                  value: 100,
                  message: "Bio should not be more than 100 letters",
                },
              })}
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="link" className="text-sm font-normal">
              Link
            </label>
            <input
              name="link"
              type="text"
              placeholder="+Add link"
              className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 text-sm"
              {...register("link")}
            />
          </div>

          <button 
            type="submit"
            className="w-full border-gray-300 border-[1px] p-2 font-semibold text-sm rounded-md bg-black text-white"
          >
            Complete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding; 