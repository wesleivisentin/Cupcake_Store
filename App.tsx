import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'
import { ThemeProvider } from 'styled-components/native'
import theme from '@src/theme';
import { SignIn } from '@src/screens/SignIn';
import { AuthProvider } from '@src/hooks/auth';
import { Product } from '@src/screens/Product';
import { Home } from '@src/screens/Home';
import { Routes } from '@src/routes';
import { Order } from '@src/screens/Order';
import { Orders } from '@src/screens/Orders';



export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })
  if (!fontsLoaded) {

    return <AppLoading />;
  }

  return (

    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor='transparent' />
      <AuthProvider>
        {/* <SignIn /> */}
        {/* <Product /> */}
        <Routes/>
        {/* <Order/> */}
        {/* <Orders/> */}
      </AuthProvider>
    </ThemeProvider>

  );


}
