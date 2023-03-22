import React from "react";
import { Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import MDBFormikInput from "../../components/MDBFormikInput";
import MDBFormikTextArea from "../../components/MDBFormikTextArea";
import axios from "axios";

const initialValues = {
    smartFormats: [
        {
            expression: "",
            result: "",
        },
    ],
    model: "",
};

const URL = "api/smartFormat";

const SmartFormat = () => {
    const smartFormat = async (model, expressions) => {
        if (!model || !expressions) return;
        let data = null;
        let error = null;
        const payload = {
            model,
            expressions,
        };
        try {
            data = (await axios.post(URL, payload)).data;
        } catch (err) {
            error = err;
        }

        return {
            data,
            error,
            isOk: !error && !data?.errorMessage,
        };
    };

    return (
        <Formik initialValues={initialValues}>
            {(formik) => (
                <Form>
                    <MDBContainer>
                        <MDBFormikTextArea
                            label={`Model`}
                            name={`model`}
                            size="lg"
                            rows={4}
                            className="mb-3"
                            onChange={async (e) => {
                                formik.setFieldValue(e.target.name, e.target.value);
                                const { isOk, data, error } = await smartFormat(
                                    formik.values.model,
                                    formik.values.smartFormats
                                );
                                isOk && data && formik.setFieldValue("smartFormats", data.smartFormats);
                            }}
                        />

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
                                                        onChange={async (e) => {
                                                            const value = e.target.value;
                                                            formik.setFieldValue(e.target.name, value);
                                                            if (!value) return;

                                                            const { isOk, data, error } = await smartFormat(
                                                                formik.values.model,
                                                                [value]
                                                            );
                                                            isOk &&
                                                                data &&
                                                                formik.setFieldValue(
                                                                    `smartFormats[${index}].result`,
                                                                    data.smartFormats[0].result
                                                                );
                                                        }}
                                                    />
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
