import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import "./AdminDash.css";
let URL = import.meta.env.VITE_SERVER_URL;

const AdminDash = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [professionalUsers, setProfessionalUsers] = useState([]);
    const [clientUsers, setClientUsers] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(URL + `getAllUsers/${-1}`);
                setAllUsers(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert(error.response.data.message);
            }
            const contentRetrieved = await axios.get(URL + "getAllContent");
            setContent(contentRetrieved.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (allUsers.length > 0) {
            const professionals = allUsers.filter(
                (user) => user.role === "professional"
            );
            setProfessionalUsers(professionals);
        }
    }, [allUsers]);

    useEffect(() => {
        if (allUsers.length > 0) {
            const professionals = allUsers.filter(
                (user) => user.role === "user"
            );
            setClientUsers(professionals);
        }
    }, [allUsers]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}deleteContent/${id}`);
            const updatedContent = await axios.get(URL + "getAllContent");
            setContent(updatedContent.data);
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    };

    return (
        <div className="home-admin">
            <div className="content">
                <div className="dash-wrapper">
                    <div className="dash-greeting-calendar">
                        <div className="dash-greeting">
                            <div className="message">
                                <h1>Admin Dashboard!</h1>
                                <h1>Hello, admin!</h1>
                            </div>
                            <div className="resume-activity">
                                <h3>
                                    Total number of users:{" "}
                                    {allUsers && allUsers.length}
                                </h3>
                                <h3>
                                    Professional users:{" "}
                                    {professionalUsers &&
                                        professionalUsers.length}
                                </h3>
                                <h3>
                                    Client users:{" "}
                                    {clientUsers && clientUsers.length}
                                </h3>
                                {/* <h3>Client users: {allUsers && allUsers.data.filter(user => user.role === 'user').data.length}</h3> */}
                            </div>
                        </div>

                        <div className="calendar">
                            <h1>All Uploaded Content</h1>
                            <div className="color">
                                {content.map((item, index) => (
                                    <div
                                        className={`content-item-wrapper`}
                                        key={index}
                                    >
                                        <div
                                            className={`content-item`}
                                            onClick={() =>
                                                handleItemClick(index, item)
                                            }
                                        >
                                            <div className="content-details">
                                                <h3>{item.contentTitle}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                            <a
                                                href={item.contentContents}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={item.contentContents}
                                                    alt={item.contentTitle}
                                                    style={{
                                                        maxWidth: "200px",
                                                        maxHeight: "200px",
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
