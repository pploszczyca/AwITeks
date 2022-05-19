import { useNavigate } from "react-router-dom";
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FavoriteIcon, StyledCard } from './PlantSummaryCardStyles';
import { PlantSummary } from "../../api/models/plant-summary";
import {PageRoutes} from "../../utils/constants";

interface PlantSummaryProps {
    plantSummary: PlantSummary;
    toggleFavourite: (plant: PlantSummary) => void;
};

const PlantSummaryCard: React.FC<PlantSummaryProps> = ({ plantSummary: plant, toggleFavourite }) => {
    const navigate = useNavigate();

    return (
        <Card as={StyledCard} className='text-center'>
            <Card.Img variant="top" src={plant.photo} />
            <Card.Body>
                <Card.Title>{plant.name}</Card.Title>
                <Card.Text>
                    {plant.speciesName}
                </Card.Text>

                <Card.Text>
                    <FavoriteIcon>
                        <FontAwesomeIcon
                            fontSize={24}
                            icon={plant.isFavourite ? faHeartSolid : faHeartRegular}
                            color={plant.isFavourite ? "#d41212" : ""}
                            onClick={() => toggleFavourite(plant)}
                        />
                    </FavoriteIcon>
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`${PageRoutes.MY_PLANTS}/${plant.id}`)}>Szczegóły</Button>
            </Card.Body>
        </Card>
    )
}

export default PlantSummaryCard;
