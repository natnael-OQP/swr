import { IComment } from "@libs/types";
import axios from "axios";
import { useState } from "react";

const CreateComment = ({postId,mutate}) => {
  const [comment, setComment] = useState("");
    const [isEmpty, setEmpty] = useState(false);
 
  const handleSubmit = async (e) => {
    // prevent default behaver
    e.preventDefault()
    // prevent if content is empty
    if(!comment){
      setEmpty(true);
      return;
    };
    // generate random id
    const randomId = Math.floor((Math.random() *1000)+50);
    // optimisticUi
    const fakeData={
      id:randomId,
      content:comment,
      createdAt:Date.now(),
      clientOnly:true,
    }
    
    mutate((comment:IComment[]) => [fakeData,...comment],false)
    setComment("")

     await axios({
      method:'post',
      url: `/posts/${postId}/comments`,
      data:{
        id: randomId,
        content:comment,
        createdAt:Date.now(),
      }
    })
    // setPosts((posts)=>[data,...posts])
    mutate();
  };


  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream comment:)"
        onChange={(e) => {setComment(e.target.value); setEmpty(false)}}
        value={comment}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add comment
      </button>
    </form>
  );
};

export default CreateComment;
