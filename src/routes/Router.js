import { createStackNavigator } from '@react-navigation/stack'
import StackAcessorios from '../screens/Acessorio/StackAcessorio'
import StackCarro from '../screens/Carro/StackCarro'
import StackLeiloes from '../screens/Leilao/StackLeilao'
import Principal from '../screens/Principal'
import StackRevisao from '../screens/Revisao/StackRevisao'
import StackUsuario from '../screens/Usuario/StackUsuario'

const Stack = createStackNavigator()

export default function StackConcessionaria() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >

            <Stack.Screen name='Home' component={Principal} />
            <Stack.Screen name='Cadastro' component={StackUsuario} />
            <Stack.Screen name='Carros' component={StackCarro} />
            <Stack.Screen name='Acessorios' component={StackAcessorios} />
            <Stack.Screen name='Revisao' component={StackRevisao} />
            <Stack.Screen name='Leiloes' component={StackLeiloes} />


        </Stack.Navigator>

    )
}