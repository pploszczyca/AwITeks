import { ForumThread } from "../api";

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

const date = (thread: ForumThread) => {
   return new Date(thread.forumPosts[0].date)
}
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
        content: date(thread).getFullYear() + "-" + (date(thread).getMonth() + 1) + "-" + date(thread).getDate()
    },
    {
        outsideClass: classes[4],
        content: null
    }
]

export { headers, classes, content }
