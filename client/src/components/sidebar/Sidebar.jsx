import './Sidebar.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/categories/getCat")
            setCats(res.data);
        }
        getCats();
    }, [])
    
    return (
        <div className="sidebar">
            <div className="sideBarItem">
                <span className="sideBarTitle">About Me</span>
                <img className="sideBarImage" src="https://th.bing.com/th/id/R.c4c88e6c423814d9e6558b5238f9c16d?rik=s37XkJLt2BYWEA&riu=http%3a%2f%2fpm1.narvii.com%2f7439%2f1979bff6f5944ac30953e75dcf1136176971714dr1-750-737v2_uhq.jpg&ehk=O8qPKFDReXPTK6zfSL5odWNhnCPYTIWigWxYAFu8YpA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita facere deleniti natus reiciendis beatae aspernatur adipisci eligendi tenetur nam quasi, non suscipit modi omnis dolores facilis delectus voluptas iusto. Quae?</p>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">Categories</span>
                <ul className="sideBarList">
                    {cats.map((c) => {
                        return <Link to={`/?cat=${c.name}`} className="link"><li className="sideBarListItem">{c.name}</li></Link>

                    })}
                </ul>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">Follow Us</span>
                <div className="sideBarSocial">
                    <i className="sideBarIcon fa-brands fa-facebook-square"></i>
                    <i className="sideBarIcon fa-brands fa-twitter"></i>
                    <i className="sideBarIcon fa-brands fa-pinterest-square"></i>
                    <i className="sideBarIcon fa-brands fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
