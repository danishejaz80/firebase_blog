import React from 'react'
import styled from 'styled-components'
import { Link as ReactLink } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const Link = styled(ReactLink)({
    color: '#074157',
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'none',
    },
})

const Wrapper = styled.div`
    background-color: #e9ecef;
`

function Footer({ width }) {
    return (
        <Wrapper className='px-5 pt-3 pb-2'>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Row className="d-flex flex-column">
                    <h5 className="mb-0">
                        Contact us
                        </h5>
                    <div
                        style={{
                            borderBottom: '2px solid #4298d7',
                            width: 45,
                            margin: '10px 0',
                        }}
                    ></div>
                    <p className="font-weight-bold">
                        info@invozone.com
                        </p>
                </Row>

                <Row className="d-flex flex-column">
                    <h5 className="mb-0">
                        Designed by Danish
                        </h5>
                    <div
                        style={{
                            borderBottom: '2px solid #4298d7',
                            width: 45,
                            margin: '10px 0',
                        }}
                    ></div>
                    <p className="font-weight-bold">
                        &copy; All rights reserved
                        </p>
                </Row>
            </div>
        </Wrapper>
    )
}

export default Footer
