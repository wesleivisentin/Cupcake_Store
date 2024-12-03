import React, { useEffect, useState } from 'react'
import { Container, Header, Title } from './styles'
import { OrderCard, OrderProps } from '@src/components/OrderCard'
import { Alert, FlatList } from 'react-native'
import { ItemSeparator } from '@src/components/ItemSeparator'
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '@src/hooks/auth'


export function Orders(){

    const [orders, setOrders ] = useState<OrderProps[]>([])
    const { user } = useAuth()

    function handleCupcakeDelivered(id: string) {
        Alert.alert('Pedido', 'Confirmar que os cupcakes foram entregues?',[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => {
                    firestore().collection('orders').doc(id).update({
                        status: 'Entregue'
                    })
                }
            }
        ])
    }

    useEffect(()=> {
        const subscribe = firestore()
        .collection('orders')
        .where('waiter_id', '==', user?.id )
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } 
            })as OrderProps[]
            setOrders(data)
        })

        return () => subscribe()
    },[])

    return (
        <Container>
            <Header>
                <Title>Pedidos feitos</Title>
            </Header>

            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({ item, index}) => (
                    <OrderCard 
                    index={index} 
                    data={item}
                    disabled={item.status === 'Entregue'}
                    onPress={() => handleCupcakeDelivered(item.id)}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal:24, paddingBottom: 125 }}
                ItemSeparatorComponent={ItemSeparator}
            />

            

           
        </Container>
    )
}