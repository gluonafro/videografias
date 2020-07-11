import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = ({match, ...props}) =>  {
    const { muted, setMuted} = props

    console.log(match)
    return (
        <SHeader>
                <nav>
      <ul>
          <li>reactivandoVideografías</li>
        <li><Link to='/expo'>Exposición</Link></li>
        <li><Link to='/comisarios'>Comisarios</Link></li>
        <li><Link to='/info'>Información</Link></li>
      </ul>
    </nav>
    <Buttons>
        {match && match.url === '/expo' && <div><button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button></div>}
        <div>Idiomas</div>
    </Buttons>
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
    justify-content: flex-start;
    li {
        margin-left: 2rem;
    }
    }
    }
`;

const Buttons = styled.div`
    position: absolute;
    top: 2rem;
    right: 0;
    display: flex;
    flex-direction: row;
    div {
        margin-right: 3rem;
    }
`;