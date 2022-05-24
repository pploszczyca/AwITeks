import { Plant, Activity } from "../../api";
import Moment from 'moment';
import { DATE_FORMAT } from "../../utils/constants";


export enum NotificationSeverity {
    DONE,
    LOW,
    MEDIUM,
    HIGH,
};

export type NotificationItem = {
    activity: Activity;
    severity: NotificationSeverity;
};


export type ToggleActivityArgs = {
    tileDate: Date;
    notificationItem: NotificationItem;
};


export const DAYS = Array.from(Array(7).keys());
export const WEEKS = Array.from(Array(6).keys());
export const MONTHS = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
export const MIN_LOW_SEVERITY_DAY_DIFFERENCE = 3;

export function nextMonth(date: Date): Date {
    let day = 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month >= 12) {
        month = 0;
        year++;
    }

    const result = new Date(year, month, day);

    if (Moment().isSame(result, 'month')) {
        return new Date();
    }

    return result;
}

export function prevMonth(date: Date): Date {
    let day = 1;
    let month = date.getMonth() - 1;
    let year = date.getFullYear();

    if (month < 0) {
        month = 11;
        year--;
    }

    const result = new Date(year, month, day);

    if (Moment().isSame(result, 'month')) {
        return new Date();
    }

    return result;
}


export function getTileDate(fieldNumber: number, date: Date): Date {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    if (firstDay === 0) {
        firstDay = 7; // sunday is 7th day in calendar
    }
    let actualDayNumber = fieldNumber - firstDay + 1;
    return new Date(date.getFullYear(), date.getMonth(), actualDayNumber);
}

function calculateSeverity(activity: Activity): NotificationSeverity {
    const date = Moment(activity.date);

    if (Moment().isBefore(date)) {
        return Moment(date).diff(Moment(), 'days') >= MIN_LOW_SEVERITY_DAY_DIFFERENCE ?
            NotificationSeverity.LOW : NotificationSeverity.MEDIUM;
    }

    return NotificationSeverity.HIGH;
}


export function getPeriodicPlantActivities(plants: Plant[]): Activity[] | null {

    return plants ? plants.flatMap(plant => ([
        {
            activityType: 'WATERING',
            date: Moment(plant.lastWateringDate).add(plant.species.waterRoutine, 'days').format(DATE_FORMAT),
            plant,
        },
        {
            activityType: 'FERTILISATION',
            date: Moment(plant.lastFertilizationDate).add(plant.species.fertilizationRoutine, 'days').format(DATE_FORMAT),
            plant,
        }
    ])) : null;
}

const addNotifications = (displayedDate: Date, calendarNotifications: Map<number, NotificationItem[]>,
    activities: Activity[], severityFn: (a: Activity) => NotificationSeverity) => {

    if(activities){
        activities
            .filter(activity => Moment(displayedDate).isSame(Moment(activity.date), 'month'))
            .forEach(activity => {
                const activityDay = new Date(activity.date).getDate();
                const notificationItem = {
                    activity,
                    severity: severityFn(activity)
                };

                const dayNotifications = calendarNotifications.get(activityDay);

                if (dayNotifications != null) {
                    dayNotifications.push(notificationItem);
                }
                else {
                    calendarNotifications.set(activityDay, [notificationItem]);
                }
            });
    }
}


export function getDoneMonthNotifications(displayedDate: Date, doneActivities: Activity[]): Map<number, NotificationItem[]> {
    const calendarNotifications: Map<number, NotificationItem[]> = new Map();

    addNotifications(displayedDate, calendarNotifications, doneActivities, (_) => NotificationSeverity.DONE);

    return calendarNotifications;
}

export function getUndoneMonthNotifications(displayedDate: Date, undoneActivities: Activity[]): Map<number, NotificationItem[]> {
    const calendarNotifications: Map<number, NotificationItem[]> = new Map();

    addNotifications(displayedDate, calendarNotifications, undoneActivities, calculateSeverity);

    return calendarNotifications;
}

export function getOverdueNotifications(undoneActivities: Activity[]): NotificationItem[] {
    return undoneActivities
        .filter(activity => Moment().isAfter(activity.date, 'day'))
        .map(activity => ({ activity, severity: NotificationSeverity.HIGH }));
}
