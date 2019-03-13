import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";


const FormContainer1 = styled.div`
  margin-top: 2em;
  display: flex;
  float:right;
  flex-direction: column;
  width: 50%;
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
export const Titel = styled.label`
  color: white;
  font-size:22px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
export const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null
    };
  }
  login() {

    fetch(`${getDomain()}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })

      .then(response => {

        if(response.ok){
            response.json().then(returnedUser => {
                // store the token into the local storage
                localStorage.setItem("token", returnedUser.token);

                // user login successfully worked --> navigate to the route /game in the GameRouter
                this.props.history.push(`/game`);
            });
        }
        else{
          alert("User not known.")
        }

      })

      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }
 handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }


  componentDidMount() {}

  render() {
    return (
          <BaseContainer>
        <FormContainer1>
          <Titel>Log-In</Titel>
          <Form>
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField type="password"
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />

            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login!
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer1>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
