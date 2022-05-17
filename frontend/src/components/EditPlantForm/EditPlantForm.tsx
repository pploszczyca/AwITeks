import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AddPlantRequestBody, Plant } from '../../api';
import { getApis } from '../../api/initializeApis';
import { PlantForm } from '../PlantForm/PlantForm';


type EditPlantFormProps = {
    show: boolean;
    plant: Plant;
    setShowPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditPlantForm: React.FC<EditPlantFormProps> = ({ show, setShowPlantForm, plant }) => {
    const queryClient = useQueryClient();
    const addPlantMutation = useMutation(
        (newPlantValues: AddPlantRequestBody) => getApis().plantsApi.updatePlant(plant.id, newPlantValues).then(resp => resp.data),
        {
            onSuccess: (plant) => {
                queryClient.invalidateQueries(['plants']);
                queryClient.invalidateQueries(['plants-summary', plant.id]);
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
                lastFertilizationDate: plant.lastFertilizationDate,
                lastWateringDate: plant.lastWateringDate,
                name: plant.name,
                note: plant.note ?? "",
                speciesId: plant.species.id
            }}
        />
    )
}
