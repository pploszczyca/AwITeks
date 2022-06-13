import {UserPlantSummaryActivityTypesEnum} from "../../api";
import {ACTIVITY_DESCRIPTION} from "../../utils/constants";
import moment from "moment";
import 'moment/locale/pl';

export function activitiesOrganizer(activities: any){
    if (activities){
        return activities.map((activity: any) => {
            const translateTypes = activity.activityTypes.map((activity: UserPlantSummaryActivityTypesEnum) => (
                ACTIVITY_DESCRIPTION[activity])
            );

            return {
                plantName: activity.plantName,
                activityTypes: translateTypes.join(', '),
            }
        }).slice(0, 5);
    }
    return activities;
}

export function forumThreadsOrganizer(forumThreads: any){
    if(forumThreads){
        return forumThreads.map((thread: any) => {
            return {
                title: thread.title,
                content: thread.content,
                date: moment(thread.date).calendar()
            }
        }).slice(0, 5);
    }
}
