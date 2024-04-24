import React, { useEffect, useState, useRef } from "react";
import "./styles/EditorPage.css";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";

const EditorPage = () => {
  {
    const socketRef = useRef(null);
    const location = useLocation();
    const codeRef = useRef(null);
    const reactNavigator = useNavigate();
    const { roomID } = useParams();
    const [clients, setClients] = useState([]);
    const handleError = (err) => {
      console.log(err);
      toast.error("Socket connection failed , Try again later");
      reactNavigator("/");
      return;
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
          roomID: roomID,
          username: location.state.username,
        });

        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location.state.username) {
              toast.success(`${username} joined the room.`);
            }
            setClients(clients);
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeRef.current,
              socketId,
            });
          }
        );
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          console.log(clients);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });
      };
      init();
      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOIN);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      };
    }, []);
    async function copyRoomId() {
      try {
        await navigator.clipboard.writeText(roomID);
        toast.success("Room ID has been copied to your clipboard");
      } catch (err) {
        toast.error("Could not copy the Room ID");
        console.error(err);
      }
    }

    function leaveRoom() {
      reactNavigator("/");
    }

  

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
                {clients.map((c) => (
                  <Client key={c.socketId} props={c.username} />
                ))}
              </div>
            </div>
            <button className="btn copyBtn" onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button className="btn leaveBtn" onClick={leaveRoom}>
              {" "}
              Leave
            </button>
          </div>
          <div className="editorWrap">
            <Editor
              socketRef={socketRef}
              roomID={roomID}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
          </div>
        </div>
      </>
    );
  }
};

export default EditorPage;
