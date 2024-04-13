import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="homepageWrapper">
        <div className="formWrapper">
          <img src="./logo.jpeg" alt="logo" />
          <h4 className="mainLabel">Paste Invitation Room ID</h4>
          <div className="inputGroup">
            <input type="text" className="inputBox" placeholder="ROOM ID" />
            <input type="text" className="inputBox" placeholder="USERNAME" />
            <button className="btn joinBtn">JOIN</button>
            <span>
              if you don't have an invite then create &nbsp;
              <a href="" className="createNewBtn">
                New Room
              </a>
            </span>
          </div>
        </div>
        <footer>
          <h4>
            Made with ❤️
          </h4>
        </footer>
      </div>
    );
  }
}
