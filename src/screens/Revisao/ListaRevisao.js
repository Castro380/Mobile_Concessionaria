import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaRevisoes({ navigation, route }) {

  const [revisoes, setRevisoes] = useState([])
  const [showModalExcluirRevisao, setShowModalExcluirRevisao] = useState(false)
  const [revisaoASerExcluida, setRevisaoASerExcluida] = useState(null)

  useEffect(() => {
    loadRevisoes()
  }, [])

  async function loadRevisoes() {
    const response = await AsyncStorage.getItem('revisoes')
    console.log("🚀 ~ file: ListaRevisoesAsyncStorage.js:21 ~ loadRevisoes ~ response:", response)
    const revisoesStorage = response ? JSON.parse(response) : []
    setRevisoes(revisoesStorage)
  }

  const showModal = () => setShowModalExcluirRevisao(true);

  const hideModal = () => setShowModalExcluirRevisao(false);

  async function adicionarRevisao(revisao) {
    let novaListaRevisoes = revisoes
    novaListaRevisoes.push(revisao)
    await AsyncStorage.setItem('revisoes', JSON.stringify(novaListaRevisoes));
    setRevisoes(novaListaRevisoes)
  }

  async function editarRevisao(revisaoAntiga, novosDados) {
    console.log('REVISAO ANTIGA -> ', revisaoAntiga)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaRevisoes = revisoes.map(revisao => {
      if (revisao === revisaoAntiga) {
        return novosDados
      } else {
        return revisao
      }
    })

    await AsyncStorage.setItem('revisoes', JSON.stringify(novaListaRevisoes))
    setRevisoes(novaListaRevisoes)
  }

  async function excluirRevisao(revisao) {
    const novaListaRevisoes = revisoes.filter(r => r !== revisao)
    await AsyncStorage.setItem('revisoes', JSON.stringify(novaListaRevisoes))
    setRevisoes(novaListaRevisoes)
    Toast.show({
      type: 'success',
      text1: 'Revisão excluída com sucesso!'
    })
  }

  function handleExcluirRevisao() {
    excluirRevisao(revisaoASerExcluida)
    setRevisaoASerExcluida(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Revisões</Text>

      <FlatList
        style={styles.list}
        data={revisoes}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='bodyLarge'>Nome: {item?.nome}</Text>
                <Text variant='bodyLarge'>Cpf: {item?.cpf}</Text>
                <Text variant='bodyLarge'>Telefone: {item?.telefone}</Text>
                <Text variant='bodyLarge'>Data: {item?.data}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.button} onPress={() => navigation.push('FormRevisao', { acao: editarRevisao, revisao: item })}>
              <Text style={styles.text}>
                Editar
                </Text>
              </Button>
              <Button style={styles.button} onPress={() => {
                setRevisaoASerExcluida(item)
                showModal()
              }}>
                <Text style={styles.text}>
                Excluir
                </Text>
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormRevisao', { acao: adicionarRevisao })}
      />

      {/* Modal Excluir Revisao */}
      <Portal>
        <Dialog visible={showModalExcluirRevisao} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir esta revisão?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirRevisao}>Tenho Certeza</Button>
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
