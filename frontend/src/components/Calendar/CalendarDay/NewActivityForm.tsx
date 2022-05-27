import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Field, Form, Formik} from "formik";
import {useQuery} from "react-query";
import styled from "styled-components";
import {ActivityActivityTypeEnum} from "../../../api";
import {getApis} from "../../../api/initializeApis";
import {AddNewActivityArgs} from "./CalendarDay";
import {ACTIVITY_DESCRIPTION, NewActivityOption} from "./utils";
import React from "react";
import {errorMsg} from "../../../utils/constants";


type NewActivityFormProps = {
    date: Date;
    // invalidOptions: Set<NewActivityOption>,
    invalidOptions: NewActivityOption[],
    onAddNewActivity: (activity: AddNewActivityArgs) => Promise<any>;
};

const NO_PLANT_SELECTED = -1;


const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & * {
        outline: none;
        border: 0;
        padding: 0;
        background: transparent;
        margin-left: -2px;
    }

    & select:hover {
        cursor: pointer;
    }

    & button:hover {
        cursor: pointer;
    }

    & button:hover {
        opacity: 0.8;
    };

    & button {
        align-self: center;
        justify-self: center;

    };

    & button:disabled:hover {
        opacity: 1;
        cursor: default;
    };
`;


export const NewActivityForm: React.FC<NewActivityFormProps> = ({date, invalidOptions, onAddNewActivity}) => {
    const {data: plants } = useQuery(
        ['plants'],
        () => getApis().plantsApi.getAllPlants().then(resp => resp.data),
        {onError: (error) => errorMsg()});

    const initialValues = {
        plantId: plants && plants[0] ? plants[0].id : NO_PLANT_SELECTED,
        activityType: 'WATERING' as ActivityActivityTypeEnum
    };

    const isInvalid = (values: typeof initialValues) => (invalidOptions.find(({plantId, activityType}) => (
                            plantId === +values.plantId && activityType === values.activityType)) !== undefined);
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, {setValues, setSubmitting}) => {
                if (values.plantId === NO_PLANT_SELECTED)
                    return;
                setSubmitting(true);
                
                try {
                    await onAddNewActivity({
                        date,
                        activityType: values.activityType,
                        plantId: +values.plantId});
                    setValues(initialValues);
                } finally {
                    setSubmitting(false);
                }
                
            }}
        >
            {({ isSubmitting, values }) => (
                <Form>
                    <RowWrapper>
                        <div>
                            <Field as='select' name='activityType'>
                                {
                                    Object.entries(ACTIVITY_DESCRIPTION)
                                        .map(([activityType, description]) => (
                                            <option key={activityType} value={activityType}>
                                                {description}
                                            </option>
                                        ))
                                }
                            </Field>

                            <Field as='select' name='plantId' style={{marginLeft: 16}}>
                                {
                                    plants?.map(plant => (
                                        <option key={plant.id} value={plant.id}>
                                            {plant.name}
                                        </option>
                                    ))
                                }
                            </Field>
                        </div>
                        <button type="submit" disabled={isSubmitting || isInvalid(values)}
                        >
                            <FontAwesomeIcon
                                icon={faCirclePlus}
                                style={{color: isSubmitting || isInvalid(values) ? "#7f837f" : "#33a11f"}}
                            />
                        </button>
                    </RowWrapper>
                </Form>
            )}
        </Formik>
    )
}
