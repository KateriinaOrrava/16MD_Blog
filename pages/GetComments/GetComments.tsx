import axios from "axios";
import {useParams, redirect } from 'react-router-dom';
import { Blogs } from '../BlogPosts/BlogPosts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Comments } from "../BlogPosts/BlogPosts";
import localforage from "localforage";
import styles from './GetComments.module.css'

const GetComments = () => {
    const { id } = useParams<{id: string}>()
    
    const getComments = async (id:string) => {
        const { data } = await axios.get(`http://localhost:1000/comments?postId=${id}`)
        return data;
    }


    const { data, isLoading } = useQuery<Comments[]>(["getComments", id], () => getComments(id!))

    if (isLoading) {
        return <div>'Loading ... '</div>
      }
     
      // ja dati netiek iegūti, redzēsim error
      if (!data) {
        return null;
      }

console.log(data)

    return (
            <div className={styles.comment_section}>
                {data.map(({userComment, userName, userImg}) => (
                    <div 
                    className={styles.oneCommentWrapper} 
                    key={userName}>
                        <div>
                            <img 
                            src={userImg} 
                            alt={userName} 
                            className={styles.commentImage}/>
                        </div>
                        <div className={styles.commentAuthorAndComment}>
                            <h4>{userName}</h4>
                            <p>{userComment}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
    )
}

export default GetComments