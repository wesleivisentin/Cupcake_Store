import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    isLogging: boolean
    user: User | null;
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@cupcake:users'

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [isLogging, setIsLogging] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    async function signIn(email: string, password: string){
        if(!email || !password){
            return Alert.alert('login', 'Informe o e-mail e a senha')
        }

        setIsLogging(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        .then(account => {
            firestore()
            .collection('users')
            .doc(account.user.uid)
            .get()
            .then( async (profile) => {
                const { name, isAdmin } = profile.data() as User

                if(profile.exists){
                    const userData = {
                        id: account.user.uid,
                        name,
                        isAdmin
                    }
                    // console.log(userData);
                    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
                    setUser(userData)
                }
            })
            .catch(() => Alert.alert('login', 'Não foi possivel buscar os dados de perfil do usuário.'))
            
        })
        .catch(error => {
            const { code } = error;
            
            if(code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential'){
                return Alert.alert('Login', 'E-mail e/ou senha inválida')
            } else {
                return Alert.alert('login', 'Não foi possível realisar o login')
            }
        })
        .finally(() => setIsLogging(false))

    }


    async function loadUserStorageData(){
        setIsLogging(true)

        const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

        if(storedUser) {
            const userData = JSON.parse(storedUser) as User;
            console.log(userData);
            
            setUser(userData)
        }

        setIsLogging(false)
    }

    async function signOut(){
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null)
    }

    async function forgotPassword(email: string) {
        if(!email) {
            return Alert.alert('Redefinr senha', 'Informe o e-mail')
        }

        auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para redefinir sua senha'))
        .catch(() => Alert.alert('Redefinir senha', 'Não foi possível enviar um e-mail para redefinir sua senha'))
    }






    useEffect(() => {
        loadUserStorageData()
    },[])

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            forgotPassword,
            isLogging,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context;
}


export { AuthProvider, useAuth }