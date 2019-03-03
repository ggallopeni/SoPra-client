import React from "react";
import styled from "styled-components";
import "./UserProfileStylesheet.css"





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
        cDate: null
    }
}



    componentDidMount() {
        /**First idea was to send a GET request to the given API for a user.
         The problem was that I didn't know how to transfer the ID of the selected user from Game.js to UserProfile.js
         I ended up transfering the user as an object over the URI... **/
        this.setState({
            username: this.props.location.state.username,
            ID: this.props.location.state.id,
            pw: this.props.location.state.password,
            status: this.props.location.state.status,
            cDate: this.props.location.state.date
        })
        /*fetch(`${getDomain()}/users/${this.props.location.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(user4Profile => {
                this.setState({
                    username: user4Profile.username,
                    ID: user4Profile.id,
                    pw: user4Profile.password
                });
                console.log(user4Profile);
                console.log("THis should be the UN:"+user4Profile.username);
                console.log("THis should be the UN:"+this.state.username)
            })*/
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
                </table>
            </Container>
        );
    };
}
export default UserProfile;