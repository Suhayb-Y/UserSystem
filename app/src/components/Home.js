import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormNav = styled.div`
  width: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 0 0;
  height: 30px;
`;

const FormNavHeading = styled.p`
  cursor: pointer;
  font-family: Inter-Bold;
  font-size: 18px;
  color: ${(props) => (props.mode === true ? "black" : "#772F92")};
  margin: 0;
`;

const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: calc(100% - 70px);
  margin: 30px 0;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: calc(100% - 70px);
  margin: 30px 0;
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 25px 0;
`;

const FormInputLabel = styled.label`
  font-family: Inter-Regular;
  color: black;
  font-size: 15px;
  margin: 0 0 10px 0;
`;

const FormTextInput = styled.input`
  width: 100%;
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
  width: fit-content;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #333333;
  border-radius: 100px;
  margin: 5px 0 0 0;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default function Home() {
    const [mode, setMode] = useState("register");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [repassword, setRepass] = useState("");

    const register = (e) => {
        
    };

    const login = (e) => {
        
    };

    return (
        <FormContainer>
            <FormNav>
                <FormNavHeading
                    onClick={() => setMode("register")}
                    mode={mode === "Register" ? true : false}
                >
                    Register
                </FormNavHeading>
                <FormNavHeading
                    onClick={() => setMode("login")}
                    mode={mode === "login" ? true : false}
                >
                    Login
                </FormNavHeading>
            </FormNav>
            {mode === "register" ? (
                <RegisterDiv>
                    <FormInputWrapper>
                        <FormInputLabel for="name">
                            Enter your name
                        </FormInputLabel>
                        <FormTextInput
                            placeholder="Name"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormInputLabel for="email">
                            Enter your email
                        </FormInputLabel>
                        <FormTextInput
                            placeholder="Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormInputLabel for="password">
                            Enter a password
                        </FormInputLabel>
                        <FormTextInput
                            placeholder="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPass(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormInputLabel for="repassword">
                            Confirm your password
                        </FormInputLabel>
                        <FormTextInput
                            placeholder="Confirm password"
                            type="password"
                            id="repassword"
                            onChange={(e) => setRepass(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                    <SubmitButton onClick={register}>Register</SubmitButton>
                </RegisterDiv>
            ) : (
                <LoginDiv>
                    <FormInputWrapper>
                        <FormInputLabel for="email">Enter your email</FormInputLabel>
                        <FormTextInput
                        placeholder="Email"
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormInputLabel for="password">
                            Enter your password
                        </FormInputLabel>
                        <FormTextInput
                            placeholder="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPass(e.target.value)}
                        ></FormTextInput>
                    </FormInputWrapper>
                <SubmitButton onClick={login}>Login</SubmitButton>
                </LoginDiv>
            )}
        </FormContainer>
    );
}