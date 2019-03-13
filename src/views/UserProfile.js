import React from "react";
import styled from "styled-components";
import "./UserProfileStylesheet.css"
import { Button } from "./design/Button";
import { Link } from 'react-router-dom';



const Container = styled.div`
    margin: auto;
    width: 450px;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    border: 3px solid #ffffff26;
    background: rgba(255, 255, 255, 0.2);
    flex-direction: column;
`;

const Descriptor = styled.div`
    font-weight: bold;
    font-size: 1.1em;
    color: ##131212;
    align: left;
`;

const Data = styled.div`
    font-size: 1em;
    color: ##131212;
    margin-left: 2.5em;
`;


class UserProfile extends React.Component {
    constructor(){
    super();
    this.state = {
        username: null,
        ID: null,
        pw: null,
        status: null,
        cDate: null,
        bd: null
    }
}



    componentDidMount() {

        this.setState({
            username: this.props.location.state.username,
            ID: this.props.location.state.id,
            pw: this.props.location.state.password,
            status: this.props.location.state.status,
            cDate: this.props.location.state.creationDate,
            bd: this.props.location.state.birthday
        });
        console.log(this.props.location.state.creationDate);
        console.log(this.state.cDate);
        console.log(this.props.location.state.username)
        /*console.log(this.props.location.state.token);
        console.log(localStorage.getItem("token"));*/
    }


    render() {

        return (

            <Container><h1>User Profile View <br/></h1>

                <table>
                    <tr>
                    <td>
                        <Descriptor>USER-ID:</Descriptor>
                    </td>
                    <td>
                        <Data>{this.state.ID}</Data>
                    </td>
                </tr>
                    <tr>
                        <td>
                            <Descriptor className="username">USERNAME:</Descriptor>
                        </td>
                        <td><Data>{this.state.username}</Data></td>
                    </tr>
                    <tr>
                        <td>
                            <Descriptor>STATUS:</Descriptor>
                        </td>
                        <td>
                            <Data>{this.state.status}</Data>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Descriptor>CREATION DATE:</Descriptor>
                        </td>
                        <td>
                            <Data>{this.state.cDate}</Data>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Descriptor>BIRTHDAY:</Descriptor>
                        </td>
                        <td>
                            <Data>{this.state.bd}</Data>
                        </td>
                    </tr>
                    <tr><Link to={{
                        pathname: "/edit",
                        state: this.state,
                    }}><Button
                    disabled={this.props.location.state.token !== localStorage.getItem("token")} //sorgt dafür, dass jeder nur sein eigenes Profil bearbeiten kann.
                    >
                        EDIT</Button></Link></tr>
                </table>
            </Container>
        );
    };
}
export default UserProfile;