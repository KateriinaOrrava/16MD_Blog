import { useMutation, useQueryClient } from "@tanstack/react-query"
import styles from './AddNewComment.module.css'
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios"

type Comment = {
    userImage: string;
    userName: string;
    userDescr:string;
    postId: number;
}
const AddNewComment = () => {
    const { id } = useParams<{id: string}>() 

    const addNewComment = async (comment:Comment) => {        
        return axios.post(`http://localhost:3004/addComment`, comment)
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation(addNewComment, {onSuccess: () => {
        queryClient.invalidateQueries(["getComments", id]);
    }})

    const [userImage, setUserImage]=useState('');
    const [userName, setUserName]=useState('');
    const [userDescr, setUserDescr]=useState('');

    const onSubmit = (e: { preventDefault: () => void }) => {        
        e.preventDefault()
        toast('Thank you for sharing your thoughts!')
        let postId:number = parseInt(id!)
        let comment = {userImage, userName, userDescr, postId}
        mutate(comment);
        setUserImage('')
        setUserName('')
        setUserDescr('')
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
                        className={styles.inputField}
                        type="text" 
                        name="userImg"
                        value={userImage} 
                        onChange={(e)=>setUserImage(e.target.value)} 
                        required/>
                </label>
                <label>
                    Enter your name:
                    <input type="text" 
                    className={styles.inputField}
                    name="userName"
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value) } 
                    required/>
                </label>
                <label>
                    What do you thik about this post?
                    <input 
                    className={styles.inputField}
                    type="text" 
                    name="userComment"
                    value={userDescr} 
                    onChange={(e)=>setUserDescr(e.target.value)} 
                    required/>
                </label>
                <input 
                type="submit" 
                value="Submit" 
                className={styles.inputSubmit}/>
            </form>
        </div>
    )
}

export default AddNewComment;