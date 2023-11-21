import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaAcessorios({ navigation, route }) {

  const [acessorios, setAcessorios] = useState([])
  const [showModalExcluirAcessorio, setShowModalExcluirAcessorio] = useState(false)
  const [acessorioASerExcluido, setAcessorioASerExcluido] = useState(null)

  useEffect(() => {
    loadAcessorios()
  }, [])

  async function loadAcessorios() {
    const response = await AsyncStorage.getItem('acessorios')
    console.log("🚀 ~ file: ListaAcessoriosAsyncStorage.js:21 ~ loadAcessorios ~ response:", response)
    const acessoriosStorage = response ? JSON.parse(response) : []
    setAcessorios(acessoriosStorage)
  }

  const showModal = () => setShowModalExcluirAcessorio(true);

  const hideModal = () => setShowModalExcluirAcessorio(false);

  async function adicionarAcessorio(acessorio) {
    let novaListaAcessorios = acessorios
    novaListaAcessorios.push(acessorio)
    await AsyncStorage.setItem('acessorios', JSON.stringify(novaListaAcessorios));
    setAcessorios(novaListaAcessorios)
  }

  async function editarAcessorio(acessorioAntigo, novosDados) {
    console.log('ACESSÓRIO ANTIGO -> ', acessorioAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaAcessorios = acessorios.map(acessorio => {
      if (acessorio === acessorioAntigo) {
        return novosDados
      } else {
        return acessorio
      }
    })

    await AsyncStorage.setItem('acessorios', JSON.stringify(novaListaAcessorios))
    setAcessorios(novaListaAcessorios)
  }

  async function excluirAcessorio(acessorio) {
    const novaListaAcessorios = acessorios.filter(a => a !== acessorio)
    await AsyncStorage.setItem('acessorios', JSON.stringify(novaListaAcessorios))
    setAcessorios(novaListaAcessorios)
    Toast.show({
      type: 'success',
      text1: 'Acessório excluído com sucesso!'
    })
  }

  function handleExcluirAcessorio() {
    excluirAcessorio(acessorioASerExcluido)
    setAcessorioASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Acessórios</Text>

      <FlatList
        style={styles.list}
        data={acessorios}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='bodyLarge'>Manta: {item?.manda}</Text> 
                <Text variant='titleMedium'>Sensor:{item?.sensor}</Text>
                <Text variant='bodyLarge'>Calota: {item?.calota}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.button} onPress={() => navigation.push('FormAcessorio', { acao: editarAcessorio, acessorio: item })}>
                <Text style={styles.text}>Editar</Text>
              </Button>
              <Button style={styles.button} onPress={() => {
                setAcessorioASerExcluido(item)
                showModal()
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
        onPress={() => navigation.push('FormAcessorio', { acao: adicionarAcessorio })}
      />

      {/* Modal Excluir Acessório */}
      <Portal>
        <Dialog visible={showModalExcluirAcessorio} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este acessório?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirAcessorio}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    marginTop : 50,
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
    backgroundColor: '#000'
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }, 
  button: {
    backgroundColor: '#fff',
    color: '#000',
  },
  text: {
    color: '#000',
  }
})
