import React from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../../redux/actions/Auth'
import { Power } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'
import Loading from 'react-fullscreen-loading';
const SignOut = (props) => {
    const handleLogout = (e) => {
        props.signoutUser()
    }

    return (
        <>
            <Loading loading={props.loader} background="#00000066" loaderColor="#3498db" />
            <NavItem style={{ cursor: "pointer" }} onClick={handleLogout}>
                <NavLink>
                    <span className="mr-2">
                        <Power />
                    </span>
                    Sign out
                </NavLink>
            </NavItem>
        </>
    )
}
const mapStateToProps = ({ auth }) => {
    const { loader, message, isFailed, authUser } = auth
    return { loader, message, isFailed, authUser }
}

export default connect(mapStateToProps, {
    signoutUser,
})(SignOut)
