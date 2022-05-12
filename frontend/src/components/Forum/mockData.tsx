import {ForumThread, User} from "../../api";
import React from "react";

const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel tematu', 'Data założenia tematu','Akcje'];
const classes = ['title', 'num', 'username', 'date', 'action'];

const content = (thread: ForumThread) => [
    {
        outsideClass: classes[0],
        insideClass: 'not-last',
        content: thread.title
    },
    {
        outsideClass: classes[1],
        insideClass: 'not-last',
        content: thread.forumPosts.length
    },
    {
        outsideClass: classes[2],
        insideClass: 'not-last',
        content: thread.creator.username
    },
    {
        outsideClass: classes[3],
        insideClass: 'not-last',
        content: thread.dateCreated.getFullYear()+"-"+(thread.dateCreated.getMonth()+1)+"-"+thread.dateCreated.getDate()
    },
    {
        outsideClass: classes[4],
        insideClass: 'not-last',
        content: null
    }
]

export function getMockThread(idx: number){
    let date: Date = new Date("2019-01-16");
    let user: User = {
        username: "username"+idx,
        id: idx,
        email: '',
        userPlants: [],
        forumPostList: [],
        forumThreadList: []
    };
    let mockThread: ForumThread = {
        id: idx,
        title: "tytuł tematu " + idx,
        creator: user,
        isFavourite: false,
        dateCreated: date,
        forumPosts: []
    };
    return mockThread;
}

export {headers, classes, content}
