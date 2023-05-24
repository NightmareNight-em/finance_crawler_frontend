import React from "react";

const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="btn btn-secondary"
      style={{ textAlign: "center", width: "100%" }}
      // style="display: flex;
      //   justify-content: center;"
    >
      Loading Please wait
    </button>
  );
};

export default DisabledButton;
