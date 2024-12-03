import React from "react";
import { Button, ButtonClear, Container, Input, InputArea } from "./styles";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";


type Props = TextInputProps & {
    onSearch: () => void;
    onClear: () => void;
}

export function Search({ onSearch, onClear, ...rest }: Props){

    const { COLORS } = useTheme();

    return (
        <Container>
            <InputArea>
                <Input placeholder="Pesquisar..." {...rest} />

                <ButtonClear onPress={onClear}>
                    <Feather name="x" size={16} color={COLORS.PRIMARY_900}/>
                </ButtonClear>
            </InputArea>

            <Button onPress={onSearch}>
            <Feather name="search" size={16} color={COLORS.SUCCESS_50}/>
            </Button>
            
        </Container>
    )
}