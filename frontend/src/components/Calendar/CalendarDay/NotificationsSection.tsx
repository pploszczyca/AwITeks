import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageRoutes } from "../../../utils/constants";
import { NotificationItem } from "../utils";
import { ACTIVITY_DESCRIPTION } from "./utils";
import Moment from 'moment';

type NotificationsSectionProps = {
    notifications: NotificationItem[];
    title: string;
    onToggle?: (notificationItem: NotificationItem) => any;
    hasNextSection: boolean;
    tileDate: Date;
};


const Header = styled.h2`
    font-size: 1.2rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotificationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ActivityDescription = styled.div`
    display: inline-block;
    min-width: 100px;
`;

const Separator = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    margin: 10px 0;  
`;

export const NotificationsSection: React.FC<NotificationsSectionProps> = (
    { title, notifications, onToggle, hasNextSection, tileDate }) => {

    if (notifications.length === 0)
        return <div></div>;

    return (
        <>
            <Header>
                {title}
            </Header>
            <Container>
                {
                    notifications
                        .sort((a, b) => a.activity.activityType > b.activity.activityType ? 1 : -1)
                        .map(notification => (
                            <NotificationWrapper key={notification.activity.activityType + notification.activity.plant.id}>
                                <div>
                                    <ActivityDescription>
                                        {ACTIVITY_DESCRIPTION[notification.activity.activityType]}
                                    </ActivityDescription>
                                    <Link to={`${PageRoutes.MY_PLANTS}/${notification.activity.plant.id}`}>
                                        {notification.activity.plant.name}
                                    </Link>
                                </div>
                                {
                                    onToggle && Moment().isSameOrAfter(tileDate, 'day') &&
                                    <Form.Check aria-label="option 1" onChange={() => onToggle!(notification)} />
                                }
                            </NotificationWrapper>
                        ))
                }
            </Container>

            {
                hasNextSection &&
                <Separator />
            }
        </>
    );
}