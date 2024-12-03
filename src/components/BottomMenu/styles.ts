import styled, { css } from "styled-components/native";

type TitleProps = {
    color: string;
}

type NotificationProps = {
    noNotifications: boolean;
}


export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 80px;
`

export const Title = styled.Text<TitleProps>`
    font-size: 18px;

    ${({ theme, color }: any) => css`
        font-family: ${theme.FONTS.TITLE};
        color: ${color}
    `}
`

export const Notification = styled.View<NotificationProps>`
    height: 20px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    margin-left: 8px;

    ${({noNotifications, theme }:any) => !noNotifications && css`
        background-color: ${theme.COLORS.PRIMARY_900};
    `}

    ${({noNotifications, theme }:any) => noNotifications && css`
        background-color: transparent;
        border: 1px solid ${theme.COLORS.TRANSPARENT_PURPLE}
    `}
`
export const Quantity = styled.Text<NotificationProps>`
    font-size: 12px;

    ${({noNotifications, theme }:any) =>  css`
        font-family: ${theme.FONTS.TEXT};
        color: ${noNotifications ?  theme.COLORS.SECONDARY_500 : theme.COLORS.TITLE2}
    `}
`

