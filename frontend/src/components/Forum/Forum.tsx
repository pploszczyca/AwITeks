import React, {useRef, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {ForumHeader, ForumCol, ForumTile, ForumRow, OpenButton, Star, ForumContainer, SearchBoxContainerModified, SearchBoxModified, AddThreadBtn} from "./ForumStyles";
import {faMagnifyingGlass, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import { ForumThread } from "../../api";
import {getMockThread, headers, classes, content} from "./mockData";
import FilterChips from "./FilterChips/FilterChips";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Forum: React.FC<{}> = () => {
    let mockData = Array.from(Array(10).keys()).map(idx => getMockThread(idx));
    const [isFavourite, setFavourite] = useState(mockData.map(elem => elem.isFavourite));
    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

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
            <h2 className='text-center my-3'>Znajdź interesujący Cię temat w liście poniżej lub załóż nowy temat.</h2>
            <Row className='px-2 my-5'>
                <Col xs={2}>
                    <FilterChips text="Tylko obserwowane"/>
                </Col>
                <Col xs={2}>
                    <FilterChips text="Założone przez Ciebie"/>
                </Col>
                <Col xs={6}>
                    <SearchBoxContainerModified onClick={() => searchInputRef.current?.focus()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                        <SearchBoxModified ref={searchInputRef} type="text" placeholder="Wyszukaj temat po nazwie" />
                    </SearchBoxContainerModified>
                </Col>
                <Col xs={2}>
                    <AddThreadBtn>Dodaj nowy temat</AddThreadBtn>
                </Col>
            </Row>
            <Row className="mt-5">
                    {getHeaderRow()}
                    {mockData.map((thread,idx) => getThread(thread, idx))}
            </Row>
        </ForumContainer>
    )
};

export default Forum;
