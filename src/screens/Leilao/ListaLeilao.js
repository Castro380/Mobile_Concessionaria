import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ListaLeiloes({ navigation, route }) {
  const [leiloes, setLeiloes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showModalExcluirLeilao, setShowModalExcluirLeilao] = useState(false);
  const [leilaoASerExcluido, setLeilaoASerExcluido] = useState(null);

  useEffect(() => {
    loadLeiloes();
    loadUsuarios();
  }, []);


  async function loadLeiloes() {
    const response = await AsyncStorage.getItem('leiloes');
    const leiloesStorage = response ? JSON.parse(response) : [];
    setLeiloes(leiloesStorage);
  }

  async function loadUsuarios() {
    const response = await AsyncStorage.getItem('usuarios')
    console.log("🚀 ~ file: ListaCarrosAsyncStorage.js:21 ~ loadCarros ~ response:", response)
    const usuariosAsync = response ? JSON.parse(response) : []
    setUsuarios(usuariosAsync)
  }

  const options = usuarios.map(pessoa => ({
    value: pessoa.cpf, 
    label: pessoa.nome
  }));

  const showModal = () => setShowModalExcluirLeilao(true);

  const hideModal = () => setShowModalExcluirLeilao(false);

  async function adicionarLeilao(leilao) {
    let novaListaLeiloes = leiloes;
    novaListaLeiloes.push(leilao);
    await AsyncStorage.setItem('leiloes', JSON.stringify(novaListaLeiloes));
    setLeiloes(novaListaLeiloes);
  }

  async function editarLeilao(leilaoAntigo, novosDados) {
    const novaListaLeiloes = leiloes.map(leilao => {
      if (leilao === leilaoAntigo) {
        return novosDados;
      } else {
        return leilao;
      }
    });

    await AsyncStorage.setItem('leiloes', JSON.stringify(novaListaLeiloes));
    setLeiloes(novaListaLeiloes);
  }

  async function excluirLeilao(leilao) {
    const novaListaLeiloes = leiloes.filter(l => l !== leilao);
    await AsyncStorage.setItem('leiloes', JSON.stringify(novaListaLeiloes));
    setLeiloes(novaListaLeiloes);
    Toast.show({
      type: 'success',
      text1: 'Leilão excluído com sucesso!',
    });
  }

  function handleExcluirLeilao() {
    excluirLeilao(leilaoASerExcluido);
    setLeilaoASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>Lista de Leilões</Text>

      <FlatList
        style={styles.list}
        data={leiloes}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
              <Card.Cover source={{ uri: item.imagem }} />
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.marca}</Text>
                <Text variant='bodyLarge'>Carro: {item?.carro}</Text>
                <Text variant='bodyLarge'>Nome Vendedor: {item?.nomeVendedor}</Text>
                <Text variant='bodyLarge'>Contato: {item?.contato}</Text>
                <Text variant='bodyLarge'>Valor: {item?.valor}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.button} onPress={() => navigation.push('FormLeilao', { acao: editarLeilao, leilao: item })}>
                <Text style={styles.text}>Editar</Text>
              </Button>
              <Button style={styles.button} onPress={() => {
                setLeilaoASerExcluido(item);
                showModal();
              }}>
                <Text style={styles.text}>Excluir</Text>
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormLeilao', { acao: adicionarLeilao })}
      />

      {/* Modal Excluir Leilão */}
      <Portal>
        <Dialog visible={showModalExcluirLeilao} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este leilão?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirLeilao}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
    backgroundColor: '#000',
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
  },
  text: {
    color: '#000',
  },
});
