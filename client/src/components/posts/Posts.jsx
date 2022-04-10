import { Post } from '../post/Post'
import './Posts.css'

export const Posts = (props) => {
  const { post } = props;
  return (
    <div className="posts">
      {post.map(p => {
        return(
        <Post key ={p.id} post = { p } />
        )
      })}
    </div>
  )
}


