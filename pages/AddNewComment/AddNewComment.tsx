import {useParams, redirect } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Comments } from '../BlogPosts/BlogPosts';
import styles from './AddNewComment.module.css'
type Comment = {
    userImg: string;
    userName: string;
    userComment:string;
    postId: number;
}
const AddNewComment = () => {
    const { id } = useParams<{id: string}>()

    const [userImg, setUserImg]=useState('');
    const [userName, setUserName]=useState('');
    const [userComment, setUserComment]=useState('');
    const [postId, setPostId]=useState({id});

    const addNewComment = async (comment:Comment) => {        
        return axios.post(`http://localhost:1000/comments/`, comment)
    }

    const useNewPostData =()=>{
        return useMutation(addNewComment)
    }

    const { mutate } = useNewPostData();

    const onSubmit = (e: { preventDefault: () => void }) => {        
        e.preventDefault()
        let postId:number = parseInt(id!)
        let comment = {userImg, userName, userComment, postId}
        mutate(comment);
        setUserImg('')
        setUserName('')
        setUserComment('')
    }

    return (
        <div  
        className={styles.add_new_comment_wrapper}>
            <h2>Add new comment below ...</h2>
            <form onSubmit={onSubmit} 
            className={styles.add_new_comment}>
                <label>
                    Image:
                    <input 
                        type="text" 
                        name="userImg"
                        value={userImg} 
                        onChange={(e)=>setUserImg(e.target.value)} 
                        required/>
                </label>
                <label>
                    Enter your name:
                    <input type="text" 
                    name="userName"
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value) } 
                    required/>
                </label>
                <label>
                    What do you thik about this post?
                    <input 
                    type="text" 
                    name="userComment"
                    value={userComment} 
                    onChange={(e)=>setUserComment(e.target.value)} 
                    required/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddNewComment;