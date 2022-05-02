import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form } from "react-bootstrap";
import { SearchBoxContainer, SearchBox, AddPlantButton, PlantTypesContainer, DropdownItem, ListContainer, SettingsWrapper, SettingsBox } from './PlantsViewStyles';
import PlantSummaryCard from "../PlantSummaryCard/PlantSummaryCard";
import Dropdown from "../utils/Dropdown";
import { ContentContainer } from "../App/AppStyle";
import { getApis } from "../../api/initializeApis";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../Loader/Loader";
import { PlantSummary } from "../../api/models/plant-summary";
import { AddPlantForm } from "../AddPlantForm/AddPlantForm";



const PlantsView: React.FC<{}> = () => {
    const [isAddPlantFormVisible, setAddPlantFormVisible] = useState(false);
    const queryClient = useQueryClient();
    const searchInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const { data: speciesList, isLoading: speciesLoading } = useQuery('species', () => getApis().speciesApi
        .getAllSpecies().then(resp => resp.data));

    const { data: plantSummaryList, isLoading: plantsLoading } = useQuery(['plants-summary'], () => getApis().plantsApi
        .getAllPlantsSummary().then(resp => resp.data));

    const toggleFavourite = useMutation((plantSummary: PlantSummary) => {
        plantSummary.isFavourite = !plantSummary.isFavourite;
        return getApis().plantsApi.togglePlantFavourite(plantSummary.id);
    }, {
        onSuccess: (_, plantSummary) => {
            queryClient.setQueryData(['plants-summary', plantSummary.id], plantSummary);
        }
    });

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
                                <SearchBox ref={searchInputRef} type="text" placeholder="wyszukaj roślinę..." />
                            </SearchBoxContainer>
                        </Col>
                        <Col lg={5} className="mt-3">
                            <AddPlantButton onClick={() => setAddPlantFormVisible(true)}>Dodaj roślinę</AddPlantButton>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={7} sm={12} className="mt-3">
                            <Row as={PlantTypesContainer}>
                                {speciesList!.map(species => (
                                    <Col xl={4} lg={6} key={species.id}>
                                        < Form.Check
                                            inline
                                            label={species.name}
                                            name="plantTypes"
                                            type="checkbox"
                                            id={`plantTypeCheckbox_${species.id}`}
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
                {plantSummaryList!.map(plant => (
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
