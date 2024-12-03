import React from "react";
import { TextInputProps } from 'react-native'
import { Content, TypeProps } from "./styles"


type Props = TextInputProps & {
    type?: TypeProps;
}


export function Input({type = 'primary', ...rest}: Props){
    return (
        <Content type={type} {...rest}>

        </Content>
    )
}