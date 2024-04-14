import React, { Component, useState } from "react";
import "./styles/Home.css";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setroomId] = useState("");
  const [username, setUserName] = useState("");
  const handleEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setroomId(id);
    toast.success("Created a new room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id and Username is required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };
  return (
    <div className="homepageWrapper">
      <div className="formWrapper">
        <img src="./logo.png" alt="logo" />
        <h4 className="mainLabel">Paste Invitation Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => {
              setroomId(e.target.value);
            }}
            value={roomId}
            onKeyUp={handleEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onKeyUp={handleEnter}
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            JOIN
          </button>
          <span className="createInfo">
            if you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Made with ❤️</h4>
      </footer>
    </div>
  );
};

export default Home;
