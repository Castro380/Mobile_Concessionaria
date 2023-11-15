import { createStackNavigator } from '@react-navigation/stack'
import StackCarro from '../screens/Carro/StackCarro'
import Principal from '../screens/Principal'

const Stack = createStackNavigator()

export default function StackConcessionaria() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >

            <Stack.Screen name='Home' component={Principal} />
            <Stack.Screen name='Carros' component={StackCarro} />


        </Stack.Navigator>

    )
}