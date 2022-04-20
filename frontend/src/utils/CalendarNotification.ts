export enum NotificationSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
};


export interface NotificationItem {
    notificationId: number;
    plantId: number;
    severity: NotificationSeverity; // not sure how severity will be modeled on backend, for now simple enum is assumed
};


export interface CalendarNotification {
    // numbered from 0
    day: number;
    month: number; // maybe should use strings here
    year: number;
    items: NotificationItem[]
};