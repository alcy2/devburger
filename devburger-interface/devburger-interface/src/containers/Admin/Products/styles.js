import styled from "styled-components";

export const Container = styled.div`

`

export const EditButton = styled.button`
    border: 0;
    background-color: ${(props) => props.theme.darkWhithe};
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        height: 18px;
        width: 18px;
    }

    &:hover {
        background-color: ${(props) => props.theme.purple};

        svg {
            fill: ${(props) => props.theme.darkWhithe};;
        }
    }

    
`

export const ProductImage = styled.img`
    height: 88px;
    padding: 12px;
    border-radius: 16px;

`