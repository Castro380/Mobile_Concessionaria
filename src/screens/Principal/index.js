import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native'
import React from 'react'
import imagem from '../../../assets/concessionaria.webp'

export default function Principal({navigation}) {
  return (
    <View style={styles.container}>
    <ImageBackground source={imagem} resizeMode="cover" style={styles.image}>
        <View style={styles.botoes}>
            <Button style={styles.text} title='Cadastro de carros' onPress={() => navigation.navigate('Carros')} />
            <Button style={styles.text} title='Cadastro de carros' />
            <Button style={styles.text} title='Cadastro de carros' />
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
    text: {
      color: 'white',
      fontSize: 42,
      lineHeight: 84,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
      borderRadius: 15,
      width: '50%'
    },
    botoes: {
        marginTop: 500,
        gap: 10
    }
  });