import { useState } from "react"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Post } from '../BlogPosts/BlogPosts';
import styles from './AddPost.module.css'





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
    <div >
    <form onSubmit={onSubmit} className={styles.newPostInputForm__wrapper}>
        <label>
            Title:
            <input 
                type="text" 
                name="title"
                value={title} 
                onChange={(e)=>setPostTitle(e.target.value)} required/>
        </label>
        <label>
            Image:
            <input type="text" 
            name="image"
            value={img} 
            onChange={(e)=>setPostImage(e.target.value)} required/>
        </label>
        <label>
            Description:
            <input 
            type="text" 
            name="description"
            value={descr} 
            onChange={(e)=>setPostDescr(e.target.value)} required/>
        </label>
        <input type="submit" value="Submit" />
    </form>
    </div>
    </>
    )
}
export default AddPost