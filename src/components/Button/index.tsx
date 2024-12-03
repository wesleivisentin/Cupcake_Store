import React from "react";
import { Container, TypeProps, Title, Load } from "./styles"
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
    type?: TypeProps;
    isLoading?: boolean;
}

export function Button({title, type = 'primary', isLoading = false, ...rest }: Props){
    return(
        <Container type={type} enable={!isLoading} {...rest}>
            { isLoading ? <Load /> : <Title>{title}</Title> }
            
        </Container>
    )
}