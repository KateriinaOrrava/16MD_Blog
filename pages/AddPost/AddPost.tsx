import axios from "axios"
import { useState } from "react"
import styles from './AddPost.module.css'
import { Blogs } from '../BlogPosts/BlogPosts';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@tanstack/react-query"

const AddPost = () => {
    
    const navigate = useNavigate();

    const navigateToPosts = () => {
        navigate('/blogs');
    };

    const [img, setPostImage]=useState('')
    const [title, setPostTitle]=useState('')
    const [descr, setPostDescr]=useState('')

    const addNewPostElement = async (post:Omit<Blogs,"id">) => {        
        return axios.post('http://localhost:1000/blogs', post)
    }

    const useNewPostData =()=>{
        return useMutation(addNewPostElement)
    }

    const { mutate } = useNewPostData();

    const onSubmit = (e: { preventDefault: () => void }) => {        

        e.preventDefault()
        let post = {title, img, descr}
        mutate(post);
        setPostImage('')
        setPostTitle('')
        setPostDescr('')
        navigateToPosts()
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
    <button onClick={navigateToPosts}>"Let's get back to all posts?"</button>
    </div>
    </>
    )
}
export default AddPost