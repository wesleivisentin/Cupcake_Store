import React, { useEffect, useState } from 'react'
import { Container, ContentScroll, Form, FormRow, Header, InputGroup, Label, Photo, Price, Sizes, Title } from './styles'
import { Alert, Platform } from 'react-native'
import { ButtonBack } from '@src/components/ButtonBack'
import { RadioButton } from '@src/components/RadioButton'
import { CUPCAKE_TYPES } from '@src/utils/cupcakeTypes'
import { Input } from '@src/components/Input'
import { Button } from '@src/components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { OrderNavigationProps, ProductNavigationProps } from '@src/@types/navigation'
import { ProductProps } from '@src/components/ProductCard'
import { useAuth } from '@src/hooks/auth'


type CupcakeResponse = ProductProps & {
    prices_sizes: {
        [key: string]: number
    }
}

export function Order() {
    const [size, setSize] = useState('')
    const [cupcake, setCupcake] = useState<CupcakeResponse>({} as CupcakeResponse)
    const [quantity, setQuantity] = useState(0)
    const [tableNumber, setTableNumber] = useState('')
    const [sendingOrder, setSendingOrder] = useState(false)

    const navigation = useNavigation();
    const route = useRoute()
    const { user } = useAuth()
    const { id } = route.params as OrderNavigationProps

    const amount = size ? cupcake.prices_sizes[size] * quantity : '0,00'

    function handleGoBack(){
        navigation.goBack()
    }

     function handleOrder(){
        if(!size){
            return Alert.alert('Pedido', 'Selecione o tamanho da pizza.')
        }
        if(!tableNumber){
            return Alert.alert('Pedido', 'Informe o número de WhatsApp')
        }
        if(!quantity){
            return Alert.alert('Pedido', 'Informe a quantidade de Cupcakes')
        }

        setSendingOrder(true)

        firestore()
        .collection('orders')
        .add({
            quantity,
            amount,
            cupcake: cupcake.name,
            size,
            table_number: tableNumber,
            status: 'Preparando',
            waiter_id: user?.id,
            image: cupcake.photo_url
        })
        .then(() => navigation.navigate('userTabRoutes' as any))
    
        .catch(() => {
            Alert.alert('Pedido', 'Não foi possével realizar o pedido')
            setSendingOrder(false)
        })
    }

    useEffect(() => {
        if(id){
            firestore()
            .collection('cupcakes')
            .doc(id)
            .get()
            .then(response => setCupcake(response.data() as CupcakeResponse))
            .catch(() => Alert.alert('Pedido', 'Não foi possível carregar o produto'))
        }
    }, [])

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ContentScroll>
                <Header>
                    <ButtonBack
                        onPress={handleGoBack}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo source={{ uri: cupcake.photo_url }} />

                <Form>
                    <Title>{cupcake.name}</Title>
                    <Label>Selecione um tamanho</Label>
                    <Sizes>
                        {
                            CUPCAKE_TYPES.map(item => (
                                <RadioButton
                                    key={item.id}
                                    title={item.name}
                                    onPress={() => setSize(item.id)}
                                    selected={size === item.id}
                                />
                            ))

                        }
                    </Sizes>

                    <FormRow>
                        <InputGroup>
                            <Label>Número de WhataApp</Label>
                            <Input 
                            keyboardType='numeric' 
                            style={{borderColor: '#e69bf9'}}
                            onChangeText={setTableNumber}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input 
                            keyboardType='numeric' 
                            style={{borderColor: '#e69bf9'}}
                            onChangeText={(value) => setQuantity(Number(value))}
                            />
                        </InputGroup>
                    </FormRow>

                    <Price>Valor de R$ {amount}</Price>

                    <Button
                        title='Confirmar Pedido'
                        onPress={handleOrder}
                        isLoading={sendingOrder}
                    />
                </Form>
            </ContentScroll>
        </Container>
    )
}