import React, { useState } from "react";
import "./styles/EditorPage.css";
import Client from "../components/Client";
import  Editor  from "../components/Editor";
const EditorPage = () => {
  {
    const [clients, setClients] = useState([
      {
        socketId: 1,
        username: "Chirag",
      },
      {
        socketId: 2,
        username: "Harshit",
      },
    ]);
    const x = "Chirag Punia";
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
