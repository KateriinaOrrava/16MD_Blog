import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import styles from './BlogPostEditModalForm.module.css'
import { Blogs, Posts } from '../BlogPosts/BlogPosts';
import { useState } from 'react';
import axios from 'axios';


type BlogPostEditModalForm = {
    data:Blogs
}

const BlogPostEditModalForm = ( info:Blogs ) => {
    console.log(info)
    console.log(info.id)
    console.log(info.title)

    const refresh = () => {
        window.location.reload()
    }
    const handleSubmit = () => {
        console.log('button submitted')
    }
    

//       const updateBlog = useMutation(
//         (updatedBlog) => axios.put<Blogs>(`http://localhost:1000/blogs/${info.id}`, updatedBlog),
//       );
      
//       if (status === "loading") return <p>Loading blog...</p>;
//     if (status === "error") return <p>Error loading blog</p>;
// const [formData, setFormData] = useState({
//         title: "",
//         descr: "",
//         img: "",
//       });



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
                            value={info.title} 
                            onChange={handleChange}
                            required/>
                    </label>
                    <label>
                        Image:
                        <input type="text" 
                        name="image"
                        value={info.img} 
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>
                        Description:
                        <input 
                        type="text" 
                        name="description"
                        value={info.descr} 
                        onChange={handleChange}
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