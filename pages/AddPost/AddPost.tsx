import { useState } from "react"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Post } from '../BlogPosts/BlogPosts';





const AddPost = () => {
    const [img, setPostImage]=useState('')
    const [title, setPostTitle]=useState('')
    const [descr, setPostDescr]=useState('')
    //@ts-ignore
    const [comments, setNewComments]=useState({ "userImg": "", "userName": "", "userComment": "", })

    const addNewPostElement = (post:Omit<Post,"id">) => {
        return axios.post('http://localhost:1000/blogs', post)
    }

    const useNewPostData =()=>{
        return useMutation(addNewPostElement)
    }

    const {mutate} = useNewPostData();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        let post = {title, img, descr, comments}
        mutate(post)
  }

    return (<>
    <h1>Add new post</h1>
    <form onSubmit={onSubmit}>
        <label>
            Title:
            <input 
                type="text" 
                name="title"
                value={title} 
                onChange={(e)=>setPostTitle(e.target.value)}/>
        </label>
        <label>
            Image:
            <input type="text" 
            name="image"
            value={img} 
            onChange={(e)=>setPostImage(e.target.value)}/>
        </label>
        <label>
            Description:
            <input 
            type="text" 
            name="description"
            value={descr} 
            onChange={(e)=>setPostDescr(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
    </form>
    </>
    )
}
export default AddPost