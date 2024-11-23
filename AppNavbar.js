import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../context/UserContext.js';

export default function AppNvbar() {
    const {user} = useContext(UserContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/products">E-Commerce Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* <Nav.Link as={NavLink} to="/products" exact={true}>Products</Nav.Link>
			<Nav.Link as={NavLink} to="/register" exact={true}>Register</Nav.Link>
			<Nav.Link as={NavLink} to="/login" exact={true}>Login</Nav.Link>
      <Nav.Link as={NavLink} to="/logout" exact={true}>Logout</Nav.Link>
      <Nav.Link as={NavLink} to="/AddProduct" exact={true}>AddProduct</Nav.Link>*/}

{(user.id !== null) ? 
                    user.isAdmin 
                        ?
                        <>
                        {/*If admin then*/}
                          <Nav.Link as={NavLink} to="/products" exact={true}>Products</Nav.Link>
                          <Nav.Link as={NavLink} to="/AddProduct" exact={true}>AddProduct</Nav.Link>
                          <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </>
                        /*If regular user*/
                        :
                        <>
                            <Nav.Link as={NavLink} to="/products" exact={true}>Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                        </>
                        /*If not logged in Then*/
                    :
                    <>
                        <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                    </>
                }


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
