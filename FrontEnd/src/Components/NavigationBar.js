import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoZentiro from '../Assets/Images/Logo.png'

function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
            <Navbar.Brand href="#">
                <img
                src={LogoZentiro}
                width="auto"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <NavDropdown title="BATHTUB" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">CORNER</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">LONG</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">STANDING</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">WHIRLPOOL</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#action1">KABINET</Nav.Link>
                <Nav.Link href="#action1">KITCHEN SINK</Nav.Link>
                <Nav.Link href="#action1">WASHTAFEL</Nav.Link>
                <Nav.Link href="#action1">SHOWER TRAY</Nav.Link>
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;