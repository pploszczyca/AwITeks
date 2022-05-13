import { Activity } from "../api";

export enum NotificationSeverity {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
};


export interface NotificationItem {
    activity: Activity;
    severity: NotificationSeverity;
};


export interface CalendarNotification {
    // numbered from 0
    day: number;
    month: number; // maybe should use strings here
    year: number;
    items: NotificationItem[]
};
