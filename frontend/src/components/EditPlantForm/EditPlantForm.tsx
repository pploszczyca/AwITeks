import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AddPlantRequestBody, Plant } from '../../api';
import { getApis } from '../../api/initializeApis';
import { PlantForm } from '../PlantForm/PlantForm';
import Moment from "moment";


type EditPlantFormProps = {
    show: boolean;
    plant: Plant;
    setShowPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
};


function getLastActivityDate(plant: Plant, type: string) {
    const dates = plant.plantActivities.filter(a => a.activityType === type);

    return Moment(dates.length > 0 ? new Date(dates.at(-1)!.date) : new Date()).format("yyyy-MM-DD");
}

export const EditPlantForm: React.FC<EditPlantFormProps> = ({ show, setShowPlantForm, plant }) => {
    const queryClient = useQueryClient();
    const addPlantMutation = useMutation(
        (newPlantValues: AddPlantRequestBody) => getApis().plantsApi.updatePlant(plant.id, newPlantValues),
        {
            onSuccess: (plant) => {
                queryClient.setQueryData(['plants', plant.data?.id], plant.data);
            }
        });

    return (
        <PlantForm
            formTitle={`Edycja rośliny: ${plant.name}`}
            acceptBtnText="Zapisz"
            successToastText="Edycja pomyślna"
            setShowPlantForm={setShowPlantForm}
            show={show}
            onSubmit={(newPlantValues) => addPlantMutation.mutateAsync(newPlantValues)}
            initialValues={{
                insolation: plant.actualInsolation,
                lastFertilizationDate: getLastActivityDate(plant, "FERTILISATION"),
                lastWateringDate: getLastActivityDate(plant, "WATERING"),
                name: plant.name,
                note: plant.note ?? "",
                speciesId: plant.spiece.id
            }}
        />
    )
}
