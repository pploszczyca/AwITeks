import React, {useRef, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {
    AddThreadBtn,
    ForumCol,
    ForumContainer,
    ForumHeader,
    ForumRow,
    ForumTile,
    OpenButton,
    SearchBoxContainerModified,
    SearchBoxModified,
    Star
} from "./ForumStyles";
import {faMagnifyingGlass, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import {ForumThreadSummaryResponseBody} from "../../api/models/forum-thread-summary-response-body";
import {getThreadsList} from "./mockData";
import FilterChips from "./FilterChips/FilterChips";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {classes, content, headers, PageRoutes} from "../../utils/constants";
import {AddThreadForm} from "../AddThreadForm/AddThreadForm";

const Forum: React.FC<{}> = () => {
    let mockData = getThreadsList(10);
    const [isFavourite, setFavourite] = useState(mockData.map(elem => elem.isFollowed));
    const [filteredData, setFilteredData] = useState(mockData);
    const [filters, setFilters] = useState(["",'',''])
    const UserID = 1;
    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const navigate = useNavigate();
    const [showAddThreadForm, setShowAddThreadForm] = useState(false);

    const filterSearchBar = (e: { target: { value: string; }; }) => {
        const keyword = e.target.value;
        filters[0] = keyword;
        setFilters(filters);
        filterData();
    };

    const filterChip = (id: number) => {
        filters[id] = '1';
        setFilters(filters);
        filterData();
    };

    const filterData = () => {
        let result = mockData;
        if(filters[0]!==''){
            const keyword: string = filters[0];
            result = mockData.filter((thread) => {
                return thread.title.toLowerCase().includes(keyword.toLowerCase());
            });
        }
        if(filters[1]!==''){
            result = result.filter((elem: ForumThreadSummaryResponseBody) => elem.isFollowed===true);
        }
        if(filters[2]!==''){
            result = result.filter((elem: ForumThreadSummaryResponseBody) => elem.creator.id===UserID);
        }
        setFilteredData(result);
        
    };

    function toggleFavourite(idx: number, id: number){
        filteredData[idx].isFollowed = !filteredData[idx].isFollowed;//how much of that is really necessary?
        for(var i=0; i<mockData.length;i++){
            if(mockData[i].id === id){
                mockData[i].isFollowed = !mockData[i].isFollowed;
                break;
            }
        }
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

    function getThread(thread: ForumThreadSummaryResponseBody, idx: number){
        return(
            <ForumRow key={thread.id} className="m-0">
                {content(thread).map((column, colId) => {
                    return (
                        <ForumCol key={colId} className={column.outsideClass}>
                            <ForumTile className={"not-last py-2 align-items-center d-flex"}>
                                {colId === content(thread).length - 1 ? (
                                    <>
                                        {/*TODO: navigation system - demo below*/}
                                        <OpenButton onClick={
                                            () => navigate(PageRoutes.FORUM_THREAD,
                                                {state: {
                                                        id: thread.id,
                                                        title: thread.title,
                                                        creator: thread.creatorName,
                                                        creationDate: thread.creationDate
                                                }})
                                        }>
                                            Otwórz
                                        </OpenButton>

                                        <Star icon = {faStarSolid}
                                              className={isFavourite[thread.id] ? 'starred': 'unstarred'}
                                              onClick={() => toggleFavourite(idx, thread.id)}
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
        <>
            <ForumContainer>
                <h2 className='text-center my-3'>Znajdź interesujący Cię temat w liście poniżej lub załóż nowy temat.</h2>
                <Row className='px-2 justify-content-center'>
                    <Col xxl={2} lg={4} className='my-2'>
                        <FilterChips text="Tylko obserwowane" id={1}/>
                    </Col>
                    <Col xxl={2} lg={4} className='my-2'>
                        <FilterChips text="Założone przez Ciebie" id={2}/>
                    </Col>
                    <Col xxl={6} lg={8} className='my-2'>
                        <SearchBoxContainerModified onClick={() => searchInputRef.current?.focus()}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                            <SearchBoxModified ref={searchInputRef} type="text" placeholder="Wyszukaj temat po nazwie" onChange={filterSearchBar}/>
                        </SearchBoxContainerModified>
                    </Col>
                    <Col xxl={2} lg={4} className='my-2'>
                        <AddThreadBtn onClick={() => setShowAddThreadForm(true)}>Dodaj nowy temat</AddThreadBtn>
                    </Col>
                </Row>
                <Row className="mt-5">
                    {getHeaderRow()}
                    {filteredData.map((thread,idx) => getThread(thread, idx))}
                </Row>
            </ForumContainer>
            <AddThreadForm show={showAddThreadForm} setShowThreadForm={setShowAddThreadForm}/>
        </>
    )
};

export default Forum;
