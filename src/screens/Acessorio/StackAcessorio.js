import { createStackNavigator } from '@react-navigation/stack'
import FormAcessorios from './FormAcessorio'
import ListaAcessorios from './ListaAcessorio'

const Stack = createStackNavigator()

export default function StackAcessorios() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAcessorio'
        >

            <Stack.Screen name='ListaAcessorio' component={ListaAcessorios} />
            <Stack.Screen name='FormAcessorio' component={FormAcessorios} />


        </Stack.Navigator>

    )
}