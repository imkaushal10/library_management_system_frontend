import React, { Component } from 'react'
import {Navbar, Container, Col} from 'reactstrap'


export default class Footer extends Component {
    render() {
        return (
            <Navbar fixed='bottom' color="light">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                       <div>All Rights Reserved</div>
                    </Col>
                </Container>
            </Navbar>

        )
    }
}
