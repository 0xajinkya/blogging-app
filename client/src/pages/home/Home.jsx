import { useState, useEffect } from "react"
import { Header } from "../../components/header/Header"
import { Posts } from "../../components/posts/Posts"
import { Sidebar } from "../../components/sidebar/Sidebar"
import axios from "axios"
import "./Home.css"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/"+ search)
      setPosts(res.data)
    } 

    fetchPosts();
  },[search])
  
  return (
    <>
      <Header />
      <div className="home">
      <Posts post = {posts} />
      <Sidebar />
      </div>
    </>
  )
}
