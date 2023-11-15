import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FormCarrosFormularioAltoNivel({ navigation, route }) {

    const { acao, carro: carroAntigo } = route.params

    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')

    const validationSchema = Yup.object().shape({
        marca: Yup.string().required('Campo obrigatório!'),
        modelo: Yup.string().required(),
        ano: Yup.string().required(),
        // Adicione outras validações necessárias para os dados do carro aqui
    })

    useEffect(() => {
        if (carroAntigo) {
            setMarca(carroAntigo.marca)
            setModelo(carroAntigo.modelo)
            setAno(carroAntigo.ano)
        }
    }, [])
    
    function salvar(novoCarro) {
        console.log('SALVAR DADOS NOVO CARRO -> ', novoCarro)

        if (carroAntigo) {
            acao(carroAntigo, novoCarro)
        } else {
            acao(novoCarro)
        }

        Toast.show({
            type: 'success',
            text1: 'Carro salvo com sucesso!'
        })

        navigation.goBack()
    }

    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title}>{carroAntigo ? 'Editar Carro' : 'Adicionar Carro'}</Text>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    marca: marca,
                    modelo: modelo,
                    ano: ano,
                }}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={styles.inputContainer}>

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Marca'
                                value={values.marca}
                                onChangeText={handleChange('marca')}
                                onBlur={handleBlur('marca')}
                                error={errors.marca ? true : false}
                            />

                            {touched.marca && errors.marca && (
                                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.marca}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Modelo'
                                value={values.modelo}
                                onChangeText={handleChange('modelo')}
                                onBlur={handleBlur('modelo')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Ano'
                                value={values.ano}
                                onChangeText={handleChange('ano')}
                                onBlur={handleBlur('ano')}
                            />

                            {/* Adicione outros campos do carro conforme necessário */}

                        </View>

                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='contained-tonal'
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
        margin: 10
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
        flex: 1
    }
})
