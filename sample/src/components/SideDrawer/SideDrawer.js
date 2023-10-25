import React, { Component } from "react";
import "./SideDrawer.scss";

class SideDrawer extends Component {
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <nav className={drawerClasses}>

        <ul className="sideDrawer__navigation-items">
          <li className="sideDrawer__navigation-item">
            <a
              className="sideDrawer__navigation-itemlink"
              href="https://endouble.com/"
              target="blank"
            >
              About us
            </a>
          </li>
          <li className="sideDrawer__navigation-item">
            <a
              className="sideDrawer__navigation-itemlink"
              href="https://workingatendouble.com/vacancies/"
              target="blank"
            >
              Job offers
            </a>
          </li>
          <li className="sideDrawer__navigation-item">
            <a
              className="sideDrawer__navigation-itemlink"
              href="https://workingatendouble.com/departments/"
              target="blank"
            >
              Departments
            </a>
          </li>
          <li className="sideDrawer__navigation-item">
            <a
              className="sideDrawer__navigation-itemlink"
              href="https://workingatendouble.com/contact/"
              target="blank"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideDrawer;
