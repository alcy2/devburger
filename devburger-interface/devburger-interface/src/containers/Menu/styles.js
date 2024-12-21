import styled from "styled-components";
import BannerHamburger from '../../assets/backgroundMenu.svg'
import Background from '../../assets/background.svg'
import { Link } from "react-router-dom";


export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.secondWhite};

    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ), 
    url('${Background}');
    height: 100%;
    background-size: cover;
`

export const Banner = styled.div`
    background: url('${BannerHamburger}'), no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    background-color: ${(props) => props.theme.mainBlack};
    background-position: center;
    background-size: cover;

    position: relative;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        line-height: 65px;
        color: ${(props) => props.theme.white};
        position: absolute;

        right: 20%;
        top: 30%;

        span {
            display: block;
            color: ${(props) => props.theme.white};
            font-size: 20px;
            font-weight: 400;
        }
    }
`

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`

export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color:  ${props => props.$isActiveCategory ? (props) => props.theme.purple : '#696969'};
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${props => props.isActiveCategory && `3px solid ${(props) => props.theme.purple}`};
`

export const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    justify-content: center;
    max-width: 1280;
    gap: 60px;
    margin: 50px auto;
`

export const ButtonVoltar = styled(Link)`
    color: rgba(92, 38, 105, 1);
    font-size: 16px;
    font-weight: 600;
    line-height: 12.96px;
    text-align: center;
`