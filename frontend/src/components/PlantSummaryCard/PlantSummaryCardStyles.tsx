import styled from "styled-components";


export const StyledCard = styled.div`
    width: 100%;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 19px -7px rgba(66, 68, 90, 1);

    & img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        height: 80%;
    }
`;


export const FavoriteIcon = styled.span`
    width: fit-content;
    margin: auto;
    &:hover {
        cursor: pointer;
        transform: scale(1.1, 1.1);
        transition: transform 1s ease-in-out
    }
`;
