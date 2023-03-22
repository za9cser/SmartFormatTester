import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
const Layout = ({ children }) => {
    return (
        <MDBContainer className="py-2">
            <h1>SmartFormat Tester</h1>
            {children}
        </MDBContainer>
    );
};

export default Layout;
