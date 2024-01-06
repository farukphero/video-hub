"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  userId: string;
};

export const Actions = ({
  isFollowing,
  isBlocked,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`blocked the user ${data.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`Unblocked the user ${data.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

console.log(isBlocked)

  return (
    <>
    <Button 
      disabled={isPending} 
      onClick={onClick} 
      variant="primary"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
    
    <Button onClick={handleBlock} disabled={isPending}>
      Block
    </Button>  
    
    </>
  );
};
