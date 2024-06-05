import axios from "axios";
import { useEffect, useState } from "react";
import { IGitHubFollower } from "../interfaces/IGitHubFollower";
import { Outlet } from "react-router-dom";

const FollowersList = (props: { followersUrl: string }) => {
  const { followersUrl } = props;
  const [followersList, setFollowersList] = useState<IGitHubFollower[]>([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get<IGitHubFollower[]>(followersUrl);
      setFollowersList(result.data);
    })();
  }, [followersUrl]);

  return (
    <>
      <h2 className="my-5 text-center text-4xl font-semibold">
        Followers List
      </h2>
      <div className="px-5 py-3 grid grid-cols-4 lg:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 mx-auto gap-5">
        {!followersList.length && <p>No followers found.</p>}
        {!!followersList.length &&
          followersList.map((follower) => (
            <div key={follower.id} className="p-2 w-full m-auto">
              <img
                className="w-[200px] h-[200px] m-auto object-cover rounded-sm border border-gray-300 shadow"
                src={follower.avatar_url}
                alt={follower.login}
              />
              <h3 className="text-center">
                <a href={follower.html_url} target="_blank" rel="noreferrer">
                  <span className=" text-gray-500">Name:</span> {follower.login}
                </a>
              </h3>
            </div>
          ))}
        <Outlet />
      </div>
    </>
  );
};

export default FollowersList;
