import React, { useCallback, useState } from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsNumber, NewProductButton, Title } from "./styles";

import { MaterialIcons } from "@expo/vector-icons"
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Search } from "@src/components/Search";
import { ProductCard, ProductProps } from "@src/components/ProductCard";
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "@src/hooks/auth";

const happyEmoji = require("@assets/logo-0-5.png");

export function Home() {

    const [cupcakes, setCupcakes] = useState<ProductProps[]>([])
    const [search, setSearch] = useState('')

    const { user, signOut } = useAuth()

    const { COLORS } = useTheme()
    const navigation = useNavigation()

    function fetchCupcakes(value: string) {
        const formattedValue = value.toLowerCase().trim();

        firestore()
            .collection('cupcakes')
            .orderBy('name_insensitive')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                }) as ProductProps[]

                setCupcakes(data);

            })
            .catch(() => Alert.alert('Consulta', 'Não foi possivel realizar a consulta.'));
    }


    function handleSearch() {
        fetchCupcakes(search)
    }

    function handleSearchClear() {
        setSearch('')
        fetchCupcakes(search)
    }

    function handleOpen(id: string) {
        const route = user?.isAdmin ? 'product' : 'order'
        navigation.navigate(route, {id})
    }
    

    function handleAdd() {
        navigation.navigate('product', {})
    }


    useFocusEffect(
        useCallback(() => {
        fetchCupcakes('')
    }, []))

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, {user?.isAdmin ? 'Admin' : 'Cliente'}</GreetingText>
                </Greeting>

                <TouchableOpacity onPress={signOut}>
                    <MaterialIcons name="logout" color={COLORS.TITLE2} size={24} />
                </TouchableOpacity>

            </Header>
            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch}
                onClear={handleSearchClear}
            />

            <MenuHeader>
                <Title>Vitrine</Title>
                <MenuItemsNumber>{cupcakes.length} cupcakes</MenuItemsNumber>
            </MenuHeader>

            <FlatList
                data={cupcakes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        data={item}
                        onPress={() => handleOpen(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
            />

                {

                    user?.isAdmin && 
                    <NewProductButton
                    title="Cadastrar Cupcake"
                    type="secondary"
                    onPress={handleAdd}
                />
                }

        </Container>

    )
}