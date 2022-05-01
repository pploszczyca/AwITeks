import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser as faUser } from '@fortawesome/free-solid-svg-icons'
import { FixedContainer, PageTitle } from "./SiteTitleAndIconsStyle";
import { useLocation } from "react-router-dom";

const titlesMap: Map<string, string> = new Map<string, string>([
    ["/", "Witaj, XYZ"],
    ["/my-plants", "Lista roślin"],
    ["/calendar", "Kalendarz"],
    ["/forum", "Forum"],
    ["/settings", "Ustawienia"],
])

function getTitle(path: string) {
    if (titlesMap.has(path)) {
        return titlesMap.get(path)
    }
    else if (path.startsWith("/my-plants/")) {
        return "Szczegóły rośliny";
    }
}

function SiteTitleAndIcons() {
    const location = useLocation();
    let [title, setTitle] = useState(getTitle(location.pathname));

    useEffect(() => {
        setTitle(getTitle(location.pathname))
    }, [location]);

    return (
        <FixedContainer className="mt-5">
            <PageTitle>{title}</PageTitle>
            <div className="icons d-flex gap-4">
                <FontAwesomeIcon icon={faBell} fontSize={32} className="icon" />
                <FontAwesomeIcon icon={faUser} fontSize={32} className="icon" />
            </div>
        </FixedContainer>
    );
}

export default SiteTitleAndIcons;
