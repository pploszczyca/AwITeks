import React, { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Card from "react-bootstrap/Card"
import { CalendarCol, CalendarService, ExportButton, DayWrapperCard, DayHeader, Arrow, CalendarContainer, CalendarServiceBottom } from './CalendarStyles';
import { DAYS, getTileDate, getTileNotifications, MONTHS, nextMonth, prevMonth, WEEKS } from './utils';
import { mockCalendarNotifications } from '../../utils/mockData';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarNotification } from '../../utils/CalendarNotification';


type CalendarProps = {
    plantId?: number // if undefined, all plants should be considered
    variant?: 'small' | 'big'
};

function exportCalendar() {
    // TODO
    console.log("export calendar requested");
};

const Calendar: React.FC<CalendarProps> = ({ plantId, variant = 'big' }) => {
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [notifications, setNotifications] = useState([] as CalendarNotification[]);

    // const [user] = use...

    useEffect(() => {
        if (plantId == null) {
            // fetch all for this user from backend (or cache), only for this month
            setNotifications(mockCalendarNotifications.filter(({ month }) => displayedDate.getMonth() === month));
        }
        else {
            // fetch only for specific plant, used for calendar on single plant view
            setNotifications(mockCalendarNotifications.filter(({ month, items }) => displayedDate.getMonth() === month
                && items.find(({ plantId: id }) => id === plantId) != null));
        }
    }, [displayedDate, plantId, /*user*/]);



    function buildCalendarDay(weekNr: number, day: number) {
        const tileDate = getTileDate(weekNr * 7 + day + 1, displayedDate);
        const tileNotifications = getTileNotifications(tileDate, notifications);

        return <CalendarDay
            displayedDate={displayedDate}
            notifications={tileNotifications}
            tileDate={tileDate}
            variant={variant}
        />;
    }


    return (
        <CalendarContainer>
            <Row className="mt-5">
                {variant === 'big' ?
                    (<CalendarCol xs={2}>
                        <CalendarService>
                            <div>{displayedDate.getDate()}</div>

                            <div>
                                <Arrow
                                    icon={faArrowLeft}
                                    onClick={() => setDisplayedDate(displayedDate => prevMonth(displayedDate))}
                                />

                                <p>{MONTHS[displayedDate.getMonth()]}</p>

                                <Arrow
                                    icon={faArrowRight}
                                    onClick={() => setDisplayedDate(displayedDate => nextMonth(displayedDate))}
                                />
                            </div>

                            <div>
                                {displayedDate.getFullYear()}
                            </div>

                            <div>
                                <ExportButton onClick={exportCalendar}>
                                    Export
                                </ExportButton>
                            </div>


                        </CalendarService>
                    </CalendarCol>)
                    :
                    (
                        <CalendarServiceBottom>
                            <Arrow
                                icon={faArrowLeft}
                                onClick={() => setDisplayedDate(displayedDate => prevMonth(displayedDate))}
                            />
                            <div>
                                {`${displayedDate.getDate()} ${MONTHS[displayedDate.getMonth()]} ${displayedDate.getFullYear()}`}
                            </div>
                            <Arrow
                                icon={faArrowRight}
                                onClick={() => setDisplayedDate(displayedDate => nextMonth(displayedDate))}
                            />
                        </CalendarServiceBottom>
                    )
                }

                <CalendarCol xs={variant === 'big' ? 10 : 12} >
                    <Row className="m-0">
                        <CalendarCol><DayHeader className="day-name">Pon</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Wt</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Śr</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Czw</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Pt</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Sob</DayHeader></CalendarCol>
                        <CalendarCol><DayHeader className="day-name">Nd</DayHeader></CalendarCol>
                    </Row>
                    {WEEKS.map(weekNr => (
                        <Row className="m-0" key={weekNr}>
                            {DAYS.map(day => (
                                <CalendarCol key={`${weekNr}.${day}`}>
                                    <Card as={DayWrapperCard} style={{ minHeight: variant === 'small' ? "5rem" : "" }}>
                                        {buildCalendarDay(weekNr, day)}
                                    </Card>
                                </CalendarCol>
                            ))}
                        </Row>
                    ))}
                </CalendarCol>
            </Row>
        </CalendarContainer>
    );
}

export default Calendar;