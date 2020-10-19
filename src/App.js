import React, {useState} from 'react';

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import FriendCards from './components/FriendCards';
import UserList from './components/UserList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

function App() {
    const [guestValue, setGuestValue] = useState();
    const handleSubmit = (value) => {
        setGuestValue(value);
    };

    return (
        <>
            <Navbar />
            <Banner
                onSubmit={handleSubmit}
            />
            {
                guestValue ? 
                    <Container>
                        <Row>
                            <Col
                                xs={12}
                                md={4}
                                lg={3}
                            >
                                <FriendCards
                                    guestValue={guestValue}
                                />
                            </Col>
                            <Col
                                xs={12}
                                md={8}
                                lg={9}
                            >
                                <UserList
                                    guestValue={guestValue}
                                />
                            </Col>
                        </Row>
                    </Container>
                    : null
            }
        </>
    );
}

export default App;
