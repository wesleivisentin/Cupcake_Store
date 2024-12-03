import React from "react";
import { Container, Content, Description, Details, Identification, Image, Line, Name } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons"

export type ProductProps = {
    id: string;
    photo_url: string;
    name: string;
    description: string;
}

type Props = TouchableOpacityProps & {
    data: ProductProps;
}


export function ProductCard({ data, ...rest }:Props){

    const { COLORS } = useTheme();

    return (
        <Container>
            <Content {...rest}>
                <Image source={{ uri: data.photo_url }}/>

                <Details>
                    <Identification>
                        <Name>{data.name}</Name>
                        <Feather name="chevron-right" size={18} color={COLORS.PRIMARY_900}/>
                    </Identification>

                    <Description>{data.description}</Description>
                </Details>
            </Content>

            <Line/>
        </Container>
    )

}