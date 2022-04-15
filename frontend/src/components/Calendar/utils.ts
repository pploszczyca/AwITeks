import { CalendarNotification, NotificationItem } from "../../utils/CalendarNotification";

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