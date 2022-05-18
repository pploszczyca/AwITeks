import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ActivityActivityTypeEnum, Plant } from '../../../api';
import { NotificationItem, ToggleActivityArgs } from '../utils';
import { Day, NotificationsWrapper, TileItemsWrapper } from './CalendarDayStyles';
import { NewActivityForm } from './NewActivityForm';
import { NotificationsContainer } from './NotificationsContainer';
import { NotificationsSection } from './NotificationsSection';
import { getInvalidNewActivityOptions, getMaxSeverity, getSeverityColor, isToday } from './utils';


type CalendarDayProps = {
    displayedDate: Date;
    tileDate: Date;
    plants: Plant[];
    doneNotifications: NotificationItem[];
    undoneNotifications: NotificationItem[];
    overdueNotifications?: NotificationItem[];
    onToggleNotification: (args: ToggleActivityArgs) => Promise<any>;
    onAddNewActivity: (args: AddNewActivityArgs) => Promise<any>;
    variant: 'big' | 'small';
};

export type AddNewActivityArgs = {
    plantId: number,
    activityType: ActivityActivityTypeEnum,
    date: Date
};


export const CalendarDay: React.FC<CalendarDayProps> = ({
    displayedDate,
    tileDate,
    plants,
    doneNotifications,
    undoneNotifications,
    overdueNotifications = [],
    onToggleNotification,
    onAddNewActivity 
    }) => {
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
                            hasNextSection={true}
                        />
                    }
                    {
                        undoneNotifications.length > 0 && 
                        <NotificationsSection
                            title='Aktywności do wykonania:'
                            tileDate={tileDate}
                            notifications={undoneNotifications}
                            onToggle={(notificationItem) => onToggleNotification({ notificationItem, tileDate })}
                            hasNextSection={Moment().isSameOrAfter(tileDate)}
                        />
                    }
                    {
                        Moment().isSameOrAfter(tileDate) ? (
                        <>
                            <NotificationsSection
                                title='Wykonane aktywności:'
                                tileDate={tileDate}
                                notifications={doneNotifications}
                                hasNextSection={false}
                            />
                            <NewActivityForm 
                                date={tileDate}
                                onAddNewActivity={onAddNewActivity}
                                invalidOptions={getInvalidNewActivityOptions(plants, [...allUndone, ...doneNotifications])}
                            />
                        </>)
                        : undoneNotifications.length === 0 && (
                            <div>
                                Brak aktywności
                            </div>
                        )
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
