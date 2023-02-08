import {useParams, redirect, useNavigate} from 'react-router-dom';
import { Post } from '../BlogPosts/BlogPosts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import AddNewComment from '../AddNewComment/AddNewComment';
import styles from './SinglePost.module.css'

import axios from 'axios';


const getOnePost = async (id:string) => {
    const { data } = await axios.get(`http://localhost:1000/blogs/${id}`)
    return data;
}
const SinglePost= () => {
    const { id } = useParams<{id: string}>()
    const { data, isLoading } = useQuery<Post>(["onePost", id], () => getOnePost(id!))

    if (isLoading) {
        return <div>'Loading ... '</div>
      }
     
      // ja dati netiek iegūti, redzēsim error
      if (!data) {
        return null;
      }

    return (
        <div className={styles.post_wrapper}>
            <div className={styles.post_wrapper__info}>
                <h1>{data.title}</h1>
                <img src={data.img} alt={data.title} />
                <p>{data.descr}</p>
            </div>
                <br/>
                <div className={styles.post_wrapper__comments}>
                    <h4>Comments</h4>
                    {data.comments.map((el) => (
                        <div key={Math.random()} className={styles.post_wrapper__commentsSingle}>
                            <img src={el.userImg} alt="" />
                            <div  className={styles.post_wrapper__commentsSingle__info}>
                                <p   className={styles.post_wrapper__commentsSingle__name}>{el.userName}</p>
                                <p   className={styles.post_wrapper__commentsSingle__info}>{el.userComment}</p>
                            </div>

                        </div>
                    ))}   
                </div>
                <AddNewComment id={data.id}/>
        </div>
    )
}

export default SinglePost;