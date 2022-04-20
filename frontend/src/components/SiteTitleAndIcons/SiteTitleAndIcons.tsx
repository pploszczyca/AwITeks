import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser as faUser } from '@fortawesome/free-solid-svg-icons'
import {FixedContainer, PageTitle} from "./SiteTitleAndIconsStyle";


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
