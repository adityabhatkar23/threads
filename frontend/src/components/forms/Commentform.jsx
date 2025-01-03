// import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Commentform = ({ threadId, currentUserImg, currentUserId }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const response = await axios.post(
        `http://localhost:4000/threads/${threadId}/comments`,
        {
          text: data.comment,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Thread created successfully:", response.data);

      navigate(`/thread/${threadId}`);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }

    reset();
  };

  return (
    <div>
      <form className="flex w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
        <img src={currentUserImg} className="h-11 w-11 " />
        <div className="flex gap-5 flex-col w-full">
          <input
            name="comment"
            type="text"
            placeholder="+Comment  ...."
            className="w-full py-2 font-medium border-gray-400 border-[1px] rounded-lg outline-none px-3 bg-zinc-950"
            {...register("comment", {
              required: "Comment is required",
              minLength: {
                value: 3,
                message: "Thread must be at least 3 characters long",
              },
            })}
          />

          {errors.thread && (
            <p className="text-red-500 text-xs mt-1">{errors.thread.message}</p>
          )}
        </div>

        <button
          type="submit"
          className=" border-gray-300 border-[1px] p-2 font-semibold text-sm rounded-md bg-black text-white"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default Commentform;
