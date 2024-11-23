import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container  } from "react-bootstrap";

function OPDNavbar(props) {

return(
    <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="/" className="">
                OPDL
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/schedule">Schedule</Nav.Link>
                  <NavDropdown
                    title="Stats"
                    id="basic-nav-dropdown"
                    alignRight
                    className="dropdown"
                  >
                    <NavDropdown.Item href="/playerStats">
                      Player Stats
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/qualityReport">
                      Quality Points
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
   )

}

export default OPDNavbar;