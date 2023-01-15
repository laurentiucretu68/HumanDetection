import {Container, Nav, Navbar} from "react-bootstrap";

function NavbarFunction() {
    const email = sessionStorage.getItem('user')

    return (
        <>
            <Navbar className="color-nav" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Human Detection</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {
                                email ?
                                    <>
                                        <Nav.Link href="/dashboard">Dashboard ({email})</Nav.Link>
                                        <Nav.Link href="/sign-out">Sign Out</Nav.Link>
                                    </>
                                :
                                    <>
                                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarFunction;