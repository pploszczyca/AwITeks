import {ForumThread} from "../api";

export const PageRoutes = {
    LOGIN: '/home',
    DASHBOARD: '/dashboard',
    MY_PLANTS: '/my-plants',
    CALENDAR: '/calendar',
    FORUM: '/forum',
    SETTINGS: '/settings',
    FORUM_THREAD: '/forum/thread'
};

const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel', 'Data założenia','Akcje'];
const classes = ['title', 'num', 'username', 'date', 'action'];

const content = (thread: ForumThread) => [
    {
        outsideClass: classes[0],
        content: thread.title
    },
    {
        outsideClass: classes[1],
        content: thread.forumPosts.length
    },
    {
        outsideClass: classes[2],
        content: thread.creator.username
    },
    {
        outsideClass: classes[3],
        content: thread.dateCreated.getFullYear()+"-"+(thread.dateCreated.getMonth()+1)+"-"+thread.dateCreated.getDate()
    },
    {
        outsideClass: classes[4],
        content: null
    }
]

export {headers, classes, content}
