import styled, { css } from "styled-components/native";

type ContainerProps = {
    index: number;
}

export type StatusTypesProps = 'Preparando' | 'Saiu para entrega' | 'Entregue';

type StatusProps = {
    status: StatusTypesProps
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 50%;
    align-items: center;
    padding: 24px;

    ${({ theme, index }:any) => css`
        border-right-width: ${index % 2 > 0 ? 0 : 1}px;
        border-right-color: ${theme.COLORS.SHAPE2};
    `}
`

export const Image = styled.Image`
    width: 104px;
    height: 104px;
    border-radius: 52px;
`
export const Name = styled.Text`
    font-size: 20px;
    margin-top: 21px;

    ${({ theme }:any) => css`
        font-family: ${theme.FONTS.TITLE};
        color: ${theme.COLORS.SECONDARY_900}
    `}
`
export const Description = styled.Text`
    font-size: 14px;
    margin-top: 11px;

    ${({ theme }:any) => css`
        font-family: ${theme.FONTS.TEXT};
        color: ${theme.COLORS.SECONDARY_400}
    `}
`

export const StatusContainer = styled.View<StatusProps>`
    padding: 4px 16px;
    border-radius: 12px;
    margin-top: 16px;
    align-items: center;
    justify-content: center;

    ${({ status, theme }: any) => status === 'Preparando' && css`
        background-color: ${theme.COLORS.ALERT_50};
        border: 1px solid ${theme.COLORS.ALERT_900};
    `}

    ${({ status, theme }: any) => status === 'Saiu para entrega' && css`
        background-color: ${theme.COLORS.SUCCESS_900};
        
    `}

    ${({ status, theme }: any) => status === 'Entregue' && css`
        background-color: ${theme.COLORS.SECONDARY_900};
        
    `}
`;


export const StatusLabel = styled.Text<StatusProps> `
    font-size: 12px;
    line-height: 20px;

    ${({ status, theme }: any) => css`
    font-family: ${theme.FONTS.TEXT};
        color: ${status === 'Preparando' ? theme.COLORS.ALERT_900 : theme.COLORS.TITLE2}
    `}
`