import React, { useState } from "react";
import "./styles/EditorPage.css";
import Client from "../components/Client";

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
              <Client  props={"Chirag Punia"} />
                {clients.map((client) => {
                  <Client key={client.socketId} props={client.username} />;
                })}
              </div>
            </div>
          </div>
          <div className="editorWrap">Editor Goes here ....</div>
        </div>
      </>
    );
  }
};

export default EditorPage;
