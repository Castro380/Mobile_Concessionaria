import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function FormLeiloes({ navigation, route }) {
  const { acao, leilao: leilaoAntigo } = route.params;

  const [carro, setCarro] = useState('');
  const [imagem, setImagem] = useState('');
  const [nomeVendedor, setNomeVendedor] = useState('');
  const [contato, setContato] = useState('');
  const [valor, setValor] = useState('');

  const validationSchema = Yup.object().shape({
    carro: Yup.string().required('Campo obrigatório!'),
    imagem: Yup.string().required('Campo obrigatório!'),
    nomeVendedor: Yup.string().required('Campo obrigatório!'),
    contato: Yup.string().required('Campo obrigatório!'),
    valor: Yup.string().required('Campo obrigatório!'),
  });

  useEffect(() => {
    if (leilaoAntigo) {
      setCarro(leilaoAntigo.carro);
      setImagem(leilaoAntigo.imagem);
      setNomeVendedor(leilaoAntigo.nomeVendedor);
      setContato(leilaoAntigo.contato);
      setValor(leilaoAntigo.valor);
    }
  }, [leilaoAntigo]);
  
  function salvar(novoLeilao) {
    console.log('SALVAR DADOS NOVO LEILÃO -> ', novoLeilao);

    if (leilaoAntigo) {
      acao(leilaoAntigo, novoLeilao);
    } else {
      acao(novoLeilao);
    }

    Toast.show({
      type: 'success',
      text1: 'Leilão salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>{leilaoAntigo ? 'Editar Leilão' : 'Adicionar Leilão'}</Text>

      <Formik
        enableReinitialize={true}
        initialValues={{
          carro: carro,
          imagem: imagem,
          nomeVendedor: nomeVendedor,
          contato: contato,
          valor: valor,
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
                label='Carro'
                value={values.carro}
                onChangeText={handleChange('carro')}
                onBlur={handleBlur('carro')}
                error={errors.carro ? true : false}
              />

              {touched.carro && errors.carro && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.carro}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Imagem'
                value={values.imagem}
                onChangeText={handleChange('imagem')}
                onBlur={handleBlur('imagem')}
                error={errors.imagem ? true : false}
              />

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Nome do Vendedor'
                value={values.nomeVendedor}
                onChangeText={handleChange('nomeVendedor')}
                onBlur={handleBlur('nomeVendedor')}
                error={errors.nomeVendedor ? true : false}
              />

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Contato'
                value={values.contato}
                onChangeText={handleChange('contato')}
                onBlur={handleBlur('contato')}
                error={errors.contato ? true : false}
              />

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Valor'
                value={values.valor}
                onChangeText={handleChange('valor')}
                onBlur={handleBlur('valor')}
                error={errors.valor ? true : false}
              />

              {/* Adicione outros campos do leilão conforme necessário */}

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
  },
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
  },
});
