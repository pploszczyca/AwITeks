import React, {useEffect, useState} from 'react';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {FixedContainer, HoverIcon, PageTitle} from "./SiteTitleAndIconsStyle";
import {useLocation} from "react-router-dom";
import {errorMsg, PageRoutes} from '../../utils/constants';
import {useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import {logout} from "../../Store/features/auth/authSlice";
import {selectIsLoggedIn, useAppDispatch, useAppSelector} from "../../Store/store";

const titlesMap: Map<string, string> = new Map<string, string>([
    [PageRoutes.DASHBOARD, "Witaj, XYZ"],
    [PageRoutes.MY_PLANTS, "Lista roślin"],
    [PageRoutes.CALENDAR, "Kalendarz"],
    [PageRoutes.FORUM, "Forum"],
])

function getTitle(path: string) {
    if (titlesMap.has(path)) {
        return titlesMap.get(path)
    }
    else if (path.startsWith("/my-plants/")) {
        return "Szczegóły rośliny";
    }
    else if(path.startsWith("forum/thread/")){
        return "Dyskusja";
    }
}

function SiteTitleAndIcons() {
    const location = useLocation();
    let [title, setTitle] = useState(getTitle(location.pathname));
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();

    const  {data: me} = useQuery(
        ['users', 'me'],
        () => getApis().userApi.getMe().then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );


    useEffect(() => {
        if(me) titlesMap.set(PageRoutes.DASHBOARD, "Witaj, " + me.username);
        setTitle(getTitle(location.pathname));
    }, [location, me]);

    const logOut = () => {
        if (isLoggedIn){
            dispatch(logout())
        }
    }

    return (
        <FixedContainer className="mt-5 d-flex" style={{ display: window.location.pathname === '/home' ? 'none' : 'flex' }}>
            <PageTitle>{title}</PageTitle>
            <div className="icons gap-4" style={{ display: window.location.pathname === '/home' ? 'none' : 'flex' }}>
                <HoverIcon icon={faArrowRightFromBracket} fontSize={32} className="icon" onClick={() => logOut()}/>
            </div>
        </FixedContainer>
    );
}

export default SiteTitleAndIcons;
