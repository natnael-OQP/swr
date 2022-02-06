import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import PostCard from "@components/PostCard";
import { IPost } from "@libs/types";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Home() {
// =================  traditional data fetching =====================
  // const [posts,setPosts] = useState<IPost[]>(null)

  // const getPosts = async () => {
  //   const {data}=await axios("/posts?_sort=createdAt&_order=desc")
  //   setPosts(data)
  // };

  // useEffect(()=>{
  //   getPosts();
  // },[])
// =================  SWR data fetching =====================
  const {data:posts,error} = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc",);
  // { refreshInterval: 10000 }
  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost  />
      
      {/* if Error occur */}
      {error && <p>something is wrong</p> }
      {/* is I dot have post */}
      { !posts && <Loader/> }
      <h4>Posts</h4>
      {posts?.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  );
}
