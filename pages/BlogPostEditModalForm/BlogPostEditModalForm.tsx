import { useQuery, useMutation } from "@tanstack/react-query"
import styles from './BlogPostEditModalForm.module.css'
import { toast } from 'react-toastify';        
import { Blogs } from '../BlogPosts/BlogPosts';
import { useState } from 'react';
import axios from 'axios';


type BlogPostEditModalForm = {
    data:Blogs
}

const BlogPostEditModalForm = ( info:Blogs ) => {
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [descr, setDescr] = useState('')

    const updateBlog = async (post:Omit<Blogs,"id">) => {        
        toast('Post had been changed!')
        return axios.put(`http://localhost:3004/editPost/${info.id}`, post)
    }

    const useNewPostData =()=>{
        return useMutation(updateBlog)
    }

    const { mutate } = useNewPostData();

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const editedBlogPost = {
        "title": title,
        "descr": descr,
        "img": img
        }
        mutate(editedBlogPost)
        refresh()
        // console.log('button submitted')
        // console.log(editedBlogPost)
        // updateBlog(editedBlogPost)
    }
    
    
    const refresh = () => {
        window.location.reload()
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
                            placeholder={info.title}
                            onChange={(e)=> setTitle(e.target.value)}
                            required/>
                    </label>
                    <label>
                        Image:
                        <input type="text" 
                        name="image"
                        placeholder={info.img}
                        onChange={(e)=> setImg(e.target.value)}
                        required/>
                    </label>
                    <label>
                        Description:
                        <input 
                        type="text" 
                        name="description"
                        placeholder={info.descr}
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