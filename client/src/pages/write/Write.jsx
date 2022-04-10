import axios from "axios";
import { useContext, useRef, useState } from "react"
import { Context } from "../../context/Context";
import "./Write.css"
export const Write = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null)
  // const { user } = useContext(Context);
  // const user = axios.get("http://localhost:5000/api/auth/getuser")
  const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await axios.get("http://localhost:5000/api/auth/getuser", {
      headers: {
        'authtoken': localStorage.getItem("auth")
      }
      })
    // console.log(res);

    const newPost = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      username: res.data.username,
      userid: res.data._id,
    };

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res2 = await axios.post("http://localhost:5000/api/posts/createpost",newPost, 
    {
      headers: {
      'authtoken': localStorage.getItem("auth")
      }
    });
    console.log(res2);

    // 
    } catch (error) {
      console.log(error);
    }
    window.location.replace("/")
    
  }
  return (
    <div className="write">
      {file &&       <img className="writeImage" src={URL.createObjectURL(file)} alt="" />
}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className=" writeIcon fas fa-plus"></i>
              </label>
              <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
              <input type="text" placeholder="Title" className="writeInput" autoFocus={true} ref = {titleRef}/>
            </div>
            <div className="writeFormGroup">
              <textarea placeholder="Tell Your Story..." type="text" className="writeInput writeText" ref = {descRef}></textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}