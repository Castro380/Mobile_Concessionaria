import { createStackNavigator } from '@react-navigation/stack'
import FormCarros from './FormCarro'
import ListaCarros from './ListaCarro'

const Stack = createStackNavigator()

export default function StackCarro() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCarros'
        >

            <Stack.Screen name='ListaCarros' component={ListaCarros} />
            <Stack.Screen name='FormCarros' component={FormCarros} />


        </Stack.Navigator>

    )
}