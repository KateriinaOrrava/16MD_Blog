import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import styles from './BlogPostEditModalForm.module.css'
import { Blogs } from '../BlogPosts/BlogPosts';
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

    const { data: blog, status } = useQuery<Blogs>(
        [`blog-${info.id}`],
        () => axios.get<Blogs>(`http://localhost:1000/blogs/${info.id}`).then((res) => res.data),
      );

      const [updateBlog, { status: updateStatus }]  = useMutation(
        (updatedBlog) => axios.put<Blogs>(`http://localhost:1000/blogs/${info.id}`, updatedBlog),
        {
          onSuccess: () => fetch(),
        }
      );

      const [formData, setFormData] = useState<Blogs>({
        id: blog?.id || 0,
        title: blog?.title || "",
        descr: blog?.descr || "",
        img: blog?.img || "",
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateBlog(formData);
      };
    
      if (status === "loading") return <p>Loading blog...</p>;
    if (status === "error") return <p>Error loading blog</p>;

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
                            value={formData.title} 
                            onChange={handleChange}
                            required/>
                    </label>
                    <label>
                        Image:
                        <input type="text" 
                        name="image"
                        value={formData.img} 
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>
                        Description:
                        <input 
                        type="text" 
                        name="description"
                        value={formData.descr} 
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