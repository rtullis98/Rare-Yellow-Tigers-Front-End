/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="fs-3">RARE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ps-5">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/allPostsPage">
              <Nav.Link>All Posts</Nav.Link>
            </Link>
            <Link passHref href="/myPostsPage">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/categoryManagerPage">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tagManagerPage">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>
            <Button className="me-5" variant="dark fw-bold ps-3" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
