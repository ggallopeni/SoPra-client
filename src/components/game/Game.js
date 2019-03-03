import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import {Id, Name, UserName} from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import UserProfile from "../../views/UserProfile";
import { Route } from "react-router-dom";
import "/Users/getoargallopeni/Desktop/SoPra-client/src/views/UserProfileStylesheet.css";



const TitleContainer = styled.div`
  margin: 6px 0;
  width: 350px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px hidden #ffffff26;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }
  seeProfile(seeID){
    fetch(`${getDomain()}/users/${seeID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(response => response.json())
        .then(user4Profile => {

          console.log(user4Profile);
        })
  }

  logout() {
    /*fetch(`${getDomain()}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        logout: "OFFLINE",
      })
    })
        .then()*/

    localStorage.removeItem("token");
    this.props.history.push("/login");
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              <TitleContainer><Name>Name</Name> <UserName>Username</UserName>
                <Id>ID</Id>
              </TitleContainer>
              {this.state.users.map(user => {
                return (


                    <PlayerContainer key={user.id}>
                      <Player className="username" user={user}/>
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>

          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
