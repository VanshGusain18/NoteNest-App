import React from "react";

const Alert = (props) => {
  return (
    <div>
      {props.alert && (
        <div className={`alert alert-${props.mode}`} role="alert">
          <b>{props.alert.type}:</b> {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
