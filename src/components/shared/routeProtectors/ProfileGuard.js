import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const ProfileGuard = props => {
    if (!localStorage.getItem("token")) {
        alert("You are not authorized!");
        return <Redirect to={"/login"} />;
    }

};
