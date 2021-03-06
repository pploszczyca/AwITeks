import React from "react"
import {Spinner} from "react-bootstrap";
import styled from "styled-components";

const SpinnerContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    & > * {
        width: 80px;
        height: 80px;
        font-size: 1.3rem;
    }
 `;


const Loader: React.FC<{}> = () => {
    return (
        <SpinnerContainer>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </SpinnerContainer>
    )
};

export default Loader;
