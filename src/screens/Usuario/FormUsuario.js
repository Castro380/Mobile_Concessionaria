import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function FormUsuario({ navigation, route }) {
  const { acao, usuario: usuarioAntigo } = route.params;

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCPF] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCEP] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const validationSchema = Yup.object().shape({
    nomeCompleto: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    telefone: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório!'),
    cep: Yup.string().required('Campo obrigatório!'),
    bairro: Yup.string().required('Campo obrigatório!'),
    cidade: Yup.string().required('Campo obrigatório!'),
    estado: Yup.string().required('Campo obrigatório!'),
  });

  useEffect(() => {
    if (usuarioAntigo) {
      setNomeCompleto(usuarioAntigo.nomeCompleto || '');
      setCPF(usuarioAntigo.cpf || '');
      setTelefone(usuarioAntigo.telefone || '');
      setEmail(usuarioAntigo.email || '');
      setCEP(usuarioAntigo.cep || '');
      setBairro(usuarioAntigo.bairro || '');
      setCidade(usuarioAntigo.cidade || '');
      setEstado(usuarioAntigo.estado || '');
    }
  }, [usuarioAntigo]);

  function salvar(novoUsuario) {
    console.log('SALVAR DADOS NOVO USUÁRIO -> ', novoUsuario);

    if (usuarioAntigo) {
      acao(usuarioAntigo, novoUsuario);
    } else {
      acao(novoUsuario);
    }

    Toast.show({
      type: 'success',
      text1: 'Usuário salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {usuarioAntigo ? 'Editar Usuário' : 'Adicionar Usuário'}
      </Text>

      <Formik
        enableReinitialize={true}
        initialValues={{
          nomeCompleto: nomeCompleto,
          cpf: cpf,
          telefone: telefone,
          email: email,
          cep: cep,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <ScrollView style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome Completo"
                value={values.nomeCompleto}
                onChangeText={handleChange('nomeCompleto')}
                onBlur={handleBlur('nomeCompleto')}
                error={touched.nomeCompleto && errors.nomeCompleto ? true : false}

              />
              {touched.nomeCompleto && errors.nomeCompleto && (
                <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
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
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? true : false}
              />

              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Cep"
                value={values.cep}
                onChangeText={handleChange('cep')}
                onBlur={handleBlur('cep')}
                error={touched.cep && errors.cep ? true : false}
              />

              {touched.cep && errors.cep && (
                <Text style={styles.errorText}>{errors.cep}</Text>
              )}

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Bairro"
                value={values.bairro}
                onChangeText={handleChange('bairro')}
                onBlur={handleBlur('bairro')}
                error={touched.bairro && errors.bairro ? true : false}
              />

              {touched.bairro && errors.bairro && (
                <Text style={styles.errorText}>{errors.bairro}</Text>
              )}

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Cidade"
                value={values.cidade}
                onChangeText={handleChange('cidade')}
                onBlur={handleBlur('cidade')}
                error={touched.cidade && errors.cidade ? true : false}
              />

              {touched.cidade && errors.cidade && (
                <Text style={styles.errorText}>{errors.cidade}</Text>
              )}

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Estado"
                value={values.estado}
                onChangeText={handleChange('estado')}
                onBlur={handleBlur('estado')}
                error={touched.estado && errors.estado ? true : false}
              />

              {touched.estado && errors.estado && (
                <Text style={styles.errorText}>{errors.estado}</Text>
              )}  
            </ScrollView>

            <View style={styles.buttonContainer}>
              <Button style={styles.button} mode="contained" onPress={() => navigation.goBack()}>
                Voltar
              </Button>

              <Button style={styles.button} mode="contained" onPress={handleSubmit}>
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
    marginTop: 70
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
