import react from 'react'
import { Container, Description, Image, Name, StatusContainer, StatusLabel, StatusTypesProps } from './styles'
import { TouchableOpacityProps } from 'react-native'

export type OrderProps = {
    id: string;
    cupcake: string;
    image: string;
    status: StatusTypesProps;
    table_number: string;
    quantity: string;
  }

type Props = TouchableOpacityProps & {
    index: number;
    data: OrderProps;
}

export function OrderCard({index, data, ...rest}: Props){
    return (
        <Container index={index} {...rest}>
            <Image source={{uri: data.image}}/>
            <Name>Maracujá</Name>
            <Description>
                Pedido {data.table_number} • Qnt: {data.quantity}
            </Description>
            <StatusContainer status={data.status}>
                <StatusLabel status={data.status}>{data.status}</StatusLabel>
            </StatusContainer>
        </Container>
    )
}