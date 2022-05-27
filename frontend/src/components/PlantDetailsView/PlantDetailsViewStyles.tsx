import {Button} from "react-bootstrap";
import styled from "styled-components";

export const InfoWrapper = styled.div`
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 23px -7px rgba(66, 68, 90, 1);
    font-size: 20px;
    margin-top: 20px;

    & > div {
        padding: 10px;
    };

    & > * div {
        margin-top: 10px;
    }
`;

export const TitleSeparator = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.342);
    width: 100%;
    margin-top: 5px;
    margin-bottom: 15px;
`;


export const DetailsWrapper = styled.div`
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 23px -7px rgba(66, 68, 90, 1);
    //margin-right: 40px;
    font-size: 20px;
    margin-top: 20px;

    & img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    }
`;

export const RequirementsButton = styled(Button)`
    margin-right: 10px;
`;
