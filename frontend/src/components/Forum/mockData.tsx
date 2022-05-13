import {ForumThread, User} from "../../api";

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

