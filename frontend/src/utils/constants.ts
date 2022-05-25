import {ForumThreadSummaryResponseBody} from "../api/models/forum-thread-summary-response-body";

export const base64Header = "data:image/jpeg;base64,";

export const PageRoutes = {
    LOGIN: '/home',
    DASHBOARD: '/dashboard',
    MY_PLANTS: '/my-plants',
    CALENDAR: '/calendar',
    FORUM: '/forum',
    SETTINGS: '/settings',
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
