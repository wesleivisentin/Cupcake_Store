import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";



export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: -30px;
    padding: 0 24px;

`

export const InputArea = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    border-radius: 16px;

    ${({ theme }:any) => css`
        background-color: ${theme.COLORS.TRANSPARENT_PURPLE};
        border: 1px solid ${theme.COLORS.PRIMARY_900}
    `}
`

export const Input = styled(TextInput)`
    flex: 1;
    height: 52px;
    padding-left: 12px;
    font-family: ${({theme}:any) => theme.FONTS.TEXT};
`
export const ButtonClear = styled.TouchableOpacity`
    margin-right: 7px;
`

export const Button = styled.TouchableOpacity`
    width: 52px;
    height: 52px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}:any) => theme.COLORS.PRIMARY_900};
    border-radius: 18px;
    margin-left: 7px;
`