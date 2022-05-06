import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser as faUser } from '@fortawesome/free-solid-svg-icons'
import { FixedContainer, PageTitle } from "./SiteTitleAndIconsStyle";
import { useLocation } from "react-router-dom";
import { PageRoutes } from '../../utils/constants';

const titlesMap: Map<string, string> = new Map<string, string>([
    [PageRoutes.DASHBOARD, "Witaj, XYZ"],
    [PageRoutes.MY_PLANTS, "Lista roślin"],
    [PageRoutes.CALENDAR, "Kalendarz"],
    [PageRoutes.FORUM, "Forum"],
    [PageRoutes.SETTINGS, "Ustawienia"],
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
    // const { data: me } = useQuery('me', () => getApis().userApi.getMe().then(resp => resp.data));

    useEffect(() => {
        setTitle(getTitle(location.pathname));
    }, [location]);

    return (
        <FixedContainer className="mt-5 d-flex" style={{ display: window.location.pathname === '/home' ? 'none' : 'flex' }}>
            <PageTitle>{title}</PageTitle>
            <div className="icons gap-4" style={{ display: window.location.pathname === '/home' ? 'none' : 'flex' }}>
                <FontAwesomeIcon icon={faBell} fontSize={32} className="icon" />
                <FontAwesomeIcon icon={faUser} fontSize={32} className="icon" />
            </div>
        </FixedContainer>
    );
}

export default SiteTitleAndIcons;
