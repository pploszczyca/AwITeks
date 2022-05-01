import React from 'react';
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Plant } from "../../api";


type NotesFormProps = {
    showNoteForm: boolean
    hide: () => void,
    plant: Plant
};

export const Notes: React.FC<NotesFormProps> = ({ showNoteForm, hide, plant }) => {
    return (
        <Modal show={showNoteForm} onHide={hide} animation={false} size="xl">
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
                    <Row style={{ border: "solid 1px black", padding: 15 }}>
                        {plant.note}
                    </Row>
                    <Row className="mt-4 d-flex justify-content-center">
                        <Col sm={12} className="d-flex justify-content-center">
                            <Button onClick={hide}>
                                Powrót
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
