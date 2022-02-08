import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import PostCard from "@components/PostCard";
import { usePagination } from "@libs/hook";
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
	// const {data:posts,error,mutate} = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc",);
	// { refreshInterval: 10000 }

	const {
		data: posts,
		error,
		mutate,
		size,
		setSize,
	} = usePagination("/posts?_sort=createdAt&_order=desc");

	return (
		<div>
			<h4>useSWR Hook ⛳</h4>
			<CreatePost mutate={mutate} />

			{/* if Error occur */}
			{error && <p>something is wrong</p>}
			{/* is I dot have post */}
			{!posts && <Loader />}
			<h4>Posts</h4>
			{posts?.flat().map((post) => (
				<PostCard key={post.id} data={post} />
			))}
			<button onClick={() => setSize(size + 1)}>load more</button>
		</div>
	);
}
