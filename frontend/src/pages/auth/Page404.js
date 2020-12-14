import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

const Wrapper = styled.div({
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent"
})

function Page404() {
    return (
        <Wrapper>
            <Helmet title="404 Error" />
            <h1 component="h1" variant="h1" align="center" gutterBottom>
                404
            </h1>
            <h5 align="center" gutterBottom>
                Page not found.
            </h5>
            <p>
                The page you are looking for might have been removed.
            </p>

            <Link to="/">
                Return to website
            </Link>
        </Wrapper>
    )
}

export default Page404
