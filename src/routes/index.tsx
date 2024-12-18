import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { UserStackRoutes } from "./user.stack.routes";
import { UserTabRoutes } from "./user.tab.routes";
import { useAuth } from "@src/hooks/auth";
import { SignIn } from "@src/screens/SignIn";


export function Routes(){
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {/* <UserStackRoutes/> */}
            {user ? <UserStackRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}