import React, { useState, useRef } from "react";
import styled from 'styled-components';
import constants from '../resources/constants.json';
import randomArray from '../utils/randomArray';
import OutsideClick from './OutsideClick'

const OrderDropdown = ({ totalItems, setOrderedData }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <OutsideClick func={() => setIsOpen(false)}>
            <Wrapper>
                <Button onClick={() => setIsOpen(!isOpen)}>Ordenar por</Button>
                {isOpen && <Menu onClick={() => setIsOpen(false)}>
                    <li>
                        <a onClick={() => setOrderedData(randomArray(totalItems))}>Aleatorio</a></li>
                    <li><a onClick={() => setOrderedData(constants.orderBy.title)}>Título (A-Z)</a></li>
                    <li><a onClick={() => setOrderedData(constants.orderBy.artist)}>Autor (A-Z)</a></li>
                    <li><a onClick={() => setOrderedData(constants.orderBy.country)}>País (A-Z)</a></li>
                    <li><a onClick={() => setOrderedData(constants.orderBy.year)}>Año</a></li>
                </Menu>}
            </Wrapper>
        </OutsideClick>
    )
}

export default OrderDropdown;

const Wrapper = styled.div`
    position: relative;
    float: right;
    margin-right: 20%;
    width: 10rem;
`;

const Button = styled.button`
    height: 2rem;
    border: 1px solid #fff;
    text-align: center;
    width: 100%;
`;

const Menu = styled.ul`
    position: absolute;
    background: #000;
    top: calc(2rem - 2px);
    border: 1px solid #fff;
    text-align: center;
    width: calc(100% - 2px);
    z-index: 1;
    li a {
            display: block;
            padding: 0.3rem 0;
        }
    }
`;