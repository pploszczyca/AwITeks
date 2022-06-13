import {toast} from "react-toastify";
import {ForumThreadSummaryResponseBody} from "../api/models/forum-thread-summary-response-body";
import {ActivityActivityTypeEnum} from "../api";

export const errorMsg = () => toast.error("Kurza twarz! Coś poszło nie tak :/", {autoClose: 8000});

export const base64Header = "data:image/jpeg;base64,";

export const  GENERIC_ERROR_MESSAGE = "Błąd serwera. Brak danych";

export const PageRoutes = {
    LOGIN: '/home',
    DASHBOARD: '/dashboard',
    MY_PLANTS: '/my-plants',
    CALENDAR: '/calendar',
    FORUM: '/forum',
    FORUM_THREAD: '/forum/thread'
};

export const DATE_FORMAT = "yyyy-MM-DD";

const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel', 'Data założenia', 'Akcje'];
const classes = ['title', 'num', 'username', 'date', 'action'];

const date = (thread: ForumThreadSummaryResponseBody) => {
   return new Date(thread.creationDate)
}
const content = (thread: ForumThreadSummaryResponseBody) => [
    {
        outsideClass: classes[0],
        content: thread.title
    },
    {
        outsideClass: classes[1],
        content: thread.postsCount
    },
    {
        outsideClass: classes[2],
        content: thread.creatorName
    },
    {
        outsideClass: classes[3],
        content: date(thread).getFullYear() + "-" + (date(thread).getMonth() + 1) + "-" + date(thread).getDate()
    },
    {
        outsideClass: classes[4],
        content: null
    }
]

export interface ThreadDetails {
    id: number;
    title: string;
    creator: string;
    creationDate: string;
}

export { headers, classes, content }
export const ACTIVITY_DESCRIPTION = {
    [ActivityActivityTypeEnum.Watering]: 'Podlanie',
    [ActivityActivityTypeEnum.Fertilisation]: 'Nawiezienie'
};
