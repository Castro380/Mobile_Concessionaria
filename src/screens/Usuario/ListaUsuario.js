import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaUsuarios({ navigation, route }) {

  const [usuarios, setUsuarios] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [usuarioASerExcluido, setUsuarioASerExcluido] = useState(null)

  useEffect(() => {
    loadUsuarios()
  }, [])

  async function loadUsuarios() {
    const response = await AsyncStorage.getItem('usuarios')
    console.log("🚀 ~ file: ListaUsuariosAsyncStorage.js:21 ~ loadUsuarios ~ response:", response)
    const usuariosStorage = response ? JSON.parse(response) : []
    setUsuarios(usuariosStorage)
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarUsuario(usuario) {
    let novaListaUsuarios = usuarios
    novaListaUsuarios.push(usuario)
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios)
  }

  async function editarUsuario(usuarioAntigo, novosDados) {
    console.log('USUÁRIO ANTIGO -> ', usuarioAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaUsuarios = usuarios.map(usuario => {
      if (usuario === usuarioAntigo) {
        return novosDados
      } else {
        return usuario
      }
    })

    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios))
    setUsuarios(novaListaUsuarios)
  }

  async function excluirUsuario(usuario) {
    const novaListaUsuarios = usuarios.filter(u => u !== usuario)
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios))
    setUsuarios(novaListaUsuarios)
    Toast.show({
      type: 'success',
      text1: 'Usuário excluído com sucesso!'
    })
  }

  function handleExcluirUsuario() {
    excluirUsuario(usuarioASerExcluido)
    setUsuarioASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Usuários</Text>

      <FlatList
        style={styles.list}
        data={usuarios}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nomeCompleto}</Text>
                <Text variant='bodyLarge'>CPF: {item?.cpf}</Text>
                <Text variant='bodyLarge'>Telefone: {item?.telefone}</Text>
                <Text variant='bodyLarge'>Email: {item?.email}</Text>
                <Text variant='bodyLarge'>CEP: {item?.cep}</Text>
                <Text variant='bodyLarge'>Endereço: {item?.endereco}</Text>
                <Text variant='bodyLarge'>Bairro: {item?.bairro}</Text>
                <Text variant='bodyLarge'>Cidade: {item?.cidade}</Text>
                <Text variant='bodyLarge'>Estado: {item?.estado}</Text>
                {/* Outros campos adicionados */}
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.button} onPress={() => navigation.push('FormUsuario', { acao: editarUsuario, usuario: item })}>
              <Text style={styles.text}>
                Editar
                </Text>
              </Button>
              <Button style={styles.button} onPress={() => {
                setUsuarioASerExcluido(item)
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
        onPress={() => navigation.push('FormUsuario', { acao: adicionarUsuario })}
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirUsuario}>Tenho Certeza</Button>
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
