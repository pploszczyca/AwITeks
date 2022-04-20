import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser as faUser } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const PageTitle = styled.h1`
  color: #0FC2C0;
`;

const FixedContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;

  position: relative;
  left: var(--sidebar-width);

  width: var(--content-width);
  margin: var(--content-margin-y) var(--content-margin-x);
  
  & .icons{
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
    padding-right: var(--content-margin-x);
  }
`

function SiteTitleAndIcons() {
    return (
        <FixedContainer className="mt-5">
            <PageTitle>Witaj, XYZ!</PageTitle>
            <div className="icons d-flex gap-4">
                <FontAwesomeIcon icon={faBell} fontSize={32} className="icon" />
                <FontAwesomeIcon icon={faUser} fontSize={32} className="icon" />
            </div>
        </FixedContainer>
    );
}

export default SiteTitleAndIcons;
