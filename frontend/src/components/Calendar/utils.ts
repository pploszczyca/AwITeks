import { Plant, Activity } from "../../api";
import { CalendarNotification, NotificationItem, NotificationSeverity } from "../../utils/CalendarNotification";
import Moment from 'moment';
import { DATE_FORMAT } from "../../utils/constants";

export const DAYS = Array.from(Array(7).keys());
export const WEEKS = Array.from(Array(6).keys());
export const MONTHS = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

export function nextMonth(date: Date): Date {
    let day = 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month >= 12) {
        month = 0;
        year++;
    }

    return new Date(year, month, day);
}

export function prevMonth(date: Date): Date {
    let day = 1;
    let month = date.getMonth() - 1;
    let year = date.getFullYear();

    if (month < 0) {
        month = 11;
        year--;
    }


    return new Date(year, month, day);
}


export function getTileDate(fieldNumber: number, date: Date): Date {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    if (firstDay === 0) {
        firstDay = 7; // sunday is 7th day in calendar
    }
    let actualDayNumber = fieldNumber - firstDay + 1;
    return new Date(date.getFullYear(), date.getMonth(), actualDayNumber);
}

export function getTileNotifications(tileDate: Date, notifications: CalendarNotification[]): NotificationItem[] {
    // TODO this should be optimised when we get shape of notifications from backend

    const tileNotifications = notifications
        .find(({ day, month, year }) =>
            day === tileDate.getDate() && month === tileDate.getMonth() && year === tileDate.getFullYear());

    return tileNotifications == null ? [] : tileNotifications!.items;
}

export function calculateSeverity(date: Date) {
    if (Moment().isBefore(date)) {
        return Moment().diff(date, 'days') >= 3 ? NotificationSeverity.LOW : NotificationSeverity.MEDIUM;
    }

    return NotificationSeverity.HIGH;
}


function getPeriodicPlantActivities(plant: Plant): Activity[] {
    return [
        {
            activityType: 'WATERING',
            date: Moment(plant.lastWateringDate).add(plant.species.waterRoutine).format(DATE_FORMAT),
            plant
        },
        {
            activityType: 'FERTILISATION',
            date: Moment(plant.lastFertilizationDate).add(plant.species.fertilizationRoutine).format(DATE_FORMAT),
            plant
        }
    ];
}


export function getMonthNotifications(displayedDate: Date, monthActivities: Activity[], plants: Plant[] = []): Map<number, NotificationItem[]> {
    const calendarNotifications: Map<number, NotificationItem[]> = new Map();

    const plantActivities = plants
        .flatMap(getPeriodicPlantActivities)
        .filter(activity => Moment(displayedDate).isSame(Moment(activity.date), 'month'));

    [...plantActivities, ...monthActivities].forEach(activity => {
        const activityDay = new Date(activity.date).getDate();
        const dayNotifications = calendarNotifications.get(activityDay);
        const notificationItem = {
            activity,
            severity: calculateSeverity(new Date(activity.date))
        };

        console.log(notificationItem);

        if (dayNotifications != null) {
            dayNotifications.push(notificationItem);
        }
        else {
            calendarNotifications.set(activityDay, [notificationItem]);
        }
    });

    return calendarNotifications;
}