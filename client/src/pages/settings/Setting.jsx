import { Sidebar } from "../../components/sidebar/Sidebar";
import "./Settings.css";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";

export const Setting = () => {
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const [username1, setUsername1] = useState("");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const PF = "http://localhost:5000/images/";
    const [filename, setFilename] = useState("");
    const [user1, setUser1] = useState({});
    useEffect(() => {
        const getUser = async () => {
            const user = await axios.get("http://localhost:5000/api/auth/getuser", {
                headers: {
                    'authtoken': localStorage.getItem("auth")
                }
            })
            setPhoto(user.data.profilePic);
            setEmail1(user.data.email);
            setUsername1(user.data.username);
            setPassword1(user.data.password);
            setUser1(user);
        }
        getUser();

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            username: username1,
            email: email1,
            password: password1,

        }
        // const userId = user1.id;
        console.log(user1);
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            setFilename(filename)
            updatedUser.profilePic = filename;
            localStorage.removeItem('pp');
            localStorage.setItem('pp',filename);
            try {
                const res = await axios.post("http://localhost:5000/api/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        const res = await axios.put(`http://localhost:5000/api/auth/updateuser/${user1.data._id}`, updatedUser, {
            headers: {
                'authtoken': localStorage.getItem("auth")
            }
        });
        res.data && window.location.reload();


        
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const res = await axios.delete("http://localhost:5000/api/auth/deleteuser", {
            headers: {
                'authtoken': localStorage.getItem("auth")
            }
        });
        localStorage.removeItem("auth");
        localStorage.removeItem("pp");
        localStorage.removeItem("user");
        res.data && window.location.replace("/login")
    }
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitles">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={handleClick}>Delete Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={photo? (PF + photo) : (PF + filename)} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>UserName</label>
                    <input type="text" placeholder="username..." value={username1} onChange={(e) => setUsername1(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder="email..." value={email1} onChange={(e) => setEmail1(e.target.value)} />
                    <label>Password</label>
                    <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
