import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar" variant="dark">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand>
            🧠 Brainstorm Club
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/announcements">
              <Nav.Link>Announcements</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/events">
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/activities">
              <Nav.Link>Activities</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leadership">
              <Nav.Link>Leadership</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <LinkContainer to="/dashboard">
                    <Nav.Link>
                      <FaCog className="me-1" />
                      Dashboard
                    </Nav.Link>
                  </LinkContainer>
                )}
                <NavDropdown 
                  title={
                    <>
                      <FaUser className="me-1" />
                      {user?.firstName || user?.username}
                    </>
                  } 
                  id="user-dropdown"
                >
                  <NavDropdown.Item>
                    Welcome, {user?.firstName} {user?.lastName}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;