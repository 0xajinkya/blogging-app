import { Link } from "react-router-dom";
import "./Topbar.css"
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { axios } from "axios";


export const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const [user1, setUser1] = useState({});
  const [auth, setAuth] = useState({})
  const PF = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
//   useEffect(() => {
//     const getUser = async () => {
//       setAuth(localStorage.getItem("auth"));

//         const user = await axios.get("http://localhost:5000/api/auth/getuser", {
//             headers: {
//                 'authtoken': localStorage.getItem("auth")
//             }
//         })
//         setUser1(user.data);
//         console.log(user1);
//     }
//     getUser();

// }, [])
  return (
    <div className="topbar">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"><Link className="link" to="/">Home</Link></li>
          <li className="topListItem"><Link className="link" to="/about">About</Link></li>
          <li className="topListItem"><Link className="link" to="/contact">Contact</Link></li>
          <li className="topListItem"><Link className="link" to="/write">Write</Link></li>
          {user && <li className="topListItem"><Link className="link" to="/logout" onClick={handleLogout}>LogOut</Link></li>}
        </ul>
      </div>
      <div className="topRight">


        {auth ? (
          <Link to="/setting">
            <img className="topImage" src={PF + localStorage.getItem('pp')} alt="Ken Kaneki" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
            <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>


          </ul>)}


        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}



//TODO
//To fetch user data using "user's" auth token
