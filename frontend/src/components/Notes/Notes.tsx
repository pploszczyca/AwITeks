import React from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Plant} from "../../utils/Plant";


type NotesFormProps = {
    showNoteForm: boolean
    showNoteFormSetter: any
    plant: Plant
};

export const Notes: React.FC<NotesFormProps> = ({showNoteForm, showNoteFormSetter, plant}) => {
    return(
        <Modal show={showNoteForm} onHide={() => showNoteFormSetter(false)} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Twoje notatki dla rośliny: {plant.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        Notatka:
                    </Row>
                    <Row style={{border: "solid 1px black", padding: 15}}>
                        {plant.note}
                    </Row>
                    <Row className="mt-4 d-flex justify-content-center">
                        <Col sm={12} className="d-flex justify-content-center">
                            <Button onClick={() => showNoteFormSetter(false)}>
                                Powrót
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
