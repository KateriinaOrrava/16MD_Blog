import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import BlogPosts from './pages/BlogPosts/BlogPosts';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { NavLink } from 'react-router-dom';
import AddPost from './pages/AddPost/AddPost';
import SinglePost from "./pages/SinglePost/SinglePost";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
function App() {

  // axios.get('http://localhost:3004/comments/8').then(({data})=>{
  //   console.log('single post comments', data)
  // })
  // axios.get('http://localhost:3004/posts').then(({data})=>{
  //   console.log('ALL POST data from sql database', data)
  // })

  // axios.get('http://localhost:3004/posts/8').then(({data})=>{
  //   console.log('ONE POST data from sql database', data)
  // })
  // axios.get('http://localhost:3004/comments').then(({data})=>{
  //   console.log('ONE POST comments from sql database', data)
  // })
  // axios.get('http://localhost:3004/comments/8').then(({data})=>{
  //   console.log("got info")
  // })

  // axios.get('http://localhost:3004/posts/8').then(({data})=>{
  //   console.log('ONE POST data from sql database', data)
  // })
  
  // axios.get('http://localhost:3004/comments/8').then(({data})=>{
  //   console.log(data)
  // })

  //   axios.delete('http://localhost:3004/posts/12').then(({data})=>{
  //   console.log('ONE POST data from sql database', data)
  // })

  return (
    <div>
      
      <div className='navigation_container'>
        <nav>
          <div className='navigation_container__nav_links'>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/add">Add Post</NavLink>
          </div>
        </nav>
      </div>


      <Routes>
          <Route path="/" index element={<Home />}/>
          <Route path='/posts' element={<BlogPosts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/comments" element={<SinglePost />} />
          <Route path="/comments/:id" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App
