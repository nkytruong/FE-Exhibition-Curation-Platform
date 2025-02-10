import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Header() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
    setShow(false);
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          EXHIBIT
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/browse">
              Browse All
            </Nav.Link>
            <NavDropdown title="By Source" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/browse/cleveland_museum_of_art">
                Cleveland Museum of Art
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/browse/art_institute_of_chicago">
                Art Institute of Chicago
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Link onClick={handleShow} style={{ cursor: "pointer" }}>
            <SearchOutlined />
          </Nav.Link>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="top"
            style={{ top: "56px", height: "auto" }}
            className="bg-dark text-light"
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Search</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form onSubmit={handleSearchSubmit} className="d-flex">
                <InputGroup className="mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    type="submit"
                    id="button-addon2"
                  >
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
        <Nav>
          {user ? (
            <Nav.Link as={Link} to="/my-account" aria-label="My Account">
              <UserOutlined />
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login" aria-label="Login">
              <UserOutlined />
            </Nav.Link>
          )}
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Container>
    </Navbar>
  );
}

export default Header;
