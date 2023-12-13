import React from "react";
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Navigation() {
    const {currentUser} = useAuth()

    return (
        <Navbar bg='dark' data-bs-theme='dark' className="p-3" expand='md'>
            <Navbar.Brand href="/">ToDo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}