import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import {
    CardImg,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Container,
    Row
} from 'reactstrap'

const Root = styled.div({
    display: "flex",
    height: "100%",
    padding: "30px 0"
})

const Homepage = (props) => {
    return (
        <Root>
            <Helmet title="Home" />
            <Container>
                <Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <h2 className="text-center">Blog</h2>
                    </Col>
                    <Col lg="3" md="4" sm="6" xs="12">
                        <Card>
                            <CardImg top width="100%" src="https://via.placeholder.com/600x400" alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5" className="text-truncate">Card Title ewubic uc echiu e9coh wy8</CardTitle>
                                <CardText style={{ minHeight: 120 }}>
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Root>
    )
}

const mapStateToProps = ({ auth }) => {
    return { token: auth?.authUser?.token }
}

export default connect(mapStateToProps, {})(Homepage)
