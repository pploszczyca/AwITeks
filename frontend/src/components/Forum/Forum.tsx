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
    const ROWS = Array.from(Array(mockData.length).keys());

    const [isFavourite, setFavourite] = useState(mockData.map(elem => elem.isFavourite));

    function toggleFavourite(idx: number){
        mockData[idx].isFavourite = !mockData[idx].isFavourite;
        setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    };

    function getData(rowNum: number, colNum: number){
        var data;
        switch(colNum){
            case 0: {
                data = mockData[rowNum].title;
                break;
            }
            case 1: {
                data = mockData[rowNum].forumPosts.length;
                break;
            }
            case 2: {
                data = mockData[rowNum].creator.username;
                break;
            }
            case 3: {
                let date = mockData[rowNum].dateCreated;
                data = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                break;
            }
            default: {
                data = "---";
                break;
            }
                
        }
        return data;
    }

    function getHeaderRow(){
        return(
            <ForumRow  className="m-0">
                {COLS.map(idx => (<ForumCol key={idx} className={classes[idx]}>
                                    <ForumHeader key={idx} className={classes[idx]}>{headers[idx]}</ForumHeader>
                                </ForumCol>))}
            </ForumRow>
        )
    }

    function getTableElem(rowNum: number, colNum: number) {
        let data = getData(rowNum, colNum);
        let last = (colNum === (headers.length-1));
        return (
            last === false ? 
                <ForumTile key={rowNum+'.'+colNum} className='not-last'>{data}</ForumTile>  //className={name}
                : 
                <ForumTile key={rowNum+'.'+colNum}>
                    <OpenButton>Otwórz</OpenButton>
                    <Star icon = {faStarSolid} 
                        className={isFavourite[rowNum] ? 'starred': 'unstarred'} 
                        onClick={() => toggleFavourite(rowNum)} 
                    />
                </ForumTile>
        )
    }

    function getThread(rowNum: number){
        return(
            <ForumRow key={rowNum} className="m-0">
                {COLS.map(colNum => (
                    <ForumCol key={rowNum+'.'+colNum} className={classes[colNum]}>
                        {getTableElem(rowNum, colNum)}
                    </ForumCol>
                ))}
            </ForumRow>
        )
    }

    return (
        <ForumContainer>
            <Row className="mt-5">
                    {getHeaderRow()}
                    {ROWS.map(idx => getThread(idx))}
            </Row>
        </ForumContainer>
    )
};

export default Forum;