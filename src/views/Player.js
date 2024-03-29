import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import "./UserProfileStylesheet.css";

const Container = styled.div`
  margin: 6px 0;
  width: 350px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

export const UserName = styled.div`
  font-weight: lighter;
  margin-left: auto;
`;

export const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

export const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
        <Name>{user.name}</Name>
        <UserName>
        <Link className="link" to={{
            pathname: "/profile/",
            state: user,
        }}>{user.username}</Link>
        </UserName>
      <Id>Id: {user.id}</Id>
    </Container>
  );
};

export default Player;