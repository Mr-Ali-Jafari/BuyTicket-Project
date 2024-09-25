// bootstrap
import { Col, Container, Row } from "react-bootstrap"

// components
import { Profile, ProfileBar } from "../Components/Profile/Profile"
import { Outlet } from "react-router-dom"

function Dashboard() {
    return (
        <div className="dashboard">
            <Container>
                <Row className="row-gap-4">
                    <Col lg={8} xs={12}><Outlet /></Col>
                    <Col lg={4} xs={12}><ProfileBar /></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard
