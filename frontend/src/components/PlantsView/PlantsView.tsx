import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Col, Form, Row} from "react-bootstrap";
import {
    AddPlantButton,
    DropdownItem,
    ListContainer,
    PlantTypesContainer,
    SearchBox,
    SearchBoxContainer,
    SettingsBox,
    SettingsWrapper
} from './PlantsViewStyles';
import PlantSummaryCard from "../PlantSummaryCard/PlantSummaryCard";
import Dropdown from "../utils/Dropdown";
import {ContentContainer} from "../App/AppStyle";
import {getApis} from "../../api/initializeApis";
import {useMutation, useQuery, useQueryClient} from "react-query";
import Loader from "../Loader/Loader";
import {PlantSummary} from "../../api";
import {AddPlantForm} from "../AddPlantForm/AddPlantForm";
import {sortBy, SortByTypes} from "./utils";
import {errorMsg, GENERIC_ERROR_MESSAGE} from "../../utils/constants";


const PlantsView: React.FC<{}> = () => {
    const [isAddPlantFormVisible, setAddPlantFormVisible] = useState(false);
    const queryClient = useQueryClient();
    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const checkedInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const [sortByType, setSortByType] = useState(SortByTypes.SORT_BY_NAME);
    const [filteredList, setFilteredList] = useState<PlantSummary[]>([]);
    const [filteredSpecies, setFilteredSpecies] = useState<string[]>([]);

    const { data: speciesList, isLoading: speciesLoading } = useQuery(
        'species',
        () => getApis().speciesApi.getAllSpecies().then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );

    const { data: plantSummaryList, isLoading: plantsLoading } = useQuery(
        ['plants-summary'],
        () => getApis().plantsApi.getAllPlantsSummary().then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );

    const toggleFavourite = useMutation((plantSummary: PlantSummary) => {
        plantSummary.isFavourite = !plantSummary.isFavourite;
        return getApis().plantsApi.togglePlantFavourite(plantSummary.id);
    }, {
        onSuccess: (_, plantSummary) => {
            queryClient.setQueryData(['plants-summary', plantSummary.id], plantSummary);
        },
        onError: error => {
            errorMsg()
        }
    });

    useEffect(() => {
        if(plantSummaryList){
            setFilteredList(plantSummaryList);
        }
    }, [plantSummaryList]);


    // Filter by species
    useEffect(() => {
        if (filteredSpecies.length > 0){
            setFilteredList(plantSummaryList!.filter(plant => filteredSpecies.includes(plant.speciesName)));
        } else{
            setFilteredList(plantSummaryList!);
        }
    }, [filteredSpecies]);

    function filterBySpecies(event: any){
        if(!filteredSpecies.includes(event.target.name)){
            setFilteredSpecies([...filteredSpecies, event.target.name]);
        }
        else {
            setFilteredSpecies(filteredSpecies.filter(species => species !== event.target.name));
        }
    }
    // end of Filter of species

    function filterByFavourites(){
        const filtered = checkedInput.current?.checked ? plantSummaryList!.filter(plant => plant.isFavourite): plantSummaryList!;
        setFilteredList(filtered);
        return filtered;
    }

    function filterByName(){
        const inputValue = searchInputRef.current?.value.toLowerCase();
        const filtered = filterByFavourites().filter(plant => plant.name.toLowerCase().includes(inputValue!));
        setFilteredList(filtered);
        return filtered;
    }

    if (speciesLoading || plantsLoading) {
        return <Loader />;
    }

    return (
        <ContentContainer className="mt-5">
            <SettingsWrapper>
                <SettingsBox>
                    <Row>
                        <Col lg={7} sm={12} className="mt-3">
                            <SearchBoxContainer onClick={() => searchInputRef.current?.focus()}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                                <SearchBox onInput={() => filterByName()} ref={searchInputRef} type="text" placeholder="wyszukaj roślinę..." />
                            </SearchBoxContainer>
                        </Col>
                        <Col lg={5} className="mt-3">
                            <AddPlantButton onClick={() => setAddPlantFormVisible(true)}>Dodaj roślinę</AddPlantButton>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={7} sm={12} className="mt-3">
                            <Row as={PlantTypesContainer} onChange={filterBySpecies}>
                                {speciesList ? (
                                    speciesList!.map(species => (
                                        <Col xl={4} lg={6} key={species.id}>
                                            < Form.Check
                                                inline
                                                label={species.name}
                                                name={species.name}
                                                type="checkbox"
                                                id={`plantTypeCheckbox_${species.id}`}
                                            />
                                        </Col>
                                    ))
                                ) : (
                                    <Col xs={12}><strong>{GENERIC_ERROR_MESSAGE}</strong></Col>
                                )}
                            </Row>
                        </Col>

                        <Col lg={5} className="mt-3">
                            <Row className="px-3" onChange={() => filterByFavourites()}>
                                < Form.Check
                                    ref={checkedInput}
                                    label="Tylko ulubione"
                                    name="onlyFavourites"
                                    type="checkbox"
                                    id="onlyFavourites"
                                />
                            </Row>
                            <Row>
                                <div style={{ position: "relative" }}>
                                    <Dropdown
                                        label="Sortuj według"
                                        style={{
                                            background: "#008F8C",
                                            color: "#FFF",
                                        }}
                                    >
                                        <DropdownItem onClick={() => setSortByType(SortByTypes.NO_SORT)}>Brak sortowania</DropdownItem>
                                        <DropdownItem onClick={() => setSortByType(SortByTypes.SORT_BY_NAME)}>Nazwy</DropdownItem>
                                        <DropdownItem onClick={() => setSortByType(SortByTypes.SORT_BY_SPECIES_NAME)}>Nazwy Gatunku</DropdownItem>
                                        <DropdownItem onClick={() => setSortByType(SortByTypes.SORT_BY_FAVOURITE)}>Ulubionych</DropdownItem>
                                    </Dropdown>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </SettingsBox>
            </SettingsWrapper>


            <Row as={ListContainer}>
                {sortBy(filteredList, sortByType)?.map(plant => (
                    <Col
                        key={plant.id}
                        xxl={3} xl={4} md={6} sm={12}
                        style={{ marginBottom: 80 }}
                        className="d-flex justify-content-center"
                    >
                        <PlantSummaryCard plantSummary={plant} toggleFavourite={toggleFavourite.mutate} />
                    </Col>
                ))}
            </Row>

            <AddPlantForm
                show={isAddPlantFormVisible}
                setShowPlantForm={setAddPlantFormVisible}
            />
        </ContentContainer>
    )
}

export default PlantsView;
