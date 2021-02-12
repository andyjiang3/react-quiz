import React from 'react';
import styled from 'styled-components';
import logo from './../images/button.svg'



const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

const NavTitle = styled.div`
    font-size: 25px;
    font-weight: 600;
    margin-top: 12px;
    align-items: center;
    display: flex;
    justify-content: center;
    white-space: nowrap;
`;

//Change color of text
const Blue = styled.span`
    color: #446cb3;
    white-space: nowrap
`;

const Line = styled.hr`
    background-color: #dddddd;
    border: none;
    height: 2px;
    margin: 0 20px;
    padding: 0;
    width: 20vw;
`

const Logo = styled.img`
    width: 20%;
    height: 20%;
`;



const Nav = () => {

    return (
        <NavContainer>
            <Logo src={logo}></Logo>
            <NavTitle>
                <Line/>
                Under The <Blue>&nbsp;Button&nbsp;</Blue> Quiz
                <Line/>
            </NavTitle>
        </NavContainer>
    );
}

export default Nav;