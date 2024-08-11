import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AuthContext } from './context/AuthProvider';
import { jwtDecode } from 'jwt-decode'; // Correct import

export default function Header() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  let employeeUsername = null;
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      employeeUsername = decodedToken.username;
    }
  } catch (error) {
    console.error('Failed to decode token:', error);
  }

  return (
    <>
      {['xl'].map((expand) => (
        <Navbar bg = "dark" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-primary mb-3">
          <Container fluid>
            <Navbar.Brand href="/about">GAHA: Close to Home, Close to Heart</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/operatingcommittee">Leadership</Nav.Link>
                  <Nav.Link href="/trainings">Trainings</Nav.Link>
                  <Nav.Link href="/prospective">Prospective</Nav.Link>
                  <Nav.Link href="/contact">Contact</Nav.Link>
                  {auth.token ? (
                    <>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                      <Nav.Link href={`/edit/${employeeUsername}`}>Profile</Nav.Link>
                      <Nav.Link href="/clockinout">Punchcard</Nav.Link>
                      {employeeUsername === "annemulama" && (
                        <NavDropdown
                          title="Admin Options"
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          <NavDropdown.Item href="/home">All Users</NavDropdown.Item>
                          <NavDropdown.Item href="/create">Make New User</NavDropdown.Item>
                        </NavDropdown>
                      )}
                    </>
                  ) : (
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                  )}
                </Nav>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}