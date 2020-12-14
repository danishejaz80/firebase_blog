import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signoutUser } from '../redux/actions/Auth'
import { User, Power } from 'react-feather'
import SignOut from '../pages/auth/SignOut'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavItem,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import logo from '../assets/logos/Logo.png'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="px-4 py-2" color="dark" dark expand="md">
            <NavbarBrand>
                <Link to="/">
                    <img src={logo} alt="logo" height={40} />
                </Link>
            </NavbarBrand>
            <Nav className="ml-auto" navbar >
                {
                    props.authUser?.token ?
                        <SignOut />
                        :
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <User />
                            </DropdownToggle>
                            <DropdownMenu right color="dark">
                                <DropdownItem onClick={() => props.history.push('sign-in')}>
                                    <span>Sign in</span>
                                </DropdownItem>
                                <DropdownItem onClick={() => props.history.push('sign-up')}>
                                    <span>Signup</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                }
            </Nav>
        </Navbar>
    )
}

const mapStateToProps = ({ auth }) => {
    const { loader: authLoader, authUser } = auth
    return { authLoader, authUser }
}
export default connect(mapStateToProps, { signoutUser })(Header)
