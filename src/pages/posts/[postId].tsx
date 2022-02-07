import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import { useEffect, useState } from "react";
import { IComment, IPost } from "@libs/types";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "@components/Loader";
import useSWR from "swr";
import { usePagination } from "@libs/hook";

const index = () => {
  
  const {query:{postId}}=useRouter()
// =================  traditional data fetching =====================
  // const [post,setPost] = useState<IPost>(null)
  // const [comments,setComments] = useState<IComment[]>(null)

  // const getPost = async() => {
  //   const {data}=await axios(`/posts/${postId}/?_sort=createdAt&_order=desc`)
  //   setPost(data)
  // };

  // const getComments = async() => {
  //   const {data}=await axios(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)
  //   setComments(data);
  // };

  // useEffect(()=>{
  //   postId && getPost();
  //   postId && getComments();
  // },[postId])

// =================  SWR data fetching =====================  
  // const {data:comments,mutate} = useSWR<IComment[]>(`/posts/${postId}/comments?_sort=createdAt&_order=desc`);
  
  const {data:comments,error,mutate,size,setSize}=usePagination(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)

  const {data:posts} = useSWR<IPost[]>(`/posts?_sort=createdAt&_order=desc`);
  const post = posts?.find((post)=>post.id == Number(postId));
  console.log(comments);
  
  return (
    <div>
      {!post&&<Loader/>}
      {
        post &&  <PostCard data={post} />
      }
      <CreateComment postId={postId} mutate={mutate} />

      {!comments&&<Loader/>}
      <h4>Comments</h4>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} data={comment} />
      ))}
            <button onClick={()=>setSize(size+1)} >load more</button>

    </div>
  );
};

export default index;
