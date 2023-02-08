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

function App() {

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
          <Route path="/posts/:category" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App
