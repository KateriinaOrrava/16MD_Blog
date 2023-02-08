import {useParams, redirect, useNavigate} from 'react-router-dom';
import { Post } from '../BlogPosts/BlogPosts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

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
console.log(data)
    return (
        <div>
            <h1>{data.title}</h1>
            <img src={data.img} alt={data.title} />
            <p>{data.descr}</p>
            <div>
                 <h4>Comments</h4>
                 {data.comments.map((c)=> (
                    <div>
                        <img src="https://freesvg.org/storage/img/thumb/1675329967Roblox%20Face.png" alt="" />
                        <p>{c}</p>
                    </div>
                 ))}
            </div>
        </div>
    )
}

export default SinglePost;