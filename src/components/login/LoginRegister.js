import React from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";





class LoginRegister extends React.Component {

    render(){
    return(
        <div>
            <Login/>
            <Register/>
        </div>
    )
}

}

export default withRouter(LoginRegister);

