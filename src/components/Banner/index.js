import React, { memo, useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import '../../style/Banner.css';

const BannerApp = ({onSubmit}) => {
    const [focused, setFocused] = useState(false);
    const [guest, setGuest] = useState({
        name: '',
        status: false
    });

    const changeFocused = (val) => {
        setFocused(val);
    }

    const handleInput = () => (event) => {
        setGuest({ ...guest, name: event.target.value });
    }

    const handleSubmit = () => {
        onSubmit(guest.name);
        setGuest({ ...guest, status: true});
    }

    return (
        <Jumbotron className={`banner text-center mb-0 ${focused ? 'focused' : ''}`}>
            {
                guest.status ? 
                    <div className="w-100">
                        <h2 className="fadein-animation-h2 display-2 font-weight-400 text-white d-block">
                            Hi, {guest.name}!
                        </h2>
                        <h5 className="fadein-animation-h5 text-uppercase">
                            Do You Wanna Build a Snowman?
                        </h5>
                    </div>
                    :
                    <div>
                        <h2
                            className="banner-question display-2 font-weight-400 text-white"
                            onClick={() => setFocused(false)}
                        >
                            Hi, What is your name?
                        </h2>
                        <div
                            className="d-inline-block"
                            onClick={() => changeFocused(true)}
                        >
                            <input
                                value={guest.name}
                                onChange={handleInput()}
                                className="w-100"
                                id="formGuest"
                                placeholder="Type your name here"
                            />
                        </div>
                        <div>
                            <Button 
                                disabled={!guest.name}
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-3 btn btn-next"
                            >
                                {!guest.name ? 'Name cannot be empty' : 'Next'}
                            </Button>
                        </div> 
                    </div>
            }
        </Jumbotron>
    )
}

export default memo(BannerApp);