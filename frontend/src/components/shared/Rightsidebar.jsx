import Usercard from "../cards/Usercard";
import { useAuth } from "../../context/AuthContext";

const Rightsidebar = () => {
  const { user } = useAuth();

  return (
    <section className="sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="">Suggested Communities</h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {user && (
            <Usercard
              key={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              imgUrl={user.avatar}
              personType="Community"
            />
          )}

          <p className="">No communities yet</p>
        </div>
      </div>
    </section>
  );
};

export default Rightsidebar;
