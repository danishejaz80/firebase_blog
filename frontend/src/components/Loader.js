import React from 'react'
import styled from 'styled-components'
import { Spinner } from 'reactstrap'

const Root = styled.div({
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    minHeight: "100%"
})

const Loader = (props) => {
    return (
        <Root>
              <Spinner animation="border" variant="secondary" />
        </Root>
    )
}

export default Loader
