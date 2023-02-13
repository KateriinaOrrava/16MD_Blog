import axios from "axios";
import {useParams, redirect } from 'react-router-dom';
import { Blogs } from '../BlogPosts/BlogPosts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Comments } from "../BlogPosts/BlogPosts";
import localforage from "localforage";
import styles from './GetComments.module.css'
import Timestamp from "react-timestamp"    

const GetComments = () => {
    const { id } = useParams<{id: string}>()
    
    const getComments = async (id:string) => {
        const { data } = await axios.get(`http://localhost:3004/comments/${id}`)
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

// console.log(data)

    return (
            <div className={styles.comment_section}>
                        <h4>Comments ({data.length})</h4>
                {data.map(({userName, userImage, userDescr, id}) => (
                    <div 
                    className={styles.oneCommentWrapper} 
                    key={userName + userDescr + id}>
                        <div>
                            <img 
                            src={userImage} 
                            alt={userName} 
                            className={styles.commentImage}/>
                            
                        </div>
                        <div className={styles.commentAuthorAndComment}>
                            <h4>{userName}</h4>
                            <p>{userDescr}</p>
                        </div>
                    </div>
                ))}
            </div>
    )
}

export default GetComments