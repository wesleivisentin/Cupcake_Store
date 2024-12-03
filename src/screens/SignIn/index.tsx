import React, { useState } from "react";
import brandImg from "@src/assets/brand_x1.png"

import { Input } from "@src/components/Input";

import { Brand, Container, Content, ForgotPasswordButton, ForgotPasswordLabel, Title } from './styles'
import { Button } from "@src/components/Button";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@src/hooks/auth";

export function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signIn, isLogging, forgotPassword} = useAuth();

    function handleSignIn(){
        signIn(email, password)
    }

    function handleForgotPassword(){
        forgotPassword(email)
    }


    return (
 
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Content>

                    <Brand source={brandImg}/>

                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        type="secondary"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Senha"
                        type="secondary"
                        secureTextEntry
                        onChangeText={setPassword}

                    />

                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>

                    <Button
                        title="Entrar"
                        type="secondary"
                        onPress={handleSignIn}
                        isLoading={isLogging}
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    )
}