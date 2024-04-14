import React from "react";
import Avatar from "react-avatar";
const Client = (props) => {
  return (
    <>
      <div className="client">
        <Avatar name={props.props} size={50} round="14px" />
        <span className="userName">{props.props}</span>
      </div>
    </>
  );
};

export default Client;
