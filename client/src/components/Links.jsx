import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signOutUser } from "../config/firebaseAuth";

const Collapse = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "ml-auto",
})`
  display: flex;
  align-items: center;
`;

class Links extends Component {
  handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      signOutUser();
      window.location.href = "/";
    }
  };

  render() {
    return (
      <React.Fragment>
        <Link to="/" className="navbar-brand">
          Tenant 1
        </Link>
        <Collapse>
          <List>
            <Item>
              <Link to="/items/list" className="nav-link">
                List All Items
              </Link>
            </Item>
            <Item>
              <Link to="/items/create" className="nav-link">
                Create an Item
              </Link>
            </Item>
            <Item>
              <Link to="#" className="nav-link" onClick={this.handleLogout}>
                Logout
              </Link>
            </Item>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
