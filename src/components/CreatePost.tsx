import axios from "axios";
import { useState } from "react";

const CreatePost = ({setPosts}) => {
  const [content, setContent] = useState("");
  const [isEmpty, setEmpty] = useState(false);
 
  const handleSubmit = async (e) => {
    // prevent default behaver
    e.preventDefault()
    // prevent if content is empty
    if(!content){
      setEmpty(true);
      return;
    };
    // generate random id
    const randomId = Math.floor((Math.random() *1000)+50);
    
    const {data} = await axios({
      method:'post',
      url: "/posts",
      data:{
        id: randomId,
        content,
        createdAt:Date.now(),
      }
    })
    setPosts((posts)=>[data,...posts])
    setContent("")
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50 ">
      {isEmpty && <h5>Write your Post 👇 </h5> }
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream post:)"
        onChange={(e) => {
          setContent(e.target.value)
          setEmpty(false);
        }}
        value={content}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
