import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";
import Auth from "../services/AuthService";

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormNavHeading = styled.p`
  font-family: Inter-Bold;
  font-size: 36px;
  margin: 0;
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  margin: 30px 0;
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 25px 0;
`;

const SubmitGroup = styled.div`
  display: flex;
  width: 100%;
`;

const FormInputLabel = styled.label`
  font-family: Inter-Regular;
  color: black;
  font-size: 15px;
  margin: 0 0 10px 0;
`;

const FormTextInput = styled.input`
  height: 30px;
  border-radius: 100px;
  background: #C2C6CA;
  font-family: Inter-Regular;
  color: white;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 0 20px 0 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  display: inline-block;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #333333;
  border-radius: 100px;
  margin: 5px 5px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default function UserDash() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    let admin = null;

    useEffect(() => {
        //Check if admin
        //Then load all data
        //Also load the user info
        if (Auth.user.admin) {
            axios.get('/api/users/').then(res => {
                console.log(res.data);
                admin = <h1>Yes</h1>
            }, err => {
                console.log(err.response.data);
            });
        }
    });

    const modifyUser = (e) => {
        
    };

    const deleteUser = (e) => {
        
    };

    return (
        <FormContainer>
            <FormNavHeading>
                {Auth.user.admin ? 'Admin' : 'Customer'} Dashboard
            </FormNavHeading>
            <UserDiv>
                <FormInputWrapper>
                    <FormInputLabel htmlFor="name">
                        Name:
                    </FormInputLabel>
                    <FormTextInput
                        placeholder={name}
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    ></FormTextInput>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormInputLabel htmlFor="email">
                        Email:
                    </FormInputLabel>
                    <FormTextInput
                        placeholder={email}
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormTextInput>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormInputLabel htmlFor="password">
                        Password:
                    </FormInputLabel>
                    <FormTextInput
                        placeholder={password}
                        type="password"
                        id="password"
                        onChange={(e) => setPass(e.target.value)}
                    ></FormTextInput>
                </FormInputWrapper>
                <SubmitGroup>
                    <SubmitButton onClick={modifyUser}>Apply Changes</SubmitButton>
                    <SubmitButton onClick={deleteUser}>Delete Account</SubmitButton>
                </SubmitGroup>
            </UserDiv>
            {admin}
        </FormContainer>
    );
}