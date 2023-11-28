import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FormAcessorios({ navigation, route }) {

    const { acao, acessorio: acessorioAntigo } = route.params

    const [manta, setManta] = useState('')
    const [sensor, setSensor] = useState('')
    const [calota, setCalota] = useState('')

    const validationSchema = Yup.object().shape({
        manta: Yup.string().required('Campo obrigatório!'),
        sensor: Yup.string().required('Campo obrigatório!'),
        calota: Yup.string().required('Campo obrigatório!'),
    })

    useEffect(() => {
        if (acessorioAntigo) {
            setManta(acessorioAntigo.manta)
            setSensor(acessorioAntigo.sensor)
            setCalota(acessorioAntigo.calota)
        }
    }, [])
    
    function salvar(novoAcessorio) {
        console.log('SALVAR DADOS NOVO ACESSÓRIO -> ', novoAcessorio)

        if (acessorioAntigo) {
            acao(acessorioAntigo, novoAcessorio)
        } else {
            acao(novoAcessorio)
        }

        Toast.show({
            type: 'success',
            text1: 'Acessório salvo com sucesso!'
        })

        navigation.goBack()
    }

    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title}>{acessorioAntigo ? 'Editar Acessório' : 'Adicionar Acessório'}</Text>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    manta: manta,
                    sensor: sensor,
                    calota: calota,
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
                                keyboardType='numeric'
                                label='Manta refletiva'
                                value={values.manta}
                                onChangeText={handleChange('manta')}
                                onBlur={handleBlur('manta')}
                                error={errors.manta ? true : false}
                            />

                            {touched.manta && errors.manta && (
                                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.manta}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Sensor de Ré'
                                keyboardType='numeric'
                                value={values.sensor}
                                onChangeText={handleChange('sensor')}
                                onBlur={handleBlur('sensor')}
                            />
                            
                            {touched.sensor && errors.sensor && (
                                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.sensor}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                keyboardType='numeric'
                                label='Calota'
                                value={values.calota}
                                onChangeText={handleChange('calota')}
                                onBlur={handleBlur('calota')}
                            />

                            {touched.sensor && errors.sensor && (
                                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.sensor}</Text>
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
        marginTop: 50
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
