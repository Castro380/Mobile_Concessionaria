import { createStackNavigator } from '@react-navigation/stack'
import FormRevisoes from './FormRevisao'
import ListaRevisoes from './ListaRevisao'


const Stack = createStackNavigator()

export default function StackRevisao() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCarros'
        >

            <Stack.Screen name='ListaRevisao' component={ListaRevisoes} />
            <Stack.Screen name='FormRevisao' component={FormRevisoes} />


        </Stack.Navigator>

    )
}