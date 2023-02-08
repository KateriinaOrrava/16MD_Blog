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

export type Post = {
    id:number;
    title:string;
    descr:string;
    img:string;
    comments: 
    [
        {userImg:string,
        userName:string,
        userComment:string}
    ];
}

type HeaderProps = {
    children: React.ReactNode;
  };


  const getAllPosts = async () => {
    const { data } = await axios.get('http://localhost:1000/blogs')
    return data
}

const BlogPosts = () => {

  const { data, isLoading } = useQuery<Post[]>(['blogposts'], getAllPosts)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <h1>Something went wrong...</h1>
    }


    return (
        <div className={styles.postSection}>
            {data.map(({id, title, descr, img, comments}) => (
                <Link to={`/posts/${id}`} 
                title={id.toString()}
                key={Math.random().toString()}>
                    <div className={styles.postWrapper}key={Math.random().toString()}>
                        <div className="postImage" key={Math.random().toString()}>
                            <img src={img} title={title}/>
                        </div>
                        <div className="postText" key={Math.random().toString()}>
                            <h3 className="title" key={Math.random().toString()}>{title}</h3>
                            <p className="text" key={Math.random().toString()}>{descr}</p>
                            <span className="readMore" key={Math.random().toString()}>Read more</span>
                        </div>
                    </div>
                </Link>
            ))}
            
        </div>
    )
  
}
export default BlogPosts;