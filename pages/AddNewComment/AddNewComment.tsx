import { useState } from "react"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Post } from '../BlogPosts/BlogPosts';
import styles from './AddNewComment.module.css'
type Comment = {
    userImg: string;
    userName: string;
    userComment:string
}
const AddNewComment =(id:{"id":number})=>{
console.log(id.id)
    const [userImg, setUserImg]=useState('')
    const [userName, setUserName]=useState('')
    const [userComment, setUserComment]=useState('')

    const addNewComment = (comments:Comment) => {
        return axios.put(`http://localhost:1000/blogs/${id.id}`, comments)
    }

    const useNewCommentData =()=>{
        return useMutation(addNewComment)
    }

    const {mutate} = useNewCommentData();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        let comments = {userImg, userName, userComment}
        mutate(comments)
  }

    return (
        <div  className={styles.add_new_comment_wrapper}>
            <h2>Add new comment below ...</h2>
            <form onSubmit={onSubmit} className={styles.add_new_comment} required>
                <label>
                    Image:
                    <input 
                        type="text" 
                        name="userImg"
                        value={userImg} 
                        onChange={(e)=>setUserImg(e.target.value)} required/>
                </label>
                <label>
                    Enter your name:
                    <input type="text" 
                    name="userName"
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value) } required/>
                </label>
                <label>
                    What do you thik about this post?
                    <input 
                    type="text" 
                    name="userComment"
                    value={userComment} 
                    onChange={(e)=>setUserComment(e.target.value)} required/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddNewComment;