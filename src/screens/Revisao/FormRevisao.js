import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FormRevisoes({ navigation, route }) {

    const { acao, revisao: revisoesAntigas } = route.params
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [usuarios, setUsuarios] = useState('')
    const [data, setData] = useState('')

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Campo obrigatório!'),
        cpf: Yup.string().required('Campo obrigatório!'),
        telefone: Yup.string().required('Campo obrigatório!'),
        data: Yup.string().required('Campo obrigatório!'),
    })

    useEffect(() => {
        if (revisoesAntigas) {
            setNome(revisoesAntigas.nome)
            setCpf(revisoesAntigas.cpf)
            setTelefone(revisoesAntigas.telefone)
            setData(revisoesAntigas.data)
        }
    }, [])

    useEffect(() => {
        loadUsuarios()
      }, [])
    
      async function loadUsuarios() {
        const response = await AsyncStorage.getItem('usuarios')
        console.log("🚀 ~ file: ListaUsuariosAsyncStorage.js:21 ~ loadUsuarios ~ response:", response)
        const usuariosStorage = response ? JSON.parse(response) : []
        setUsuarios(usuariosStorage)
      }

    function salvar(novaRevisao) {
        console.log('SALVAR DADOS NOVA REVISÃO -> ', novaRevisao)

        if (revisoesAntigas) {
            acao(revisoesAntigas, novaRevisao)
        } else {
            acao(novaRevisao)
        }

        Toast.show({
            type: 'success',
            text1: 'Revisões salvas com sucesso!'
        })

        navigation.goBack()
    }

    console.log(usuarios)
    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title}>{revisoesAntigas ? 'Editar Revisões' : 'Adicionar Revisões'}</Text>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone,
                    data: data,
                }}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={styles.inputContainer}>

                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Nome Completo"
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                error={touched.nome && errors.nome ? true : false}

                            />
                            {touched.nome && errors.nome && (
                                <Text style={styles.errorText}>{errors.nome}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="CPF"
                                value={values.cpf}
                                onChangeText={handleChange('cpf')}
                                onBlur={handleBlur('cpf')}
                                error={touched.cpf && errors.cpf ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'cpf'}
                                    />
                                }
                            />
                            {touched.cpf && errors.cpf && (
                                <Text style={styles.errorText}>{errors.cpf}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Telefone"
                                value={values.telefone}
                                onChangeText={handleChange('telefone')}
                                onBlur={handleBlur('telefone')}
                                error={touched.telefone && errors.telefone ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'cel-phone'}
                                    />
                                }
                            />
                            {touched.telefone && errors.telefone && (
                                <Text style={styles.errorText}>{errors.telefone}</Text>
                            )}

                        <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Telefone"
                                value={values.data}
                                onChangeText={handleChange('data')}
                                onBlur={handleBlur('data')}
                                error={touched.data && errors.data ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'datetime'}
                                    />
                                }
                            />
                            {touched.data && errors.data && (
                                <Text style={styles.errorText}>{errors.data}</Text>
                            )}
                

                        </View>

                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='contained'
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={styles.button}
                                mode='contained'
                                onPress={handleSubmit}
                            >
                                Salvar
                            </Button>

                        </View>

                    </>

                )}
            </Formik>

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
        marginTop : 50
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1,
        backgroundColor: 'black'

    }
})
