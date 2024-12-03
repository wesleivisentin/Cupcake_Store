import React, { useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components/native'
import { Platform } from 'react-native'
import { Orders } from '@src/screens/Orders'
import { Home } from '@src/screens/Home'
import { BottomMenu } from '@src/components/BottomMenu'
import firestore from '@react-native-firebase/firestore'

const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabRoutes(){
    const [notifications, setNotifications] = useState('0')
    const { COLORS } = useTheme()

    useEffect(() => {
        const subscribe = firestore()
        .collection('orders')
        .where('status', '==', 'Saiu para entrega')
        .onSnapshot(querySnapshot => {
            setNotifications(String(querySnapshot.docs.length))
        })

        return () => subscribe()
    },[])
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.SECONDARY_900,
                tabBarInactiveTintColor: COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) =>(
                        <BottomMenu title="Vitrine" color={color}/>
                    )
                }}
            />
            <Screen
                name="orders"
                component={Orders}
                options={{
                    tabBarIcon: ({ color }) =>(
                        <BottomMenu title="Pedido" color={color} notifications={notifications}/>
                    )
                }}
            />
        </Navigator>

    )

}