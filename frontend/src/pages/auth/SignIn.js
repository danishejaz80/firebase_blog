import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { signinUser } from '../../redux/actions/Auth'
import Loading from 'react-fullscreen-loading';
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
import { Eye, EyeOff, Key, Mail } from 'react-feather'

const Root = styled.div({
    display: "flex",
    height: "100%"
})

function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    const submitForm = (e) => {
        if (e) e.preventDefault()
        setMessage('')
        setIsFailed(false)

        if (!email || !password) {
            setMessage('email or password is empty.')
            setIsFailed(true)
            return
        }

        const obj = {
            email: email,
            password,
        }
        props.signinUser(obj)
    }

    let { loader } = props

    return (
        <Root className="flex-row align-items-center">
            <Helmet title="Sign In" />
            <Loading loading={loader} background="#00000066" loaderColor="#3498db" />

            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Card className="p-4">
                            <CardBody>
                                <form onSubmit={submitForm}>
                                    <div className="text-center">
                                        <h1>Sign In</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Mail size={17} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Email"
                                            autoFocus
                                            required
                                        />
                                    </InputGroup>

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
                                            required
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button title='View/Hide' type="button" onClick={() => setHidePassword(!hidePassword)}>
                                                {hidePassword ? <Eye size={17} /> : <EyeOff size={17} />}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <Row>
                                        <Col xs="12" className='d-flex justify-content-between align-items-center'>
                                            <Button type="submit" color="primary" className="px-4" disabled={loader}>{loader ? 'Signing in' : 'Sign In'}</Button>
                                            <Link to='/sign-up'>Don't have an account?</Link>
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
})(SignIn)
