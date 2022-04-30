import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getApis } from '../../api/initializeApis';
import Loader from '../Loader/Loader';
import { PlantForm } from '../PlantForm/PlantForm';

type addPlantFormProps = {
    show: boolean;
    setShowPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
};


export const AddPlantForm: React.FC<addPlantFormProps> = ({ show, setShowPlantForm }) => {
    const queryClient = useQueryClient();
    const addPlantMutation = useMutation(getApis().plantsApi.addPlant, {
        onSuccess: (plant) => {
            // queryClient.setQueryData(['plants', plant.data?.id], plant.data);
            // queryClient.setQueryData(['plants'], (oldPlants: Plant[] | undefined) =>
            //     oldPlants ? [...oldPlants, plant.data] : [plant.data]);
            queryClient.invalidateQueries(['plants']);
        }
    });

    // TODO assert species is not empty
    const { data: species, isLoading } = useQuery(['species'], () => getApis().speciesApi.getAllSpecies().then(resp => resp.data));
    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <PlantForm
            formTitle="Dodaj nową roślinę"
            acceptBtnText="Dodaj roślinę"
            successToastText="Dodano roślinę"
            setShowPlantForm={setShowPlantForm}
            show={show}
            onSubmit={(newPlantValues) => addPlantMutation.mutateAsync(newPlantValues)}
            initialValues={{
                insolation: "LOW",
                lastFertilizationDate: "",
                lastWateringDate: "",
                name: "",
                note: "",
                speciesId: species![0]!.id // beautiful language
            }}
        />
    )
}
