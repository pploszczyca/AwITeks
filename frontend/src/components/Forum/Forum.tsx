import React, {useEffect, useRef, useState} from 'react';
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {classes, content, errorMsg, headers, PageRoutes} from "../../utils/constants";
import {AddThreadForm} from "../AddThreadForm/AddThreadForm";
import {useMutation, useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import Loader from "../Loader/Loader";

import {ChipsButton} from "./FilterChips/ChipsStyle";

const Forum: React.FC<{}> = () => {
    const [isFavourite, setFavourite] = useState<any>({});
    const [filteredData, setFilteredData] = useState<ForumThreadSummaryResponseBody[]>([]);
    const [filters, setFilters] = useState(["",'',''])
    const [chipsActive, setChipsActive] = useState([false,false,false]);
    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const navigate = useNavigate();
    const [showAddThreadForm, setShowAddThreadForm] = useState(false);

    const { data: threadsList, isLoading: threadsLoading } = useQuery(
        'forum',
        () => getApis().forumApi.getAllThreads().then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );

    const  {data: me} = useQuery(
        ['users', 'me'],
        () => getApis().userApi.getMe().then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );

    const toggleFavouriteMutation = useMutation((idx: number) => getApis().forumApi.toggleThreadFollowing(idx), {
        onError: (error) => {
            errorMsg()
        }
    });

    useEffect(() => {
        if(threadsList) {
            let newIsFavourite: any = {};
            threadsList.forEach(elem => newIsFavourite[elem.id] = elem.isFollowed)
            setFavourite(newIsFavourite);
            setFilteredData(threadsList);
        }
    }, [threadsList]);

    useEffect(() => {
        console.log(isFavourite);
    }, [isFavourite])


    const filterSearchBar = (e: { target: { value: string; }; }) => {
        const keyword = e.target.value;
        filters[0] = keyword;
        setFilters(filters);
        filterData();
    };

    const filterChip = (id: number) => {
        if(filters[id] === ''){
            filters[id] = '1';
        }
        else{
            filters[id] = '';
        }
        chipsActive[id] = !chipsActive[id];
        setChipsActive(chipsActive);
        setFilters(filters);
        filterData();
    };

    const filterData = () => {
        let result = threadsList!;
        if(filters[1]!==''){
            result = result.filter((elem: ForumThreadSummaryResponseBody) => isFavourite[elem.id]);
        }
        if(filters[2]!==''){
            result = result.filter((elem: ForumThreadSummaryResponseBody) => elem.creatorName===me!.username);
        }
        if(filters[0]!==''){
            const keyword: string = filters[0];
            result = result.filter((thread) => {
                let titleFilter = thread.title.toLowerCase().includes(keyword.toLowerCase())
                let tagFilter = thread.tag.toLowerCase().includes(keyword.toLowerCase())
                return (titleFilter || tagFilter);
            });
        }
        setFilteredData(result);
    };

    const FilterChips: React.FC<{text: string, id: number}> = ({text, id}) => {
        const filterThreads = () => {
            filterChip(id);
        }

        return (
            <ChipsButton onClick={filterThreads} className={chipsActive[id] ? 'active': ''}>
                {text}
            </ChipsButton>
        )
    }


    async function toggleFavourite(idx: number) {
        setFavourite((previous: any) => {
            let newIsFavourite: any = {};
            newIsFavourite[idx] = !previous[idx]
            return {
                ...previous,
                ...newIsFavourite,
        }})
        await toggleFavouriteMutation.mutateAsync(idx);
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

    function getThread(thread: ForumThreadSummaryResponseBody){
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
                                                onClick={() => toggleFavourite(thread.id)}
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

    if (threadsLoading){
        return <Loader/>;
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
                    {filteredData!.map((thread,idx) => getThread(thread))}
                </Row>
            </ForumContainer>
            <AddThreadForm show={showAddThreadForm} setShowThreadForm={setShowAddThreadForm}/>
        </>
    )
};

export default Forum;
