import React from "react";
import styled from "styled-components";
import "./../../views/UserProfileStylesheet.css"
import { Titel } from "./../login/Register";
import {Button} from "../../views/design/Button";
import {ButtonContainer, Label} from "../login/Login";
import {getDomain} from "../../helpers/getDomain";


const EditContainer = styled.div`
    margin: auto;
    width: 580px;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    border: 3px solid #ffffff26;
    background: rgba(255, 255, 255, 0.2);
    flex-direction: column;
`;

const EditFormContainer = styled.div`
  margin-top: 1em;
  display: flex;
  width: 140%;
  float:right;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const EditLabel = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const EditInputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  width: 60%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

class Edit extends React.Component{
    constructor(){
        super();
        this.state = {
            id : null,
            name:null,
            username: null,
            password: null
        }
    }
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    changeInfos(uID){
        fetch(`${getDomain()}/users/${uID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                id: this.state.id,
                name: this.state.name
            })
        })
            .then(response => {
                if(response.ok){
                    console.log("PUT request response ok");
                this.props.history.push("/game") //commented for testing
        }})
    }

    componentDidMount() {
        this.setState({
            id : this.props.location.state.ID,
            username: null,
            password: null,
            name: null
        })}

    render() {
        return(
            <EditContainer>
                <EditFormContainer>
                    <Titel> Edit your information here: </Titel>
                    <h4 className="subtitle" >Only write into the forms you want to have changed.</h4><br/>



                    <EditLabel>Name</EditLabel>
                    <EditInputField
                        placeholder="Enter here your new name.."
                        onChange={e => {
                            this.handleInputChange("name", e.target.value);
                        }}
                    />
                    <EditLabel>Username</EditLabel>
                        <EditInputField
                            placeholder="Enter here your new username.."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <EditInputField type="password"
                            placeholder="Enter here your new pw.."
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />

                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username && !this.state.password}
                                width="100%"
                                onClick={() => {
                                /*if(!this.state.username){this.setState({username: this.props.location.state.username})}
                                if(!this.state.password){this.setState({password: this.props.location.state.pw})}*/

                                /*console.log("This is the id: "+ this.state.id);
                                console.log("This is the new state username: "+ this.state.username);
                                console.log("This is the new state password: "+ this.state.password);
                                console.log("This is the new state name: "+ this.state.name);*/
                                this.changeInfos(this.state.id)
                                }}
                            >
                                Change!
                            </Button>
                        </ButtonContainer>
                </EditFormContainer>
            </EditContainer>
        )
    }
}

export default Edit;
