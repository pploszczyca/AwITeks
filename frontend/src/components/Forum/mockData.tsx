import {ForumThreadSummaryResponseBody} from "../../api/models/forum-thread-summary-response-body";

function getThread(idx: number): ForumThreadSummaryResponseBody{
    return {
        id: idx,
        title: "Tytuł " + idx,
        creatorName: "Janusz" + idx,
        creationDate: new Date().toDateString(),
        postsCount: 4,
        isFollowed: false
    }
}

export function getThreadsList(noThreads: number){
    const threadList: ForumThreadSummaryResponseBody[] = []

    for (let i = 0; i < noThreads; i++){
        threadList.push(getThread(i));
    }

    return threadList;
}

