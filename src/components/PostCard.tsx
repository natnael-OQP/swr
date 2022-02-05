import { useRouter } from "next/router";
import { IPost } from "@libs/types";
import { FC } from "react";

const PostCard:FC<{data:IPost}> = ({data:{id,content}}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="card w-50 bg-dark" onClick={handleClick}>
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">This is a {content}</p>
    </div>
  );
};

export default PostCard;
