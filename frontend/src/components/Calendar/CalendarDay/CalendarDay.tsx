import React, { useState } from 'react'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Day, NotificationsWrapper, TileItemsWrapper } from './CalendarDayStyles';
import { Modal, Button } from 'react-bootstrap';
import Moment from 'moment';
import { getSeverityColor, getMaxSeverity, isToday } from './utils';
import { NotificationItem, ToggleActivityArgs } from '../utils';
import { NotificationsContainer } from './NotificationsContainer';
import { NotificationsSection } from './NotificationsSection';


type CalendarDayProps = {
    displayedDate: Date;
    tileDate: Date;
    doneNotifications: NotificationItem[];
    undoneNotifications: NotificationItem[];
    overdueNotifications?: NotificationItem[];
    onToggleNotification: (args: ToggleActivityArgs) => any;
    variant: 'big' | 'small';
};


export const CalendarDay: React.FC<CalendarDayProps> = ({
    displayedDate, tileDate, doneNotifications, undoneNotifications, overdueNotifications = [], onToggleNotification }) => {

    const [show, setShow] = useState(false);

    if (tileDate.getMonth() !== displayedDate.getMonth())
        return (<Day />);

    const allUndone: NotificationItem[] = [...undoneNotifications, ...overdueNotifications];

    const notificationColor = allUndone.length > 0 ? getSeverityColor(getMaxSeverity(allUndone)) : 'none';

    return (
        <>
            <Day
                className={`clickable ${isToday(tileDate) ? 'today' : ''}`}
                onClick={() => setShow(true)}
            >
                <TileItemsWrapper>
                    {tileDate.getDate()}
                    {allUndone.length > 0 &&
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{ color: notificationColor }}
                        />
                    }
                </TileItemsWrapper>

                <NotificationsWrapper>
                    <NotificationsContainer notifications={doneNotifications} position='left' />
                    <NotificationsContainer notifications={allUndone} position='right' />
                </NotificationsWrapper>

            </Day>

            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header>
                    <Modal.Title>
                        Aktywności z dnia {Moment(tileDate).format('DD-MM-YYYY')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isToday(tileDate) && overdueNotifications.length > 0 &&
                        <NotificationsSection
                            title='Zaległe aktywności:'
                            tileDate={tileDate}
                            notifications={overdueNotifications}
                            onToggle={(notificationItem) => onToggleNotification({ notificationItem, tileDate })}
                            hasNextSection={undoneNotifications.length > 0 || doneNotifications.length > 0}
                        />
                    }

                    <NotificationsSection
                        title='Aktywności do wykonania:'
                        tileDate={tileDate}
                        notifications={undoneNotifications}
                        onToggle={(notificationItem) => onToggleNotification({ notificationItem, tileDate })}
                        hasNextSection={doneNotifications.length > 0}
                    />

                    <NotificationsSection
                        title='Wykonane aktywności:'
                        tileDate={tileDate}
                        notifications={doneNotifications}
                        hasNextSection={false}
                    />

                    {
                        doneNotifications.length === 0 && allUndone.length === 0 &&
                        <div>{'Brak'}</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
