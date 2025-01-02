import React, { useEffect, useState } from "react";
import axios from "axios";
import Leftsidebar from "../components/shared/Leftsidebar";
import Rightsidebar from "../components/shared/Rightsidebar";
import Threadcard from "../components/cards/Threadcard";

const Home = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("http://localhost:4000/threads", {
          withCredentials: true,
        });
        setThreads(response.data.threads);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="flex h-screen gap-4">
      <Leftsidebar />

      <section className="flex min-h-screen flex-1 flex-col items-center pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-scroll overflow-x-hidden custom-scrollbar">
        <div className="w-full flex flex-col gap-8">
          <h1 className="font-bold text-3xl pt-6">All Threads </h1>
          <div className="threads-list flex gap-8 flex-col">
            {threads.map((thread) => (
              <Threadcard
                key={thread._id}
                id={thread._id}
                currentUserId={""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                createdAt={thread.createdAt}
                comments={thread.children}
              />

            ))}
          </div>
        </div>
      </section>
      <Rightsidebar />
    </div>
  );
};

export default Home;
