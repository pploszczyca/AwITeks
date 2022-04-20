import React, { useState } from 'react'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { NotificationItem } from '../../utils/CalendarNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Day, NotificationWrapper } from './CalendarDayStyles';
import { Modal, Button } from 'react-bootstrap';
import Moment from 'moment';
import { getSeverityColor, getMaxSeverity, isToday } from './utils';


type CalendarDayProps = {
    displayedDate: Date;
    tileDate: Date;
    notifications: NotificationItem[];
};


export const CalendarDay: React.FC<CalendarDayProps> = ({ displayedDate, tileDate, notifications }) => {
    const [show, setShow] = useState(false);

    if (tileDate.getMonth() !== displayedDate.getMonth())
        return (<Day />);

    const notificationColor = notifications.length > 0 ? getSeverityColor(getMaxSeverity(notifications)) : 'none';

    return (
        <>
            <Day
                className={`clickable ${isToday(tileDate) ? 'today' : ''}`}
                onClick={() => setShow(true)}
            >
                {tileDate.getDate()}

                {notifications.length > 0 &&
                    <NotificationWrapper>
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{ color: notificationColor }}
                        />
                    </NotificationWrapper>
                }
            </Day>

            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header>
                    <Modal.Title>
                        Powiadomienia z dnia {Moment(tileDate).format('DD-MM-YYYY')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notifications.length > 0 ?
                        notifications.map(({ plantId, notificationId, severity }) => (
                            // TODO probably should get also name of plant and notification reason
                            <div key={notificationId}>
                                Powiadomienie stopnia {severity} dla rośliny ID: {plantId}
                            </div>
                        ))
                        :
                        <div>Brak powiadomień // może nie pozwolić na klikanie??</div>
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
