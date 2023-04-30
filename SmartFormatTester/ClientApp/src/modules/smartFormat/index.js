import React from "react";
import { Form, Formik, FieldArray } from "formik";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import MDBFormikTextArea from "../../components/MDBFormikTextArea";
import axios from "axios";
import Editor from "react-simple-code-editor";

const initialValues = {
    smartFormats: [
        {
            expression: "",
            result: "",
        },
    ],
    model: "",
};

const URL = "smartFormat";

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
                        Model
                        <Editor
                            value={formik.values.model}
                            onValueChange={async (code) => {
                                formik.setFieldValue("model", code);
                                const { isOk, data } = await smartFormat(
                                    code,
                                    formik.values.smartFormats.map((value) => value.expression)
                                );
                                isOk && data && formik.setFieldValue("smartFormats", data.smartFormats);
                            }}
                            highlight={(code) => highlight(code, languages.json)}
                            padding={10}
                            rows={6}
                            className="border rounded mb-3 "
                            style={{
                                fontSize: 14,
                                minHeight: 100,
                            }}
                        />
                        <FieldArray name="smartFormats">
                            {({ push, remove }) => (
                                <>
                                    {formik.values.smartFormats.map((value, index) => (
                                        <MDBContainer className="border-top border-bottom py-1" key={index}>
                                            <MDBRow className="align-items-center my-3">
                                                <MDBCol
                                                    xs={"auto"}
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
                                                    <MDBFormikTextArea
                                                        label={`SmartFormat ${index + 1} expression`}
                                                        name={`smartFormats[${index}].expression`}
                                                        type="text"
                                                        className="w-100"
                                                        size="lg"
                                                        rows={1}
                                                        onChange={async (e) => {
                                                            const value = e.target.value;
                                                            formik.setFieldValue(e.target.name, value);
                                                            if (!value) return;

                                                            const { isOk, data } = await smartFormat(
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
                                                    xs={"auto"}
                                                    className="px-0"
                                                    title={`Copy SmartFormat ${index + 1} result`}
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
                                                    <MDBFormikTextArea
                                                        label={`SmartFormat ${index + 1} result`}
                                                        name={`smartFormats[${index}].result`}
                                                        type="text"
                                                        className="w-100"
                                                        size="lg"
                                                        rows={1}
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            {value.result && (
                                                <MDBRow>
                                                    <h6>Smart Format {index + 1} result web representation</h6>
                                                    <div dangerouslySetInnerHTML={{ __html: value.result }} />
                                                </MDBRow>
                                            )}
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
                                            size="lg"
                                            type="button"
                                            className="fw-bold"
                                        >
                                            Add SmartFormat Expression
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
