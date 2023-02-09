import React from "react";
import ReactDOM from "react-dom/client";
import Post from '././BlogPosts'
import {
  QueryClient,
  QueryClientProvider, 
  useQuery, useQueries, QueryKey
} from "@tanstack/react-query";
import { Link, useSearchParams } from 'react-router-dom';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import styles from "./BlogPosts.module.css"

export type Posts = {
    blogs:Blogs[]
    comments: Comments[]
};
export type Blogs = 
        {id:number;
        title:string;
        descr:string;
        img:string;}

export type Comments = 
        {id:number;
        userImg:string,
        userName:string,
        userComment:string;
        userId:string}

type HeaderProps = {
    children: React.ReactNode;
  };


  const getAllPosts = async () => {
    const { data } = await axios.get('http://localhost:1000/blogs')
    return data
}

const BlogPosts = () => {

  const { data, isLoading } = useQuery<Blogs[]>(['blogposts'], getAllPosts)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <h1>Something went wrong...</h1>
    }


    return (
    <div className={styles.page_info_wrapper}>
        <h1>POSTS</h1>
            <div className={styles.postSection}>
                
                {data.map(({id, title, descr, img}) => (
                    <Link to={`/blogs/${id}`} 
                    title={id.toString()}
                    key={Math.random().toString()}>
                        <div className={styles.postWrapper}key={Math.random().toString()}>
                            <div key={Math.random().toString()}>
                                <img src={img} title={title}  className={styles.postImage_img}/>
                            </div>
                            <div className={styles.postText} key={Math.random().toString()}>
                                <h3 className="title" key={Math.random().toString()}>{title}</h3>
                                <p className="text" key={Math.random().toString()}>{descr}</p>
                                <span className="readMore" key={Math.random().toString()}>Read more</span>
                            </div>
                        </div>
                    </Link>
                ))}
                
            </div>
        </div>
    )
  
}
export default BlogPosts;