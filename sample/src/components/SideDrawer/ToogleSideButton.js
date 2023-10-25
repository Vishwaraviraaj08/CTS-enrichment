import React, { Component } from "react";
import "./ToggleSideDrawer.scss";

class ToogleSideDrawer extends Component {
  render() {
    const {click}= this.props
    return (
      <button className="toggle-button" onClick={click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </button>
    );
  }
}

export default ToogleSideDrawer;
