import React, { memo, useState, useEffect, useCallback } from 'react';

import Navbar from 'react-bootstrap/Navbar';

const NavbarApp = () => {
    const [scrollY, setScrollY] = useState(0);
    const [navbarOptions, setNavbarOptions] = useState({
        color: '#aaa',
        backgroundColor: '#fff',
        padding: '40px 40px 0px',
        transition: '0.2s'
    });

    const scroll = useCallback(() => {
        setScrollY(window.pageYOffset);
        if (window.pageYOffset < 2)
            setNavbarOptions({
                ...navbarOptions,
                backgroundColor: '#fff',
                padding: '40px 40px 0px',
                color: '#aaa'
            });
        else
            setNavbarOptions({
                ...navbarOptions,
                backgroundColor: '#5c41ad',
                padding: '',
                color: 'hsla(0,0%,100%,.6)'
            });
    }, [navbarOptions])

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => {
            window.removeEventListener("scroll", scroll);
        };
    }, [scrollY, scroll]);

    return (
        <Navbar
            sticky="top"
            variant="light"
            style={navbarOptions}
            className="justify-content-center justify-content-md-start"
        >
            <Navbar.Brand
                style={{color: navbarOptions.color}}
                className="text-uppercase font-weight-900 mr-0"
                href="https://hangman.jpcc.my.id/"
            >
                skybridge test
            </Navbar.Brand>
        </Navbar>
    )
}

export default memo(NavbarApp);