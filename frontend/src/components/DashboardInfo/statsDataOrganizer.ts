import {ACTIVITY_DESCRIPTION} from "../Calendar/CalendarDay/utils";
import {UserPlantSummaryActivityTypesEnum} from "../../api";

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
        })
    }
    return activities;
}

export function forumThreadsOrganizer(){

}
