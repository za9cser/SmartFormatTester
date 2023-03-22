import { useField } from "formik";
import { MDBTextArea } from "mdb-react-ui-kit";
import React from "react";

function MDBFormikTextArea({ ...props }) {
    const [field] = useField(props);
    return <MDBTextArea {...field} {...props} />;
}

export default MDBFormikTextArea;
