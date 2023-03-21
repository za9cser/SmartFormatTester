import React from "react";
import { Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBInputGroup, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
    smartFormatExpressions: [""],
    model: "",
};

const SmartFormat = () => {
    return (
        <Formik initialValues={initialValues}>
            {(formik) => (
                <Form>
                    <MDBContainer>
                        <div className="border-bottom">
                            <FieldArray name="smartFormatExpressions">
                                {({ push, remove }) => (
                                    <MDBContainer>
                                        {formik.values.smartFormatExpressions.map((expression, index) => (
                                            <MDBRow className="align-items-center mb-3">
                                                <MDBCol
                                                    md={"auto"}
                                                    className="px-0"
                                                    title={`Copy Smart Format expression ${index + 1}`}
                                                >
                                                    <MDBBtn color="light" className="px-2">
                                                        <FontAwesomeIcon icon={faCopy} color="text-primary" size="lg" />
                                                    </MDBBtn>
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBInput
                                                        label={`Smart Format expression ${index + 1}`}
                                                        name={`smartFormatExpressions[${index}]`}
                                                        type="text"
                                                        className="w-100"
                                                    />
                                                </MDBCol>
                                                <MDBCol md={"auto"}>
                                                    <MDBBtn
                                                        color="danger"
                                                        onClick={() => remove(index)}
                                                        className="px-3"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                        ))}
                                        <MDBRow start>
                                            <MDBBtn color="link" onClick={() => push("")}>
                                                Add Smart Format Expression
                                            </MDBBtn>
                                        </MDBRow>
                                    </MDBContainer>
                                )}
                            </FieldArray>
                        </div>
                    </MDBContainer>
                </Form>
            )}
        </Formik>
    );
};

export default SmartFormat;
