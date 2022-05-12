import React, { useState } from 'react';
import { Row } from "react-bootstrap";
import { ForumHeader, ForumCol, ForumTile, ForumRow, OpenButton, Star, ForumContainer} from "./ForumStyles";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { ForumThread } from "../../api";
import {getMockThread, headers, classes, content} from "./mockData";


const Forum: React.FC<{}> = () => {
    let mockData = Array.from(Array(10).keys()).map(idx => getMockThread(idx));
    const [isFavourite, setFavourite] = useState(mockData.map(elem => elem.isFavourite));


    function toggleFavourite(idx: number){
        mockData[idx].isFavourite = !mockData[idx].isFavourite;
        setFavourite(isFavourite.map((element, currIdx) => currIdx===idx ? !element : element));
    }

    function getHeaderRow(){
        return(
            <ForumRow  className="m-0">
                {headers.map((header, idx) => (
                    <ForumCol key={idx} className={classes[idx]}>
                        <ForumHeader key={idx} className={classes[idx]}>{headers[idx]}</ForumHeader>
                    </ForumCol>
                ))}
            </ForumRow>
        )
    }

    function getThread(thread: ForumThread, idx: number){
        return(
            <ForumRow key={thread.id} className="m-0">
                {content(thread).map((column, colId) => {
                    return (
                        <ForumCol key={colId} className={column.outsideClass}>
                            <ForumTile className={column.insideClass}>
                                {colId === content(thread).length - 1 ? (
                                    <>
                                        <OpenButton>Otwórz</OpenButton>
                                        <Star icon = {faStarSolid}
                                              className={isFavourite[idx] ? 'starred': 'unstarred'}
                                              onClick={() => toggleFavourite(idx)}
                                        />
                                    </>
                                ) : (
                                    <>{column.content}</>
                                )}
                            </ForumTile>
                        </ForumCol>
                    )
                })}
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
