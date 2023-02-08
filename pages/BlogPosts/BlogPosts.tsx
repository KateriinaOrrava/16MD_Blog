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
    comments: string[];
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
            {data.map(({id, title, descr, img, comments}, index) => (
                <Link to={`/post/${id}`} key={Math.random().toString()}>
                    <div className={styles.postWrapper}key={Math.random().toString()}>
                        <div className="postImage" key={Math.random().toString()}>
                            <img src={img} title={title}/>
                        </div>
                        <div className="postText" key={Math.random().toString()}>
                            <h3 className="title" key={Math.random().toString()}>{title}</h3>
                            <p className="text" key={Math.random().toString()}>{descr}</p>
                            <span className="readMore" key={Math.random().toString()}>Read more</span>
                        </div>
                        <div key={Math.random().toString()}>
                            <h4 key={Math.random().toString()} >Comments</h4>
                            {comments.map((com) => (
                                <p key={Math.random().toString()}>{com}</p>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
            
        </div>
    )
  
}
export default BlogPosts;
    // const [postsQuery, commentsQuery] = useQueries({
    //     queries: [
    //         {
    //           queryKey: ['posts'],
    //           queryFn: () =>
    //             axios
    //               .get('http://localhost:1000/blogs')
    //               .then((res) => res.data),
    //         },
      
    //         {
    //           queryKey: ['comments'],
    //           queryFn: () =>
    //             axios
    //               .get('http://localhost:1000/comments')
    //               .then((res) => res.data),
    //         },
    //       ],
    // })

    // if (postsQuery.isLoading) return 'Loading Posts...';
    // if (commentsQuery.isLoading) return 'Loading Users...';
  
    // if (postsQuery.error)
    //   return 'An error has occurred: ' + postsQuery.error;
    // if (commentsQuery.error)
    //   return 'An error has occurred: ' + commentsQuery.error;

    //   console.log('posts', postsQuery.data)
    //   console.log('comments', commentsQuery.data)
    //   console.log('comments', commentsQuery.data[0].body)
    //   console.log({})

    //   return (
    //     <div>
    //       <h2>Posts</h2>
    //       {postsQuery.data.map((post:Post) => {
    //         return (
    //           <div className={styles.postWrapper} key={post.id}>
    //             <div className="postImage">
    //                   <img src={post.img} title={post.title}/>
    //             </div>
    //             <div className="postText">
    //                 <h3 className="title">{post.title}</h3>
    //                 <p className="text">{post.descr}</p>
    //                 <span className="readMore">Read more</span>
    //             </div>
    //             <div className="comments">
    //                 <h1>comments</h1>
    //                 {commentsQuery?.data.filter((comment))}
    //             </div>
    //           </div>
    //         );
    //       })}
    
    //       <h2>Users</h2>
    //       {/* {usersQuery.data?.map((user) => {
    //         return (
    //           <div key={user.id} style={{ display: 'flex' }}>
    //             <span>{user.id}-&nbsp;</span>
    //             <div>{user.name}</div>
    //           </div>
    //         );
    //       })} */}
    //     </div>
    //   );