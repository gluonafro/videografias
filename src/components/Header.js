import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = () =>  {
    return (
        <SHeader>
                <nav>
      <ul>
        <li><Link to='/expo'>Exposición</Link></li>
        <li><Link to='/comisarios'>Comisarios</Link></li>
        <li><Link to='/info'>Información</Link></li>
      </ul>
    </nav>
        </SHeader>
    )

}

export default Header;

const SHeader = styled.header`
    height: 10vh;
    box-shadow: 0 5px 10px 1px;
    margin-bottom: 30px;
    nav {
    height: 100%;
    ul {
        height: 100%;
        display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    }
    }
`;