import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";



export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}:any) => theme.COLORS.BACKGROUND};;

`;

export const Header = styled(LinearGradient).attrs(({ theme }: any) => ({
    colors: theme.COLORS.GRADIENT_2
}))`

    padding: ${getStatusBarHeight() + 33}px 0 33px;
`
export const Title = styled.Text`
    font-size: 24px;
    text-align: center;

    ${({theme}: any) => css`
        font-family: ${theme.FONTS.TITLE};
        color: ${theme.COLORS.TITLE2};
    `}
`
