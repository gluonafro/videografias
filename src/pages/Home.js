import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslate } from '../contexts/languageContext'

const Home = () => {
    const t = useTranslate()
    return (
        <Container>
            <SLink to={'/expo'}>
                {t('entrarExpo')}
            </SLink>
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

const SLink = styled(Link)`
    margin: 0 auto;
    border: 2px solid #fff;
    font-size: 2rem;
    padding: 2.5rem 3.5rem;
    :hover {
        text-decoration: none;
    }
`;
