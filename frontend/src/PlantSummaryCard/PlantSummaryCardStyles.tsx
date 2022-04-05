import styled from "styled-components";


export const StyledCard = styled.div`
    width: 20rem;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 23px -7px rgba(66, 68, 90, 1);

    & img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    }
`;


export const FavoriteIcon = styled.div`
    width: fit-content;
    margin: auto;
    &:hover {
        cursor: pointer;
        transform: scale(1.1, 1.1);
        transition: transform 1s ease-in-out
    }
`;