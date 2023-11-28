import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import imagem from '../../../assets/concessionaria.webp';
import LottieView from 'lottie-react-native';

export default function Principal({ navigation }) {
  const [exibirAnimacao, setExibirAnimacao] = useState(false);
  const [proximoDestino, setProximoDestino] = useState(null);

  const handleBotaoPressionado = (rota) => {
    setExibirAnimacao(true);
    setTimeout(() => {
      setProximoDestino(rota);
      setExibirAnimacao(false); // Para ocultar a animação quando a transição ocorrer
    }, 5000); // 7 segundos
  };

  useEffect(() => {
    if (proximoDestino) {
      navigation.navigate(proximoDestino);
    }
  }, [proximoDestino, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={imagem} resizeMode="cover" style={styles.imagemDeFundo}>
        {exibirAnimacao ? (
          <View style={styles.animacaoContainer}>
            <LottieView
              source={require('./animacao-carro.json')}
              autoPlay={true}
              style={styles.animacao}
            />
          </View>
        ) : (
          <View style={styles.areaBotoes}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handleBotaoPressionado('Cadastro')}>
              <Text style={styles.textoBotao}>Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handleBotaoPressionado('Carros')}>
              <Text style={styles.textoBotao}>Carros</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handleBotaoPressionado('Acessorios')}>
              <Text style={styles.textoBotao}>Acessórios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handleBotaoPressionado('Revisao')}>
              <Text style={styles.textoBotao}>Revisão</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handleBotaoPressionado('Leiloes')}>
              <Text style={styles.textoBotao}>Leilões</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagemDeFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#000',
    marginTop: 20,
    width: 210,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  areaBotoes: {
    marginTop: 400,
    gap: 10,
  },
  animacaoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animacao: {
    width: 600,
    height: 600,
  },
});
