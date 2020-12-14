import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { signinUser } from '../../redux/actions/Auth'
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import { Eye, EyeOff, Key, Mail, User } from 'react-feather'

const Root = styled.div({
    display: "flex",
    minHeight: "100%",
    height: "100%"
})

function SignUp(props) {
    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [hidePassword, setHidePassword] = useState(true)

    const [message, setMessage] = useState(props.message)
    const [isFailed, setIsFailed] = useState(props.isFailed)

    useEffect(() => {
        if (props.authUser !== null) {
            if (props.authUser) props.history.push('/')
            else props.history.push('/auth/sign-in')
        }

        setMessage(props.message)
        setIsFailed(props.isFailed)
    }, [props.authUser, props.message, props.isFailed, props.history])

    const submitForm = () => {
        setMessage('')
        setIsFailed(false)

        if (!userName || !password) {
            setMessage('Username or password is empty.')
            setIsFailed(true)
            return
        }

        const obj = {
            username: userName,
            password,
        }
        props.signinUser(obj)
    }

    let { loader } = props

    return (
        <Root className="flex-row align-items-center">
            <Helmet title="Sign In" />
            <Container>
                <Row className="justify-content-center">
                    <Col md="10">
                        <Card className="p-4">
                            <CardBody>
                                <form onSubmit={submitForm}>
                                    <div className="text-center">
                                        <h1>Signup</h1>
                                        <p className="text-muted">Create your new account</p>
                                    </div>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" xs="12">
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <User size={17} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="email"
                                                    id="userName"
                                                    name="userName"
                                                    autoComplete="userName"
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    placeholder="Enter Username"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') submitForm()
                                                    }}
                                                    autoFocus
                                                    required
                                                />
                                            </InputGroup>
                                        </Col>

                                        <Col lg="6" md="6" sm="12" xs="12">
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <Mail size={17} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="email"
                                                    id="userName"
                                                    name="userName"
                                                    autoComplete="userName"
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    placeholder="Enter Email"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') submitForm()
                                                    }}
                                                    autoFocus
                                                    required
                                                />
                                            </InputGroup>
                                        </Col>

                                        <Col lg="6" md="6" sm="12" xs="12">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <Key size={17} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type={hidePassword ? "password" : "text"}
                                                    id="password"
                                                    name="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    placeholder="Enter Password"
                                                    minLength='6'
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') submitForm()
                                                    }}
                                                    required
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <Button title='View/Hide' type="button" onClick={() => setHidePassword(!hidePassword)}>
                                                        {hidePassword ? <Eye size={17} /> : <EyeOff size={17} />}
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" xs="12">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <Key size={17} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type={hidePassword ? "password" : "text"}
                                                    id="password"
                                                    name="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    placeholder="Confirm Password"
                                                    minLength='6'
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') submitForm()
                                                    }}
                                                    required
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <Button title='View/Hide' type="button" onClick={() => setHidePassword(!hidePassword)}>
                                                        {hidePassword ? <Eye size={17} /> : <EyeOff size={17} />}
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" className='d-flex justify-content-between align-items-center'>
                                            <Button type="submit" color="primary" className="px-4" disabled={loader}>{loader ? 'Signing up' : 'Sign Up'}</Button>
                                            <Link to='/sign-in'>Already have an account?</Link>
                                        </Col>
                                    </Row>
                                    <div className={`mt-4 text-center ${isFailed ? `text-danger` : `text-success`}`}>
                                        {message}
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Root>
    )
}

const mapStateToProps = ({ auth }) => {
    const { loader, message, isFailed, authUser } = auth
    return { loader, message, isFailed, authUser }
}

export default connect(mapStateToProps, {
    signinUser,
})(SignUp)
