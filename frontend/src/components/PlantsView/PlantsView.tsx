import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Form } from "react-bootstrap";
import { SearchBoxContainer, SearchBox, AddPlantButton, PlantTypesContainer, DropdownItem, ListContainer } from './PlantsViewStyles';
import { mockPlantSummaries, mockPlantTypes } from "../../utils/mockData";
import { PlantSummary } from "../../utils/Plant";
import PlantSummaryCard from "../../PlantSummaryCard/PlantSummaryCard";
import Dropdown from "../utils/Dropdown";



const PlantsView: React.FC<{}> = () => {
    const [plantTypes,] = useState(() => {
        // fetch from API
        return mockPlantTypes;
    })

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

    return (
        <div style={{ marginLeft: 30, marginTop: 30 }}>
            <Row mt={4}>
                <Col md={{ span: 3 }}>
                    <SearchBoxContainer onClick={() => searchInputRef.current?.focus()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <SearchBox ref={searchInputRef} type="text" placeholder="wyszukaj roślinę..."></SearchBox>
                    </SearchBoxContainer>
                </Col>
                <Col md={{ span: 2 }}>
                    <AddPlantButton>Dodaj roślinę</AddPlantButton>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <Col md={{ span: 3 }}>
                    <Row as={PlantTypesContainer}>
                        {plantTypes.map((plantType, id) => (
                            <Col md={6} key={id}>
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

                <Col md={{ span: 2 }} className="mt-auto">
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
                </Col>

                <Col md={{ span: 2 }} className="mt-auto">
                    < Form.Check
                        label="Tylko ulubione"
                        name="onlyFavourites"
                        type="checkbox"
                        id="onlyFavourites"
                    />
                </Col>
            </Row>


            <Row as={ListContainer}>
                {plantSummaryList.map(plant => (
                    <Col key={plant.id} xl={3} lg={6} md={12} style={{ marginBottom: 80 }}>
                        <PlantSummaryCard plantSummary={plant} toggleFavourite={toggleFavourite} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default PlantsView;
