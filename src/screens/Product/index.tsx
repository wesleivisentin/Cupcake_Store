import React, { useEffect, useState } from "react";
import { Container, Header, Title, DeleteLabel, Upload, PickImageButton, Form, InputGroup, Label, InputGroupHeader, MaxCharacters } from "./styles";
import { Alert, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { ButtonBack } from "@src/components/ButtonBack";
import { Photo } from "@src/components/Photo";
import * as ImagePicker from 'expo-image-picker'
import { InputPrice } from "@src/components/InputPrice";
import { Input } from "@src/components/Input";
import { Button } from "@src/components/Button";

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "@src/@types/navigation";
import { ProductProps } from "@src/components/ProductCard";

type CupcakeResponse = ProductProps & {
    photo_path: string;
    prices_sizes: {
        p: string;
        m: string;
        g: string;
    }
}



export function Product() {
    const [PhotoPath, setPhotoPath] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priceSizeP, setPriceSizeP] = useState('')
    const [priceSizeM, setPriceSizeM] = useState('')
    const [priceSizeG, setPriceSizeG] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    const route = useRoute()
    const {id} = route.params as ProductNavigationProps
    
    

    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }

        }
    }

    async function handleAdd(){
        if(!name.trim()){
            return Alert.alert('Cadastro', 'Informe o nome do cupcake')
        }
        if(!description.trim()){
            return Alert.alert('Cadastro', 'Informe a descrição do cupcake')
        }
        if(!image){
            return Alert.alert('Cadastro', 'Seleciona uma imagem para o cupcake')
        }
        if(!priceSizeP || !priceSizeM || !priceSizeG){
            return Alert.alert('Cadastro', 'Informe todos os preços dos tamanhos do cupcake')
        }

        setIsLoading(true)
        const fileName = new Date().getTime();
        const reference = storage().ref(`/cupcakes/${fileName}.png`)

        await reference.putFile(image)
        const photo_url = await reference.getDownloadURL()

        firestore()
        .collection('cupcakes')
        .add({
            name,
            name_insensitive: name.toLowerCase().trim(),
            description,
            prices_sizes: {
                p: priceSizeP,
                m: priceSizeM,
                g: priceSizeG
            },
            photo_url,
            photo_path: reference.fullPath
        })
        .then(() => {
            navigation.navigate('home')
            Alert.alert('Cadastro', 'Cupcake cadastrado com sucesso.')
        } ) 
        .catch(() => {
            setIsLoading(false)
            Alert.alert('Cadastro', 'Não foi possível cadastrar o cupcake')
        })

    }

    function handleGoBack(){
        navigation.goBack()
    }

    function handleDelete(){
        firestore()
        .collection('cupcakes')
        .doc(id)
        .delete()
        .then(() => {
            storage()
            .ref(PhotoPath)
            .delete()
            .then(() => navigation.navigate('home'))
        })
    }

    useEffect(() => {
        if (id) {
            firestore()
            .collection('cupcakes')
            .doc(id)
            .get()
            .then(response => {
                const product = response.data() as CupcakeResponse;

                setName(product.name)
                setImage(product.photo_url)
                setDescription(product.description)
                setPriceSizeP(product.prices_sizes.p)
                setPriceSizeM(product.prices_sizes.m)
                setPriceSizeG(product.prices_sizes.g)
                setPhotoPath(product.photo_path)
            })
        }
    },[id])

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <ButtonBack onPress={handleGoBack}/>
                    <Title>Cadastrar</Title>
                    {
                        id ?
                        <TouchableOpacity>
                        <DeleteLabel onPress={handleDelete}>Deletar</DeleteLabel>
                    </TouchableOpacity>
                    : <View style={{width:20}}/>
                    }
                </Header>

                <Upload>
                    <Photo uri={image} />
                    {
                        !id &&
                        <PickImageButton
                        title="Carregar"
                        type="secondary"
                        onPress={handlePickerImage}
                    />
                    }
                </Upload>

                <Form>

                    <InputGroup>
                        <Label>Nome</Label>
                        <Input onChangeText={setName} value={name}/>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
                        </InputGroupHeader>
                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription} 
                            value={description}
                        />
                    </InputGroup>


                    <InputGroup>
                        <Label>Tamanhos e preços</Label>

                        <InputPrice 
                        size="P" 
                        onChangeText={setPriceSizeP} 
                        value={priceSizeP}
                        />
                        <InputPrice 
                        size="M" 
                        onChangeText={setPriceSizeM} 
                        value={priceSizeM}
                        />
                        <InputPrice 
                        size="G" 
                        onChangeText={setPriceSizeG} 
                        value={priceSizeG}
                        />
                        
                    </InputGroup>

                    {
                        !id &&
                        <Button 
                    title="Cadastrar Cupcake" 
                    isLoading={isLoading}
                    onPress={handleAdd}
                    />
                    }
                </Form>
            </ScrollView>
        </Container>
    )
}