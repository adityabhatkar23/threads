import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Leftsidebar from '../components/shared/Leftsidebar';
import Rightsidebar from '../components/shared/Rightsidebar';
import Threadcard from '../components/cards/Threadcard';
import Commentform from '../components/forms/Commentform';
import { useAuth } from '../context/AuthContext';

const ThreadDetails = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const{user} = useAuth()

  useEffect(() => {
    const fetchThreadDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/threads/${id}`, {
          withCredentials: true,
        });
        setThread(response.data.thread);
      } catch (error) {
        console.error('Error fetching thread details:', error);
      }
    };

    fetchThreadDetails();
  }, [id]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen gap-4">
      <Leftsidebar />

      <section className="flex min-h-screen flex-1 flex-col items-center pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-scroll overflow-x-hidden custom-scrollbar">
        <div className="w-full flex flex-col gap-8">
          <div className="threads-list flex gap-8 flex-col">
           
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

           
          </div>
		  <Commentform
		  	threadId = {thread.id}
			currentUserImg = {user.avatar}
			currentUserId={user.id}
		  
		  />
        </div>
      </section>
      <Rightsidebar />
    </div>
  );
};

export default ThreadDetails;