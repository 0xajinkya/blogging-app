// eslint-disable-next-line
import { Topbar } from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Setting } from "./pages/settings/Setting";
import { Single } from "./pages/single/Single";
import { Write } from "./pages/write/Write";
import { Register } from "./pages/register/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
function App() {
    const { user } = useContext(Context);
    return (
        <Router>
            <Topbar />
            <Routes>
                <Route exact path="/" element={ user ? <Home /> : <Login /> } />
                <Route exact path="/write" element={ user ? <Write /> : <Login />  } />
                <Route exact path="/setting" element={ user ? <Setting /> : <Login /> } />
                <Route exact path="/login" element={ user ? <Home/> : <Login /> } />
                <Route exact path="/register" element={ user ? <Home/> : <Register />} />
                <Route exact path="/post/:postId" element={ user? <Single /> : <Login />} />

            </Routes>

        </Router>
    );
}

export default App;
