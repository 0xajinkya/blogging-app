import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom"
import "./SinglePost.css"

export const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    const handleDelete = async () => {
        const id = localStorage.getItem("postid")
        const res = await axios.delete(`http://localhost:5000/api/posts/deletepost/${id}`, {
            headers: {
                'authtoken': localStorage.getItem('auth')
            }
        })
        console.log(res);
        localStorage.removeItem("postid");
        localStorage.removeItem("username");

        window.location.replace("/");
    }

    const handleUpdate = async () => {
        const id = localStorage.getItem("postid")
        const res = await axios.put(`http://localhost:5000/api/posts/updatepost/${id}`, {
            "title": title,
            "desc": desc
        }, {
            headers: {
                'authtoken': localStorage.getItem('auth')
            }
        })
        // console.log(res);

        // window.location.reload();
        setUpdateMode(false);
    }


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/post/" + path)
            console.log(res);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setPost(res.data);
            const res2 = await axios.get("http://localhost:5000/api/auth/getuser", {
                headers: {
                    'authtoken': localStorage.getItem("auth")
                }
            })
            localStorage.setItem("username", res2.data.username);
            localStorage.setItem("postid", res.data._id);

            console.log(res2);
        }
        getPost();
    }, [path])


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img className="singlePostImg" src={PF + post.photo} alt="" />)}
                {updateMode ? <input className="singlePostTitleInput" autoFocus={true} type="text" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} /> : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === localStorage.getItem("username") && <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                        </div>}

                    </h1>
                )}


                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        <b>1 hour ago</b>
                    </span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" type="text" value={desc} onChange={(e) => {
                    setDesc(e.target.value)
                }} /> : (
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
                {updateMode &&
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                }
            </div>
        </div>
    )
}
