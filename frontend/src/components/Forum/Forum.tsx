import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { ContentContainer } from "../App/AppStyle";
import { ForumHeader, ForumCol, ForumTile, ForumRow, OpenButton, Star} from "./ForumStyles";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const mockData = [  ['tytuł tematu 1', '7', 'username1', '2022-01-03'],
                    ['tytuł tematu 2', '14', 'username2', '2022-04-30'],
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

    function toggleClass(idx: number){
        setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    };

    function getHeaderRow(){
        return(
            <ForumRow  className="m-0">
                {COLS.map(idx => (<ForumCol className={classes[idx]}><ForumHeader className={classes[idx]}>{headers[idx]}</ForumHeader></ForumCol>))}
            </ForumRow>
        )
    }

    function getTableElem(rowNum: number, colNum: number) {
        let data = mockData[rowNum][colNum];
        let last = (colNum === headers.length-1);
        let name = classes[colNum]
        return (
            last === false ? <ForumTile className={name}>{data}</ForumTile> : <ForumTile>
                                                                                <OpenButton>Otwórz</OpenButton>
                                                                                <Star icon = {faStarSolid} 
                                                                                    className={isFavourite[rowNum] ? 'starred': 'unstarred'} 
                                                                                    onClick={() => toggleClass(rowNum)} 
                                                                                />
                                                                            </ForumTile>
        )
    }

    return (
        <ContentContainer>
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
        </ContentContainer>
    )
};

export default Forum;