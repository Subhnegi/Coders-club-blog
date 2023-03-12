import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Setting() {
    const [file, setFile] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            email,
            password,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data);

            } catch (err) { }
        }
        try {
            const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }

    };

    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:5000/api/users/" + user._id, {
                data: {
                    userId: user._id
                }
            });
            dispatch({type:"LOGOUT"});
            window.location.replace("/");
        } catch (err) { }

    };
    return (
        <div className="setting">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">Update your Account</span>
                    <span className="settingDeleteTitle" onClick={handleDelete}>Delete Account</span>
                </div>
                <form className="settingForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <p>{user.username}</p>
                    <label>Email</label>
                    <input type="email" name="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingSubmit" type="submit" >Update</button>
                    {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profie has been updated...</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
