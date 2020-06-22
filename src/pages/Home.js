import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <Container>
        <Start>
        <Link to={'/expo'}>Ir a la exposición</Link>

        </Start>
        </Container>

    )
}

export default Home;

const Container = styled.main`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
`;

const Start = styled.div`
    margin: 0 auto;
`;
