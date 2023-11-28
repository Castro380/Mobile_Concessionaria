import { createStackNavigator } from '@react-navigation/stack'
import FormLeiloes from './FormLeilao'
import ListaLeiloes from './ListaLeilao'

const Stack = createStackNavigator()

export default function StackLeiloes() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaLeilao'
        >

            <Stack.Screen name='ListaLeilao' component={ListaLeiloes} />
            <Stack.Screen name='FormLeilao' component={FormLeiloes} />

        </Stack.Navigator>

    )
}