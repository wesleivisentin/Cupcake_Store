import { Button } from "@src/components/Button";
import { LinearGradient } from "expo-linear-gradient";

import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }: any) => theme.COLORS.BACKGROUND};

`;

export const Header = styled(LinearGradient).attrs(({ theme }: any) => ({
    colors: theme.COLORS.GRADIENT_2
}))`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;
export const Greeting = styled.View`
    flex-direction: row;
    align-items: center;
`

export const GreetingEmoji = styled.Image`
    height: 32px;
    width: 32px;
    margin-right: 12px;
`

export const GreetingText = styled.Text`
    font-size: 20px;

    ${({ theme }: any) => css`
        font-family: ${theme.FONTS.TITLE};
        color: ${theme.COLORS.TITLE2}
    `}
`

export const MenuHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 25px 24px 0;
    padding-bottom: 22px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }: any) => theme.COLORS.PRIMARY_100};
`;

export const MenuItemsNumber = styled.Text`
    font-size: 14px;

    ${({ theme }: any) => css`
        font-family: ${theme.FONTS.TEXT};
        color: ${theme.COLORS.PRIMARY_900}
    `}
    `

export const Title = styled.Text`
    font-size: 20px;
    line-height: 20px;


    ${({ theme }: any) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.PRIMARY_900}
    `}
`

export const NewProductButton = styled(Button)`
    margin: 0 24px;
    margin-bottom: ${getBottomSpace() + 12}px;

`