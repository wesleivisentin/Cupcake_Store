import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    justify-content: Center;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid ${({ theme }: any) => theme.COLORS.PRIMARY_100}
`;