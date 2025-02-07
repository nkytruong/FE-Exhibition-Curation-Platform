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
import { useAuth } from "../AuthContext";

function Header() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/">EXHIBIT</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="">Browse All</Nav.Link>
            <NavDropdown title="By Source" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">
                Cleveland Museum of Art
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Art Institute of Chicago
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
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
              <Form className="d-flex">
                <InputGroup className="mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    // className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
        <Nav>
          {user ? (
            <Nav.Link href="/login" aria-label="Login">
              <UserOutlined />
            </Nav.Link>
          ) : (
            <Nav.Link href="/my-account" aria-label="My Account">
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
