import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";


const FormContainerReg = styled.div`
  margin-top: 2em;
  display: flex;
  width: 50%;
  float:right;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;
const Titel = styled.label`
  color: white;
  font-size:22px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Register extends React.Component {


    constructor(){
        super();
        this.state = {
            usernameRegister: null,
            nameRegister: null,
            passwordRegister: null
        };
    }

    login(){
        fetch(`${getDomain()}/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.usernameRegister,
                name: this.state.nameRegister,
                password: this.state.passwordRegister
            })
        })

            .then(returnedUser => {

                if(returnedUser.ok){
                    console.log(returnedUser.json());

                    const user = new User(returnedUser);
                    //localStorage.setItem("token", user.token);
                    this.props.history.push(`/login`);
                }
                else {
                    alert("username already taken!");
                }
            })


            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("################\nThe server cannot be reached. Did you start it?");
                } else {
                    alert(`################\nSomething went wrong during the login: ${err.message}`);
                }
            });
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {}

    render(){
        return(
            <BaseContainer>
            <FormContainerReg>
                <Titel>Register</Titel>
                <Form>
                    <Label>Username</Label>
                    <InputField
                        placeholder="Other Enter here.."

                        onChange={e => {
                            this.handleInputChange("usernameRegister", e.target.value);
                        }}
                    />
                    <Label>name</Label>
                    <InputField
                        placeholder="Other Enter here.."

                        onChange={e => {
                            this.handleInputChange("nameRegister", e.target.value);
                        }}
                    />
                    <Label>password</Label>
                    <InputField
                        placeholder="Enter here.."
                        onClick={e => {
                            e.target.placeholder="Choose your pw wisely";
                        }}
                        onChange={e => {
                            this.handleInputChange("passwordRegister", e.target.value);
                        }}
                    />
                    <ButtonContainer>
                        <Button
                            disabled={!this.state.usernameRegister || !this.state.nameRegister || !this.state.passwordRegister}
                            width="50%"
                            onClick={(e) => {
                                this.login();
                            }}
                        >
                            Sign-Up!
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainerReg>
                </BaseContainer>
        )
    }
}

export default withRouter(Register);