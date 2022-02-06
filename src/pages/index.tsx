import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import PostCard from "@components/PostCard";
import { IPost } from "@libs/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [posts,setPosts] = useState<IPost[]>(null)

  const getPosts = async () => {
    const {data}=await axios("/posts?_sort=createdAt&_order=desc")
    setPosts(data)
  };

  useEffect(()=>{
    getPosts();
  },[])


  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost setPosts={setPosts} />
      
      {/* is I dot have post */}
      { !posts && <Loader/> }
      
      <h4>Posts</h4>
      {posts?.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  );
}
