import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {NotificationItem} from "../utils";
import {ACTIVITY_ICONS, getUniqueActivityTypes, ICON_STYLES} from "./utils";

type NotificationsContainerProps = {
    notifications: NotificationItem[];
    position: 'left' | 'right';
};

const CommonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 10px;
    text-align: center;
`;

const RightContainer = styled(CommonContainer)`
    border-left: 1px solid rgba(0, 0, 0, 0.15);  
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-top-left-radius: 10px;
`;

const LeftContainer = styled(CommonContainer)`
    border-right: 1px solid rgba(0, 0, 0, 0.15);  
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-top-right-radius: 10px;
`;

const IconsContainer = styled.div`
    padding-top: 4px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    font-size: 70%;
`;


export const NotificationsContainer: React.FC<NotificationsContainerProps> = ({ notifications, position }) => {
    if (notifications.length === 0)
        return <div></div>;

    const Container = position === 'left' ? LeftContainer : RightContainer;

    return (
        <Container>
            <span>{notifications.length}</span>

            <IconsContainer>
                {
                    getUniqueActivityTypes(notifications)
                        .map((activityType) =>
                            <FontAwesomeIcon
                                key={activityType}
                                icon={ACTIVITY_ICONS[activityType]}
                                style={ICON_STYLES[activityType]}
                            />)
                }
            </IconsContainer>
        </Container>
    );
}
