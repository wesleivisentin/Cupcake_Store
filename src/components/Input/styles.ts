import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export type TypeProps = 'primary' | 'secondary'

type Props = {
    type: TypeProps;
}

export const Content = styled(TextInput).attrs<Props>(({ theme, type }: any) => ({
    placeholderTextColor: type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50
}))<Props>`
    width: 100%;
    height: 56px;
    background-color: transparent;
    border-radius: 12px;
    padding: 7px 0;
    padding-left: 20px;
    margin-bottom: 16px;

    ${({ theme, type }: any) => css`
        font-family: ${theme.FONTS.TEXT};
        border: 1px solid ${theme.COLORS.SHAPE};
        color: ${type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE}
    `}

`;