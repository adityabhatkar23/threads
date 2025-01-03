import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Threadcard from "../../components/cards/Threadcard";
import Commentform from "../../components/forms/Commentform";
import { useAuth } from "../../context/AuthContext";

const ThreadDetails = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchThreadDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/threads/${id}`,
          {
            withCredentials: true,
          }
        );
        setThread(response.data.thread);
      } catch (error) {
        console.error("Error fetching thread details:", error);
      }
    };

    fetchThreadDetails();
  }, [id]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen gap-4">

        <div className="w-full flex flex-col gap-8">
          <div className="threads-list flex gap-8 flex-col">
            <Threadcard
              key={thread._id}
              id={thread._id}
              currentUserId={user.id}
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          </div>
          <Commentform
            threadId={thread._id}
            currentUserImg={user.avatar}
            currentUserId={user.id}
          />

          <div className="mt-10 flex flex-col w-full gap-4">

		  {thread.children.map((childItem) => (
              <Threadcard
                key={childItem._id}
                id={childItem._id}
                currentUserId={user.id}
                parentId={childItem.parentId}
                content={childItem.text}
                author={childItem.author}
                createdAt={childItem.createdAt}
                comments={childItem.children}
                isComment
              />
			  
            ))}
		  
          </div>
        </div>

    </div>
  );
};

export default ThreadDetails;
