import { createStackNavigator } from '@react-navigation/stack'
import FormUsuario from './FormUsuario'
import ListaUsuarios from './ListaUsuario'

const Stack = createStackNavigator()

export default function StackUsuario() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCarros'
        >

            <Stack.Screen name='ListaUsuarios' component={ListaUsuarios} />
            <Stack.Screen name='FormUsuario' component={FormUsuario} />


        </Stack.Navigator>

    )
}