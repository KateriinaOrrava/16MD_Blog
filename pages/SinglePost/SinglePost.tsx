import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SinglePost.module.css';
import { Blogs, Posts } from '../BlogPosts/BlogPosts';
import AddNewComment from '../AddNewComment/AddNewComment';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import BlogPostEditModalForm from "../BlogPostEditModalForm/BlogPostEditModalForm";

const getOnePost = async (id: string) => {



  const { data } = await axios.get(`http://localhost:1000/blogs/${id}`);
  return data;
};

const SinglePost = () => {  
  

  const [editOpen, setEditOpen] = useState(false);

  const deletePost = useMutation((id: number) => {
    return axios.delete(`http://localhost:1000/blogs/${id}`);
  });

  const navigate = useNavigate();
  const navigateToPosts = () => {
    navigate('/blogs');
  };

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<Blogs>(['onePost', id], () =>
    getOnePost(id!)
  );

  if (isLoading) {
    return <div>'Loading ... '</div>;
  }

  if (!data) {
    navigateToPosts();
    return null;
  }
  console.log(data);
  return (
    <div className={styles.post_wrapper}>
      <button
        title='Do you wish to delete?'
        className={styles.post__delete_button}
        onClick={() => {toast('Post is deleted'), deletePost.mutate(data.id)}}
      >
        🗑️
      </button>
      <button 
      onClick = {() => {setEditOpen(true)}}
        title='Do you wish to edit?'
        className={styles.post__edit_button}>
        📝
      </button>
      <div className={styles.post_wrapper__info}>
        <h1>{data.title}</h1>
        <img 
        src={data.img} 
        alt={data.title} />
        <p>
          {data.descr}
        </p>
      </div>
      <br />
      <div className={styles.post_wrapper__comments}>
        <h4>Comments</h4>
        {/* {data.comments.map((el) => (
                        <div key={Math.random()} className={styles.post_wrapper__commentsSingle}>
                            <img src={el.userImg} alt="" />
                            <div  className={styles.post_wrapper__commentsSingle__info}>
                                <p   className={styles.post_wrapper__commentsSingle__name}>{el.userName}</p>
                                <p   className={styles.post_wrapper__commentsSingle__info}>{el.userComment}</p>
                            </div>
                        </div>
                    ))}    */}
      </div>

      <AddNewComment id={data.id} />
      
      {editOpen && <BlogPostEditModalForm  {...data}/>}
    </div>
  );
};

export default SinglePost;
