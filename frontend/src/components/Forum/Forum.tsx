import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { ForumHeader, ForumCol, ForumTile, ForumRow, OpenButton, Star, ForumContainer} from "./ForumStyles";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { ForumThread } from "../../api/models/forum-thread";
import {User} from "../../api/models/user";

const Forum: React.FC<{}> = () => {
    function getMockThread(idx: number){
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
    
    const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel tematu', 'Data założenia tematu','Akcje'];
    const classes = ['title','num','username','date','action'];

    let mockData = Array.from(Array(10).keys()).map(idx => getMockThread(idx));
   
    const COLS = Array.from(Array(headers.length).keys());

    const [isFavourite, setFavourite] = useState(mockData.map(elem => elem.isFavourite));

    function toggleFavourite(idx: number){
        mockData[idx].isFavourite = !mockData[idx].isFavourite;
        setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    };

    function getHeaderRow(){
        return(
            <ForumRow  className="m-0">
                {COLS.map(idx => (<ForumCol key={idx} className={classes[idx]}>
                                    <ForumHeader key={idx} className={classes[idx]}>{headers[idx]}</ForumHeader>
                                </ForumCol>))}
            </ForumRow>
        )
    }

    function getThread(thread: ForumThread, idx: number){
        return(
            <ForumRow key={thread.id} className="m-0">
                <ForumCol  className='title'>
                    <ForumTile className='not-last'>{thread.title}</ForumTile>
                </ForumCol>
                <ForumCol  className='num'>
                    <ForumTile className='not-last'>{thread.forumPosts.length}</ForumTile>
                </ForumCol>
                <ForumCol  className='username'>
                    <ForumTile className='not-last'>{thread.creator.username}</ForumTile>
                </ForumCol>
                <ForumCol  className='date'>
                    <ForumTile className='not-last'>
                        {thread.dateCreated.getFullYear()+"-"+(thread.dateCreated.getMonth()+1)+"-"+thread.dateCreated.getDate()}
                    </ForumTile>
                </ForumCol>
                <ForumCol  className='action'>
                    <ForumTile>
                        <OpenButton>Otwórz</OpenButton>
                        <Star icon = {faStarSolid} 
                            className={isFavourite[idx] ? 'starred': 'unstarred'} 
                            onClick={() => toggleFavourite(idx)} 
                        />
                    </ForumTile>
                </ForumCol>
            </ForumRow>
        )
    }

    return (
        <ForumContainer>
            <Row className="mt-5">
                    {getHeaderRow()}
                    {mockData.map((thread,idx) => getThread(thread, idx))}
            </Row>
        </ForumContainer>
    )
};

export default Forum;