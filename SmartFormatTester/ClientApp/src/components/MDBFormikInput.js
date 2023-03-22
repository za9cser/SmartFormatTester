import { useField } from "formik";
import { MDBInput } from "mdb-react-ui-kit";
import React from "react";

function MDBFormikInput({ ...props }) {
    const [field] = useField(props);
    return <MDBInput {...field} {...props} autoComplete="off" />;
}

export default MDBFormikInput;
