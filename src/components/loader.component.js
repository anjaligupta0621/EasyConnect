/* eslint-disable no-undef */
import React from "react";
import "./loader.component.css";

class Loader extends React.PureComponent {
  render() {
    return (
      <div className="loader-box" style={{display:this.props.showLoader?'flex':'none'}}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
