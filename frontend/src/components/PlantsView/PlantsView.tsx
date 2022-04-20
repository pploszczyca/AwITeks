import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Form } from "react-bootstrap";
import { SearchBoxContainer, SearchBox, AddPlantButton, PlantTypesContainer, DropdownItem, ListContainer, SettingsWrapper, SettingsBox } from './PlantsViewStyles';
import { mockPlantSummaries, mockPlantTypes } from "../../utils/mockData";
import { PlantSummary } from "../../utils/Plant";
import PlantSummaryCard from "../../PlantSummaryCard/PlantSummaryCard";
import Dropdown from "../utils/Dropdown";
import {PlantForm} from "../AddPlantForm/PlantForm";
import {ContentContainer} from "../App/AppStyle";


const PlantsView: React.FC<{}> = () => {
    const [plantTypes,] = useState(() => {
        // fetch from API
        return mockPlantTypes;
    })

    let [show, setShow] = useState(false);

    const [plantSummaryList, updatePlants] = useState(() => {
        return mockPlantSummaries;
    });

    function toggleFavourite(plant: PlantSummary) {
        updatePlants(plantSummaryList => {
            return [...plantSummaryList.filter(plantSummary => plantSummary.id !== plant.id), {
                ...plant,
                isFavourite: !plant.isFavourite
            }].sort((p1, p2) => p1.id - p2.id); // for testing only
        });
    }

    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    function updateShowState(newValue: boolean){
        setShow(newValue);
    }

    return (
        <ContentContainer className="mt-5">
            <SettingsWrapper>
                <SettingsBox>
                    <Row>
                        <Col lg={7} sm={12} className="mt-3">
                            <SearchBoxContainer onClick={() => searchInputRef.current?.focus()}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20}/>
                                <SearchBox ref={searchInputRef} type="text" placeholder="wyszukaj roślinę..."/>
                            </SearchBoxContainer>
                        </Col>
                        <Col lg={5} className="mt-3">
                            <AddPlantButton onClick={() => updateShowState(true)}>Dodaj roślinę</AddPlantButton>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={7} sm={12} className="mt-3">
                            <Row as={PlantTypesContainer}>
                                {plantTypes.map((plantType, id) => (
                                    <Col xl={4} lg={6} key={id}>
                                        < Form.Check
                                            inline
                                            label={plantType}
                                            name="plantTypes"
                                            type="checkbox"
                                            id={`plantTypeCheckbox_${id}`}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        <Col lg={5} className="mt-3">
                            <Row className="px-3">
                                < Form.Check
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
                                        <DropdownItem>Data dodania</DropdownItem>
                                        <DropdownItem>Czas posiadania</DropdownItem>
                                        <DropdownItem>Opcja Trzecia</DropdownItem>
                                        <DropdownItem>Opcja Czwarta</DropdownItem>
                                    </Dropdown>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </SettingsBox>
            </SettingsWrapper>


            <Row as={ListContainer}>
                {plantSummaryList.map(plant => (
                    <Col key={plant.id} xxl={3} xl={4} md={6} sm={12} style={{ marginBottom: 80 }} className="d-flex justify-content-center">
                        <PlantSummaryCard plantSummary={plant} toggleFavourite={toggleFavourite} />
                    </Col>
                ))}
            </Row>

            <PlantForm show={show} updateState={updateShowState}/>
        </ContentContainer>
    )
}

export default PlantsView;
