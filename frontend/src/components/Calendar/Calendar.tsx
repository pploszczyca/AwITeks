import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Card from "react-bootstrap/Card"
import { CalendarCol, CalendarService, ExportButton, DayWrapperCard, DayHeader, Arrow, CalendarServiceBottom } from './CalendarStyles';
import { calculateSeverity, DAYS, getTileDate, getTileNotifications, MONTHS, nextMonth, prevMonth, WEEKS } from './utils';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { ContentContainer } from "../App/AppStyle";
import { getApis } from "../../api/initializeApis";
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';


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

    // TODO this will have to be rewritten once backend is fixed
    const { data: notifications, isLoading } = useQuery(['plants', 'notifications'], async () => {
        const plantsRequest = await getApis().plantsApi.getAllPlants();
        const plants = plantsRequest.data;

        return plants.filter(plant => plantId === undefined || plant.id === plantId).map(plant => {
            return plant.plantActivities.map(activity => {
                const date = new Date(activity.date)

                return {
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    items: [
                        {
                            notificationId: activity.id!,
                            plantId: plant.id!,
                            severity: calculateSeverity(date)
                        }
                    ]
                }
            })
        }).flat()
    });



    function buildCalendarDay(weekNr: number, day: number) {
        const tileDate = getTileDate(weekNr * 7 + day + 1, displayedDate);
        const tileNotifications = getTileNotifications(tileDate, notifications!);

        return <CalendarDay
            displayedDate={displayedDate}
            notifications={tileNotifications}
            tileDate={tileDate}
            variant={variant}
        />;
    }

    if (isLoading) {
        return <Loader></Loader>;
    }


    return (
        <ContentContainer style={variant === 'small' ? { position: "relative", left: 0 } : { position: "absolute" }}>
            <Row className="mt-5">
                {variant === 'big' ?
                    (<CalendarCol xxl={3} xl={12}>
                        <CalendarService>
                            <div><p>{displayedDate.getDate()}</p></div>

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

                <CalendarCol xxl={variant === 'big' ? 9 : 12} >
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
        </ContentContainer>
    );
}

export default Calendar;
