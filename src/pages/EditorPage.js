import React, { useEffect, useState, useRef } from "react";
import "./styles/EditorPage.css";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";

const EditorPage = () => {
  {
    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const roomId = useParams();
    const handleError = (err) => {
      console.log(err);
      toast.error("Socket connection failed , Try again later");
      reactNavigator("/");
    };
    useEffect(() => {
      const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", (err) => {
          handleError(err);
        });
        socketRef.current.on("connect_failed", (err) => {
          handleError(err);
        });
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId: roomId,
          username: location.state?.username,
        });
        if (!location.state) {
          return <Navigate to="/" />;
        }
      };
      init();
    }, []);

    const [clients, setClients] = useState([
      {
        socketId: 1,
        username: "Chirag",
      },
      {
        socketId: 2,
        username: "Harshit",
      },
      {
        socketId: 3,
        username: "Akhil",
      },
    ]);

    return (
      <>
        <div className="mainWrap">
          <div className="aside">
            <div className="asideInner">
              <div className="logo">
                <img className="logoImage" src="/logo.png" alt="editorlogo" />
              </div>
              <h3>Connected</h3>
              <div className="clientList">
                {clients.map((client) => (
                  <Client key={client.socketId} props={client.username} />
                ))}
              </div>
            </div>
            <button className="btn copyBtn">Copy Room ID</button>
            <button className="btn leaveBtn"> Leave</button>
          </div>
          <div className="editorWrap">
            <Editor />
          </div>
        </div>
      </>
    );
  }
};

export default EditorPage;
