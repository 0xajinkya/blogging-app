import "./Post.css"
import {Link} from "react-router-dom"
export const Post = (props) => {
    const { post } = props;
    const PF = "http://localhost:5000/images/"
    return (

        <div className="post">
            {post.photo &&
                <img className="postImage" src={PF + post.photo} alt="" />
            }
            {!post.photo &&
                <img className="postImage" src="https://th.bing.com/th/id/OIP.dPRNzvX4H77uJh5sTiGvHQAAAA?w=115&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="" />
            }
            <div className="postInfo">
                <div className="postCats">
                    {
                        post.categories.map((c) => {
                            return <span className="postCat">{c.name}</span>
                        })
                    }
            </div>
            <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">
                {post.title}
            </span>
            </Link>
            
            <hr />
            <span className="postDate">
                1 hour ago
            </span>
            <p className="postDesc">{post.desc}</p>
        </div>
    </div >
  )
}

