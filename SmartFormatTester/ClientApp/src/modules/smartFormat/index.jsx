import React from "react";
import { Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import MDBFormikInput from "../../components/MDBFormikInput";
import MDBFormikTextArea from "../../components/MDBFormikTextArea";
const initialValues = {
    smartFormats: [
        {
            expression: "",
            result: "",
        },
    ],
    model: "",
};

const SmartFormat = () => {
    return (
        <Formik initialValues={initialValues}>
            {(formik) => (
                <Form>
                    <MDBContainer>
                        <MDBFormikTextArea label={`Model`} name={`model`} size="lg" rows={4} className="mb-3" />

                        <FieldArray name="smartFormats">
                            {({ push, remove }) => (
                                <>
                                    {formik.values.smartFormats.map((value, index) => (
                                        <MDBContainer className="border-top border-bottom py-1" key={index}>
                                            <MDBRow className="align-items-center my-3">
                                                <MDBCol
                                                    md={"auto"}
                                                    className="px-0"
                                                    title={`Copy SmartFormat ${index + 1} expression`}
                                                >
                                                    <MDBBtn
                                                        color="light"
                                                        className="px-3"
                                                        size="lg"
                                                        type="button"
                                                        onClick={() => navigator.clipboard.writeText(value.expression)}
                                                    >
                                                        <FontAwesomeIcon icon={faCopy} color="text-primary" size="lg" />
                                                    </MDBBtn>
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBFormikInput
                                                        label={`Smart Format ${index + 1} expression`}
                                                        name={`smartFormats[${index}].expression`}
                                                        type="text"
                                                        className="w-100"
                                                        size="lg"
                                                    />
                                                </MDBCol>
                                                <MDBCol md={"auto"}>
                                                    <MDBBtn
                                                        color="primary"
                                                        onClick={() => remove(index)}
                                                        className="px-3"
                                                        size="lg"
                                                        type="button"
                                                    >
                                                        <FontAwesomeIcon icon={faPlay} size="lg" />
                                                    </MDBBtn>
                                                </MDBCol>

                                                <MDBCol md={"auto"} className="pe-0">
                                                    <MDBBtn
                                                        color="danger"
                                                        onClick={() => remove(index)}
                                                        className="px-3"
                                                        size="lg"
                                                        type="button"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                                    </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="align-items-center mb-3">
                                                <MDBCol
                                                    md={"auto"}
                                                    className="px-0"
                                                    title={`Copy Smart Format ${index + 1} result`}
                                                >
                                                    <MDBBtn
                                                        color="light"
                                                        className="px-3"
                                                        size="lg"
                                                        type="button"
                                                        onClick={() => navigator.clipboard.writeText(value.result)}
                                                    >
                                                        <FontAwesomeIcon icon={faCopy} color="text-primary" size="lg" />
                                                    </MDBBtn>
                                                </MDBCol>
                                                <MDBCol className="pe-0">
                                                    <MDBFormikInput
                                                        label={`Smart Format ${index + 1} result`}
                                                        name={`smartFormats[${index}].result`}
                                                        type="text"
                                                        className="w-100"
                                                        size="lg"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    ))}
                                    <MDBRow>
                                        <MDBBtn
                                            color="link"
                                            onClick={() =>
                                                push({
                                                    expression: "",
                                                    result: "",
                                                })
                                            }
                                            type="button"
                                        >
                                            Add Smart Format Expression
                                        </MDBBtn>
                                    </MDBRow>
                                </>
                            )}
                        </FieldArray>
                    </MDBContainer>
                </Form>
            )}
        </Formik>
    );
};

export default SmartFormat;
