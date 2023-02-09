import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import styles from './BlogPostEditModalForm.module.css'
import { Blogs, Posts } from '../BlogPosts/BlogPosts';
import { useState } from 'react';
import axios from 'axios';


type BlogPostEditModalForm = {
    data:Blogs
}

const BlogPostEditModalForm = ( info:Blogs ) => {
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [descr, setDescr] = useState('')

    const refresh = () => {
        window.location.reload()
    }
    const handleSubmit = () => {
        console.log('button submitted')
        console.log(editedBlogPost)
        updateBlog(editedBlogPost)
    }
    
    const editedBlogPost = {
        "title": title,
        "descr": descr,
        "img": img
    }

    //   const updateBlog = useMutation(
    //     (updatedBlog) => axios.put<Blogs>(`http://localhost:1000/blogs/${info.id}`, editedBlogPost),
    //   );

      const updateBlog = async (post:Omit<Blogs,"id">) => {        
        return axios.put(`http://localhost:1000/blogs/${info.id}`, editedBlogPost)
    }


    return (
        <div className={styles.modal}>
                        <button
                            onClick={refresh}>X</button>
            <div className={styles.container}>            
                <form onSubmit={handleSubmit} className={styles.editPostInputForm__wrapper}>
                    <label>
                        Title:
                        <input 
                            type="text" 
                            
                            onChange={(e)=> setTitle(e.target.value)}
                            required/>
                    </label>
                    <label>
                        Image:
                        <input type="text" 
                        name="image"
                        
                        onChange={(e)=> setImg(e.target.value)}
                        required/>
                    </label>
                    <label>
                        Description:
                        <input 
                        type="text" 
                        name="description"
                        
                        onChange={(e)=> setDescr(e.target.value)}
                        required/>
                    </label>
                    <input 
                    type="submit" 
                    value="Submit"
                    className={styles.editPostInputForm__button} />
                </form>
            </div>
        </div>
    )
};

export default BlogPostEditModalForm;