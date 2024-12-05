import styled from "styled-components";
import BackgroundHome from '../../assets/backgroundHome.svg'
import Background from '../../assets/background.svg'

export const Banner = styled.div`
    background: url('${BackgroundHome}');
    background-size: cover;
    background-position: center ;
    height: 480px;

    h1{
        font-family: "Road Rage", sans-serif;
        font-size: 80px;
        color: #f4f4f4;
        position: absolute;
        right: 20%;
        top: 10%
    }
`

export const Container = styled.section`
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ), 
    url('${Background}');
    height: 100%;
    background-size: cover;
`
