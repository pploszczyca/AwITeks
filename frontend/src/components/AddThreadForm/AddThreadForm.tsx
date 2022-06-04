import React from "react";
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "react-query";
import {AddThreadRequestBody, ForumThread} from "../../api";
import {getApis} from "../../api/initializeApis";
import {errorMsg} from "../../utils/constants";


type AddThreadFormProps = {
    show: boolean;
    setShowThreadForm: React.Dispatch<React.SetStateAction<boolean>>;
};


export const AddThreadForm: React.FC<AddThreadFormProps> = ({ show, setShowThreadForm }) => {
    const queryClient = useQueryClient();
    const addThread = useMutation((thread: AddThreadRequestBody) => getApis().forumApi.addThread(thread), {
        onSuccess: (thread) => {
            queryClient.setQueryData(['forum', thread.data?.id], thread.data);
            queryClient.setQueryData(['forum'], (oldThreads: ForumThread[] | undefined) =>
                oldThreads ? [...oldThreads, thread.data] : [thread.data]);
            queryClient.invalidateQueries(['forum']);
        },
        onError: (error) => {
            errorMsg()
        }
    });

    return (
        <Modal show={show} onHide={() => setShowThreadForm(false)} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Załóż nowy temat.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{name: '', content: '', isFavourite: false}}
                    validate={values => {
                        const errors: any = {};
                        if (!values.name) errors.name = 'Wymagane';
                        if (!values.content) errors.content = 'Wymagane';
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await addThread.mutateAsync(values);
                            toast.success("Nowy temat dodany pomyślnie!");
                            setShowThreadForm(false);
                        } catch (err) {
                            // TODO display this
                            console.log("failed to submit");
                            console.log(err);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row>
                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Tytuł tematu:</label><br />
                                        <Field className="form-control" type="text" name="name" />
                                        <ErrorMessage name="name" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Twoja wiadomość:</label>
                                        <Field className="form-control" as="textarea" name="content" />
                                        <ErrorMessage name="content" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={12}>
                                        <label>
                                            Czy chcesz od razu zaobserwować ten temat?
                                            <Field type="checkbox" name="isFavourite" className="mx-3" />
                                        </label>
                                    </Col>
                                </Row>

                                <Row className="mt-4 d-flex justify-content-center">
                                    <Col sm={12} className="d-flex justify-content-center mb-2">
                                        <Button variant="success" type="submit" disabled={isSubmitting} style={{ minWidth: 80 }}>
                                            {isSubmitting ?
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                />
                                                :
                                                <span>Załóż temat</span>
                                            }
                                        </Button>
                                    </Col>

                                    <Col sm={12} className="d-flex justify-content-center">
                                        <Button variant="danger" onClick={() => setShowThreadForm(false)} >
                                            Anuluj
                                        </Button>
                                    </Col>
                                </Row>

                            </Container>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
