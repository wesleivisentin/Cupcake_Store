import styled, { css } from "styled-components/native";

import { TouchableOpacity } from "react-native";

export type TypeProps = 'primary' | 'secondary'

type ContainerProps = {
    type: TypeProps
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    flex: 1;
    max-height: 56px;
    min-height: 56px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme, type }: any) => type === "primary" ?  theme.COLORS.PRIMARY_800 : theme.COLORS.PRIMARY_800};
`
export const Title = styled.Text`
    font-size: 14px;

    ${({ theme }: any) => css`
        color: ${theme.COLORS.TITLE2};
        font-family: ${theme.FONTS.TEXT};
    `}

`

export const Load = styled.ActivityIndicator.attrs(({ theme }: any) => ({
    color: theme.COLORS.TITLE2
}))``