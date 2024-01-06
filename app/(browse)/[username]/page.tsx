import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
// import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user  ) {
    notFound();
  }
  // if (!user || !user.stream) {
  //   notFound();
  // }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return ( 
     <>
     <div>
      userName: {user.username}
      <br /> <br />
      isFollowing : {`${isFollowing}`}
      <br /> <br />
      isBlocked : {`${isBlocked}`}
     </div>
     <Actions 
     isFollowing={isFollowing}
     userId={user.id}
     isBlocked={isBlocked}
     ></Actions>
     </>
    // <StreamPlayer
    //   user={user}
    //   stream={user.stream}
    //   isFollowing={isFollowing}
    // />
  );
}
 
export default UserPage;