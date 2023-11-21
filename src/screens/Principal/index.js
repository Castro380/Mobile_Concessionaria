import { StyleSheet, Text, View, ImageBackground, TouchableOpacity , Button } from 'react-native'
import React from 'react'
import imagem from '../../../assets/concessionaria.webp'

export default function Principal({navigation}) {
  return (
    <View style={styles.container}>
    <ImageBackground source={imagem} resizeMode="cover" style={styles.image}>
        <View style={styles.botoes}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.text}>Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carros')}>
            <Text style={styles.text}>Carros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Acessorios')}>
            <Text style={styles.text}>Acessorios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Revisao')}>
            <Text style={styles.text}>Revisao</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Leiloes')}>
            <Text style={styles.text}>Leiloes</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#000',
      marginTop: 20,

      width: 210,
      height: 50,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
    botoes: {
        marginTop: 400,
        gap: 10
    }, 

    
  });