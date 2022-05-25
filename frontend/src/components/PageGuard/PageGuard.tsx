import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {selectIsLoggedIn, useAppSelector} from "../../Store/store";
import {PageRoutes} from "../../utils/constants";
import {Role} from "../../utils/roles"


// redirect if doesn't have required role
const REDIRECT_ROUTES = {
    [Role.LOGGED_IN]: PageRoutes.LOGIN,
    [Role.NOT_LOGGED_IN]: PageRoutes.DASHBOARD
};

export const PageGuard: React.FC<{ role: Role }> = ({ role, children }) => {
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(() => {
        let shouldNavigate = false;

        switch (role) {
            case Role.LOGGED_IN:
                shouldNavigate = !isLoggedIn;
                break;
            case Role.NOT_LOGGED_IN:
                shouldNavigate = isLoggedIn;
                break;
        };

        if (shouldNavigate) {
            navigate(REDIRECT_ROUTES[role]);
        }
    }, [isLoggedIn, navigate, role]);

    return (
        <>
            {children}
        </>
    );
}
