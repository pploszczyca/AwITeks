import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getApis} from "../../api/initializeApis";
import {AddActivityRequestBody} from '../../api/models/add-activity-request-body';
import {DATE_FORMAT, errorMsg} from '../../utils/constants';
import {ContentContainer} from "../App/AppStyle";
import {CalendarDay} from './CalendarDay/CalendarDay';
import {isToday} from './CalendarDay/utils';
import {
    Arrow,
    CalendarCol,
    CalendarService,
    CalendarServiceBottom,
    DayHeader,
    DayWrapperCard,
    ExportButton
} from './CalendarStyles';
import {
    DAYS,
    getDoneMonthNotifications,
    getOverdueNotifications,
    getPeriodicPlantActivities,
    getTileDate,
    getUndoneMonthNotifications,
    MONTHS,
    nextMonth,
    prevMonth,
    WEEKS
} from './utils';
import {Activity} from "../../api";
import { saveAs } from 'file-saver';
import {downloadFile} from "../../utils/api";

type CalendarProps = {
    plantId?: number; // if undefined, all plants should be considered
    variant?: 'small' | 'big';
};

const Calendar: React.FC<CalendarProps> = ({ plantId, variant = 'big' }) => {
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const queryClient = useQueryClient();

    const addActivity = useMutation((activity: AddActivityRequestBody) => (
        getApis().activityApi.addActivity(activity)
        ),
        {
            onSuccess: (_, args) => {
                // TODO this probably could be done without total invalidation
                queryClient.invalidateQueries(['activities']);
                queryClient.invalidateQueries(['plants']);
            },
            onError: (error) => {
                errorMsg()
            }
        }
    );

    let { data: plants, isLoading: arePlantsLoading } =
        useQuery(
            ['plants'],
            () => getApis().plantsApi.getAllPlants().then(resp => resp.data),
            {onError: (error) => errorMsg()}
        );

    let { data: activities, isLoading: areActivitiesLoading } =
        useQuery(['activities',
                  displayedDate.getFullYear(),
                  displayedDate.getMonth() + 1
                ],
                () => getApis().activityApi.getActivities(
                        displayedDate.getFullYear(),
                        displayedDate.getMonth() + 1
                 ).then(resp => resp.data),
            {onError: (error) => errorMsg()}
        );


    const downloadIcsFile = () => {
        downloadFile().then(blob => saveAs(blob, 'my_plants_calendar.ics'))
    }

    if (arePlantsLoading || areActivitiesLoading) {
        plants = [];
        activities = [];
    }

    if (plantId !== undefined) {
        // TODO just modify useQuery
        plants = plants!.filter(({ id }) => id === plantId);
        activities = activities!.filter(({ plant }) => plant.id === plantId);
    }

    console.log(plants);


    const plantActivities: Activity[] | null = getPeriodicPlantActivities(plants!);

    const doneNotifications = getDoneMonthNotifications(displayedDate, activities!);
    const undoneNotifications = plantActivities ? getUndoneMonthNotifications(displayedDate, plantActivities) : null;
    const overdueNotifications = plantActivities ? getOverdueNotifications(plantActivities) : [];

    function buildCalendarDay(weekNr: number, day: number) {
        const tileDate = getTileDate(weekNr * 7 + day + 1, displayedDate);
        const done = doneNotifications.get(tileDate.getDate()) ?? [];
        const undone = undoneNotifications ? undoneNotifications.get(tileDate.getDate()) ?? [] : [];

        return <CalendarDay
            displayedDate={displayedDate}
            tileDate={tileDate}
            plants={plants!}
            doneNotifications={done}
            undoneNotifications={undone}
            overdueNotifications={isToday(tileDate) ? overdueNotifications : undefined}
            onToggleNotification={(args) => {
                return addActivity.mutateAsync({
                    activityType: args.notificationItem.activity.activityType,
                    date: Moment(args.tileDate).format(DATE_FORMAT),
                    plantId: args.notificationItem.activity.plant.id
                })
            }}
            onAddNewActivity={(args) => {
                return addActivity.mutateAsync({
                    activityType: args.activityType,
                    date: Moment(args.date).format(DATE_FORMAT),
                    plantId: args.plantId
                });
            }}
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
                                <ExportButton onClick={() => downloadIcsFile()}>
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
