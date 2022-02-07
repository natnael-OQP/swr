import { useRouter } from "next/router";
import { IPost } from "@libs/types";
import { FC } from "react";

const PostCard:FC<{data:IPost}> = ({data:{id,content,clientOnly}}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  const classname=clientOnly ? "border card w-50 bg-dark ":"card w-50 bg-dark"

  return (
    <div className={classname} onClick={handleClick}>
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">This is a {content}</p>
    </div>
  );
};

export default PostCard;
