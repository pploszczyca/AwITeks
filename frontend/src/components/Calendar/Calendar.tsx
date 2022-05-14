import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Card from "react-bootstrap/Card"
import {
    CalendarCol, CalendarService, ExportButton,
    DayWrapperCard, DayHeader, Arrow, CalendarServiceBottom
} from './CalendarStyles';
import {
    DAYS, getDoneMonthNotifications, getOverdueNotifications, getPeriodicPlantActivities, getTileDate,
    getUndoneMonthNotifications, MONTHS, nextMonth, prevMonth, ToggleActivityArgs, WEEKS
} from './utils';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { ContentContainer } from "../App/AppStyle";
import { getApis } from "../../api/initializeApis";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isToday } from './CalendarDay/utils';
import { AddActivityRequestBody } from '../../api/models/add-activity-request-body';
import { DATE_FORMAT } from '../../utils/constants';
import Moment from 'moment';



type CalendarProps = {
    plantId?: number; // if undefined, all plants should be considered
    variant?: 'small' | 'big';
};

function exportCalendar() {
    // TODO
    console.log("export calendar requested");
};

const Calendar: React.FC<CalendarProps> = ({ plantId, variant = 'big' }) => {
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const queryClient = useQueryClient();

    // TODO error handling
    const markActivityDone = useMutation(({ tileDate, notificationItem }: ToggleActivityArgs) => {
        const activity: AddActivityRequestBody = {
            plantId: notificationItem.activity.plant.id,
            activityType: notificationItem.activity.activityType,
            date: Moment(tileDate).format(DATE_FORMAT)
        };

        return getApis().activityApi.addActivity(activity);
    },
        {
            onSuccess: (_, args) => {
                // TODO this probably could be done without total invalidation
                queryClient.invalidateQueries(['activities']);
                queryClient.invalidateQueries(['plants']);
            }
        }
    );

    let { data: plants, isLoading: arePlantsLoading } =
        useQuery(['plants'], () => getApis().plantsApi.getAllPlants().then(resp => resp.data));

    let { data: activities, isLoading: areActivitiesLoading } =
        useQuery(['activities', displayedDate.getFullYear(), displayedDate.getMonth() + 1], () =>
            getApis().activityApi.getActivities(displayedDate.getFullYear(), displayedDate.getMonth() + 1).then(resp => resp.data));

    if (arePlantsLoading || areActivitiesLoading) {
        plants = [];
        activities = [];
    }

    if (plantId !== undefined) {
        // TODO just modify useQuery
        plants = plants!.filter(({ id }) => id === plantId);
        activities = activities!.filter(({ plant }) => plant.id === plantId);
    }


    const plantActivites = getPeriodicPlantActivities(plants!);

    const doneNotifications = getDoneMonthNotifications(displayedDate, activities!);
    const undoneNotifications = getUndoneMonthNotifications(displayedDate, plantActivites);
    const overdueNotifications = getOverdueNotifications(plantActivites);

    function buildCalendarDay(weekNr: number, day: number) {
        const tileDate = getTileDate(weekNr * 7 + day + 1, displayedDate);
        const done = doneNotifications.get(tileDate.getDate()) ?? [];
        const undone = undoneNotifications.get(tileDate.getDate()) ?? [];

        return <CalendarDay
            displayedDate={displayedDate}
            doneNotifications={done}
            undoneNotifications={undone}
            overdueNotifications={isToday(tileDate) ? overdueNotifications : undefined}
            onToggleNotification={markActivityDone.mutate}
            tileDate={tileDate}
            variant={variant}
        />;
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
                                    <Card as={DayWrapperCard} style={{ minHeight: variant === 'small' ? "6rem" : "" }}>
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
