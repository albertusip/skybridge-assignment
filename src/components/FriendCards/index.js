import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import '../../style/FriendCards.css';

const FriendCardsApp = (name) => {
    const [isLoading, setIsLoading] = useState(false);
    const [friends, setFriends] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const result = await axios.post(' https://api-hangman.jpcc.my.id/api/getfriends', {
                name: name
            });
            setFriends(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [name])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Row className="text-center">
                <Col xs={12}>
                    <h5 className="section-title text-left mt-3 mb-0">
                        Here you can call me FRIENDS
                    </h5>
                </Col>
                {   
                    isLoading ?
                        <div className="w-100 text-center my-5">
                            <Spinner animation="grow" />
                        </div>
                        :
                        friends.map((item, index) =>
                            <Col
                                key={`friend-${index}`}
                                xs={12}
                                sm={6}
                                md={12}
                                className="my-3"
                            >
                                <Card className="friend-card bg-light text-center py-3 px-2">
                                    <Figure className="mb-0">
                                        <Figure.Image
                                            width="100%"
                                            height="auto"
                                            src={item.document.url}
                                            className="wh-fix-200 bg-white border mb-0 img-fluid"
                                            roundedCircle
                                        />

                                    </Figure>
                                    {
                                        item.vip ?
                                        <div className="vip-badges">
                                            <span>VIP</span>
                                        </div> : null
                                        
                                    }
                                    <div className="years-old-badges">
                                        <span>{ item.age } y/o</span>
                                    </div>
                                    <div className="friend-name font-weight-500 mt-2">
                                        Hi, my name is { item.name }
                                    </div>
                                    <div className="friend-fullname">
                                        {item.fullname}
                                    </div>
                                </Card>
                            </Col>
                        )
                }
            </Row>
        </>
    )
}

export default memo(FriendCardsApp);