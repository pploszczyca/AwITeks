import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { ForumHeader, ForumCol, ForumTile, ForumRow, OpenButton, Star, ForumContainer} from "./ForumStyles";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { ForumThread } from "../../api/models/forum-thread";
import { useMutation, useQuery, useQueryClient } from "react-query";

const mockData = [  ['tytuł tematu 1', '7', 'username1', '2022-01-03'],
                    ['tytuł tematu 2', '14', 'username2', '2022-04-30'],
                    ['Extremely long title. So incredibly, laborously long, it doesn;t fit in the limited space', '55', 'incrediby_long_username_that_is_too_long', '2021-12-17'],
                    ['tytuł tematu 3', '9', 'username3', '2021-12-07'], 
                    ['tytuł tematu 4', '2', 'username4', '2022-02-28'], 
                    ['tytuł tematu 5', '6', 'username5', '2021-12-30'], 
                    ['tytuł tematu 6', '11', 'username6', '2021-12-17']
                    ];


const Forum: React.FC<{}> = () => {
    const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel tematu', 'Data założenia tematu','Akcje'];
    const classes = ['title','num','username','date','action'];
    const COLS = Array.from(Array(headers.length).keys());
    const ROWS = Array.from(Array(mockData.length).keys());

    const [isFavourite, setFavourite] = useState(Array(mockData.length).fill(false));

    function toggleFavourite(idx: number){
        setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    };
    
    // const toggleFavourite = useMutation((ForumThread: ForumThread) => {
    //     ForumThread.isFavourite = !ForumThread.isFavourite;
    //     let idx = ForumThread.id;
    //     setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    //     return; }, {});

    function getHeaderRow(){
        return(
            <ForumRow  className="m-0">
                {COLS.map(idx => (<ForumCol className={classes[idx]}>
                                    <ForumHeader className={classes[idx]}>{headers[idx]}</ForumHeader>
                                </ForumCol>))}
            </ForumRow>
        )
    }

    function getTableElem(rowNum: number, colNum: number) {
        let data = mockData[rowNum][colNum];
        let last = (colNum === (headers.length-1));
        return (
            last === false ? 
                <ForumTile className='not-last'>{data}</ForumTile>  //className={name}
                : 
                <ForumTile>
                    <OpenButton>Otwórz</OpenButton>
                    <Star icon = {faStarSolid} 
                        className={isFavourite[rowNum] ? 'starred': 'unstarred'} 
                        onClick={() => toggleFavourite(rowNum)} 
                    />
                </ForumTile>
        )
    }

    return (
        <ForumContainer>
            <Row className="mt-5">
                    {getHeaderRow()}
                    {ROWS.map(rowNum => (
                        <ForumRow className="m-0" key={rowNum}>
                            {COLS.map(colNum => (
                                <ForumCol className={classes[colNum]} key={`${rowNum}.${colNum}`} >
                                    {getTableElem(rowNum, colNum)}
                                </ForumCol>
                            ))}
                        </ForumRow>
                    ))}
            </Row>
        </ForumContainer>
    )
};

export default Forum;