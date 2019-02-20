import React from 'react';
import { Card, CardBody, CardHeader, CardSubtitle, CardImg } from 'reactstrap';
// import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div className="card">
            <Card> 
                <CardBody
                style={{ paddingTop: 50, backgroundColor: '#37474F' }}
                >
                <CardHeader 
                style={{ textAlign: 'center', margin: 0, backgroundColor: '#263238', WebkitTextFillColor: '#ECEFF1'}}
                tag="h1">
                RoadRate
                </CardHeader>
                <CardSubtitle 
                style={{ textAlign: 'center',backgroundColor: '#37474F', WebkitTextFillColor: '#ECEFF1'}}
                >Responsibly rate drivers. 100% anonymous.</CardSubtitle>
                </CardBody>
                <CardImg
                style={{ opacity: 0.9, }}
                className="card-img" 
                top width="100%"
                src="https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" /> 
            </Card>
            {/* <ul className="about-links">
                <li className="login-link">
                    <Link to="/login">Login</Link>
                </li>
                <li className="register-link">
                    <Link to="/register">Register</Link>
                </li>
                <li className="landing-link">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About RoadRate</Link>
                </li>
            </ul> */}
        </div>
    )
}

export default Header;