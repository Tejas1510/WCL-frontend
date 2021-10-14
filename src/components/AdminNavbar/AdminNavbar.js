import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from 'react-bootstrap/Badge'
import {Link} from 'react-router-dom'
function AdminNavbar(props) {
    console.log(props.username)
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container class="p-2">
                    <Navbar.Brand href="#home">Welcome to Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Link style={{textDecoration:'none',color:'inherit',padding:'5px'}} to="/">Home</Link>
                        <Link style={{textDecoration:'none',color:'inherit',padding:'5px'}} to="/register">Book Ticket</Link>
                        <Link style={{textDecoration:'none',color:'inherit',padding:'5px'}} to="/otp_op">Authenticate Passengers</Link>
                        <Link style={{textDecoration:'none',color:'inherit',padding:'5px'}} to="/counter_op">Passenger Details</Link>
                        </Nav>
                        <Nav>
                        {/* <Link href="/contactus">Contact Us</Link> */}
                        <span class="text-white"><AccountCircleIcon/> {props.userName}</span>
                        </Nav>
                        <Button style={{marginLeft:"15px"}} variant="contained" onClick={props.logoutMethod} color="primary">Logout</Button>
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>


    
        </div>
    )
}

export default AdminNavbar;
