import styled from "styled-components";
import BackgroundLogin from '../../assets/background-login.svg';
import Background from '../../assets/background.svg'
import { Link as ReactLink } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`

export const LeftContainer = styled.div`
    background: url('${BackgroundLogin}');
    background-size: cover;
    background-position: center;

    height: 100%;
    width: 100%;
    max-width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 65%;
    }
`

export const RightContainer = styled.div`
    background: url('${Background}');
    background-color: #1e1e1e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    max-width: 50%;

    p{
        color: #fff;
        font-size: 16px;
        font-weight: 800;

        a{
            text-decoration: underline;
        }
    }
`

export const Title = styled.h2`
    font-family: "Road Rage", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 40px;
    line-height: 40px;
    text-align: center;

    color: rgba(255, 255, 255, 1);

    span{
        font-family: "Road Rage", sans-serif;
        color: rgba(151, 88, 166, 1);
    }

`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    input{
        width: 100%;
        border: none;
        height: 52px;
        border-radius: 5px;
        padding: 0 16px;
    }

    label{
        font-size: 18px;
        font-weight: 600;
        color: #fff;
    }

    p{
        font-size: 14px;
        line-height: 80%;
        color: #cf3057;
        font-weight: 600;
        height: 10px;
    }
`

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: #fff;
`