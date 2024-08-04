import React from "react";

export default function Alert(props) {
  const captalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div className={`alert alert-${props.mode}`} role="alert">
          <b>{captalize(props.alert.type)}:</b> {props.alert.msg}
        </div>
      )}
    </div>
  );
}
