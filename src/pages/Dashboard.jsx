import { useEffect } from "react"
// bootstrap
import { Col, Container, Row } from "react-bootstrap"

// components
import { Profile, ProfileBar } from "../Components/Profile/Profile"

// hooks
import useProfileData from '../hooks/useProfileData'

// axios
import Caxios from "../Axios"
import Cookie from 'cookie-universal'

// route
import { Outlet, useNavigate } from "react-router-dom"

// context
import { ProfileContext } from "../Context/profileContext"
import { useContext } from "react"

function Dashboard() {
    const cookies = Cookie()
    const navigate = useNavigate()
    const contextProfile = useContext(ProfileContext)
    const useProfile = useProfileData()


    useEffect(() => {
        useProfile()
    }, [])

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
