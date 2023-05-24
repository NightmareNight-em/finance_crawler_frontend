import React from "react";


function BackButton(props){
    return(<div className="text-left"><a href={props.page}>
    <button type="button" className="btn btn-primary back-button">
        Back
    </button></a></div>);
}

export default BackButton;