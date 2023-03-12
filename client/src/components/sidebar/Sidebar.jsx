import "./sidebar.css";
import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cats,setCats]=useState([]);

    useEffect(() =>{
        const getCats=async()=>{
            const res=await axios.get("http://localhost:5000/api/categories");
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT US</span>
                <img
                    src="https://alcorfund.com/wp-content/uploads/2020/09/Innovation-1024x569.png"
                    alt="Innovation"
                />
                <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                {cats.map((c)=>(
                    <Link to={`/?cat=${c.name}`} className="link"><li className="sidebarListItem">{c.name}</li></Link>
                ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                    <div className="sidebarSocial">
                    <i className="topIcon fa-brands fa-facebook"></i>
            <i className="sidebarIcon fa-brands fa-github"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
            <i className="sidebarIcon fa-brands fa-linkedin"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-solid fa-envelope"></i>
                    </div>
            </div>
        </div>
    );
}
