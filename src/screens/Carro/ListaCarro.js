import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaCarros({ navigation, route }) {

  const [carros, setCarros] = useState([])
  const [showModalExcluirCarro, setShowModalExcluirCarro] = useState(false)
  const [carroASerExcluido, setCarroASerExcluido] = useState(null)

  useEffect(() => {
    loadCarros()
  }, [])

  async function loadCarros() {
    const response = await AsyncStorage.getItem('carros')
    console.log("🚀 ~ file: ListaCarrosAsyncStorage.js:21 ~ loadCarros ~ response:", response)
    const carrosStorage = response ? JSON.parse(response) : []
    setCarros(carrosStorage)
  }

  const showModal = () => setShowModalExcluirCarro(true);

  const hideModal = () => setShowModalExcluirCarro(false);

  async function adicionarCarro(carro) {
    let novaListaCarros = carros
    novaListaCarros.push(carro)
    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros));
    setCarros(novaListaCarros)
  }

  async function editarCarro(carroAntigo, novosDados) {
    console.log('CARRO ANTIGO -> ', carroAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaCarros = carros.map(carro => {
      if (carro === carroAntigo) {
        return novosDados
      } else {
        return carro
      }
    })

    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros))
    setCarros(novaListaCarros)
  }

  async function excluirCarro(carro) {
    const novaListaCarros = carros.filter(c => c !== carro)
    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros))
    setCarros(novaListaCarros)
    Toast.show({
      type: 'success',
      text1: 'Carro excluído com sucesso!'
    })
  }

  function handleExcluirCarro() {
    excluirCarro(carroASerExcluido)
    setCarroASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Carros</Text>

      <FlatList
        style={styles.list}
        data={carros}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.marca}</Text>
                <Text variant='bodyLarge'>Modelo: {item?.modelo}</Text>
                <Text variant='bodyLarge'>Ano: {item?.ano}</Text>
                {/* Aqui você pode adicionar mais informações sobre os carros */}
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormCarros', { acao: editarCarro, carro: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setCarroASerExcluido(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormCarros', { acao: adicionarCarro })}
      />

      {/* Modal Excluir Carro */}
      <Portal>
        <Dialog visible={showModalExcluirCarro} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este carro?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirCarro}>Tenho Certeza</Button>
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
    margin: 10
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
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})
