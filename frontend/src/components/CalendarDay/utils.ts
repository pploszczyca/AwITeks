import { NotificationItem, NotificationSeverity } from "../../utils/CalendarNotification";

export function isToday(date: Date): boolean {
    const currentDate = new Date();
    return date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();
}

export function getMaxSeverity(notifications: NotificationItem[]): NotificationSeverity {
    let maxSeverity = NotificationSeverity.LOW;

    // dont want to use numbers in enums, uglier data transfer
    notifications.map(({ severity }) => severity).forEach(severity => {
        if (severity === NotificationSeverity.HIGH)
            maxSeverity = NotificationSeverity.HIGH;
        else if (severity === NotificationSeverity.MEDIUM && maxSeverity !== NotificationSeverity.HIGH)
            maxSeverity = NotificationSeverity.MEDIUM;
    });

    return maxSeverity;
}

export function getSeverityColor(severity: NotificationSeverity): string {
    switch (severity) {
        case NotificationSeverity.LOW: return 'green';
        case NotificationSeverity.MEDIUM: return 'yellow';
        case NotificationSeverity.HIGH: return 'red';
        default: throw new Error("Invalid severity: " + severity);
    }
}