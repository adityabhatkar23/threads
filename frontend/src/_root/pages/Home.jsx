import  { useEffect, useState } from "react";
import axios from "axios";
import Threadcard from "../../components/cards/Threadcard";

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
      
   
  );
};

export default Home;
