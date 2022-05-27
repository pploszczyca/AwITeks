import {faDroplet, faLeaf} from "@fortawesome/free-solid-svg-icons";
import Moment from 'moment';
import {ActivityActivityTypeEnum, Plant} from '../../../api';
import {NotificationItem, NotificationSeverity} from '../utils';

export type NewActivityOption = {
    activityType: ActivityActivityTypeEnum,
    plantId: number,
};

export const ACTIVITY_ICONS = {
    [ActivityActivityTypeEnum.Watering]: faDroplet,
    [ActivityActivityTypeEnum.Fertilisation]: faLeaf,
};

export const ICON_STYLES = {
    [ActivityActivityTypeEnum.Watering]: {
        color: '#03a5fc'
    },
    [ActivityActivityTypeEnum.Fertilisation]: {
        color: '#1b9431'
    },
};

export const ACTIVITY_DESCRIPTION = {
    [ActivityActivityTypeEnum.Watering]: 'Podlanie',
    [ActivityActivityTypeEnum.Fertilisation]: 'Nawiezienie'
};

export function getSupportedActivityTypes(): ActivityActivityTypeEnum[] {
    return [ActivityActivityTypeEnum.Watering, ActivityActivityTypeEnum.Fertilisation];
}

export function isToday(date: Date): boolean {
    return Moment().isSame(date, 'day');
}

export function getMaxSeverity(notifications: NotificationItem[]): NotificationSeverity {
    return notifications
        .map(({ severity }) => severity)
        .reduce((severity, curr) => severity > curr ? severity : curr, NotificationSeverity.DONE);
}


export function getSeverityColor(severity: NotificationSeverity): string {
    switch (severity) {
        case NotificationSeverity.DONE: return 'none';
        case NotificationSeverity.LOW: return '#0b8f23';
        case NotificationSeverity.MEDIUM: return '#e8d335';
        case NotificationSeverity.HIGH: return '#e30220';
        default: throw new Error("Invalid severity: " + severity);
    }
}


export function getUniqueActivityTypes(notifications: NotificationItem[]): ActivityActivityTypeEnum[] {
    return Array.from(new Set(notifications.map(({ activity }) => activity.activityType)).values()).sort();
}

export function getInvalidNewActivityOptions(plants: Plant[], currentNotifications: NotificationItem[]): NewActivityOption[] {
    return currentNotifications
        .map(({activity}) => ({plantId: activity.plant.id, activityType: activity.activityType}))
}
