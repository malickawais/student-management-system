import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ user, onLogout }) {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand>
          <NavLink to='/'>My School System</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='d-flex align-items-center justify-content-between w-100'>
            <div>
              <NavLink className='ss-navbar-link' to='/students'>
                Students
              </NavLink>
              <NavLink className='ss-navbar-link' to='/teachers'>
                Teachers
              </NavLink>
            </div>
            <div>
              {user ? (
                <Button onClick={onLogout} className='ss-navbar-link'>
                  Logout
                </Button>
              ) : (
                <NavLink className='ss-navbar-link' to='/auth/login'>
                  Login
                </NavLink>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
