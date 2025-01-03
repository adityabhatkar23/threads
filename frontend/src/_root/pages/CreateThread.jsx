// import React from 'react';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateThread = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  
    
    try {
      const response = await axios.post("http://localhost:4000/threads/create", {
        text: data.thread,
      }, {
        withCredentials: true
      });

      console.log("Thread created successfully:", response.data);
      
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }

    reset();
  };

  return (
    <div className=" h-screen gap-4 w-full">
     
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 flex-col">
            <h1 className="font-bold text-3xl py-6">Create Thread</h1>
            <p className="text-zinc-500 font-semibold "> Content</p>
            <textarea
              rows={15}
              name="thread"
              type="text"
              placeholder="+Add your thread ..."
              className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 bg-zinc-950"
              {...register("thread", {
                required: "Thread is required",
                minLength: {
                  value: 3,
                  message: "Thread must be at least 3 characters long",
                },
              })}
            />
             {errors.thread && (
              <p className="text-red-500 text-xs mt-1">
                {errors.thread.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="w-full border-gray-300 border-[1px] p-2 font-semibold text-sm rounded-md bg-black text-white"
          >
            Post Thread
          </button>
        </form>
      
    </div>
  );
};

export default CreateThread;
