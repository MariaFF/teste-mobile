import React, {useRef, useCallback} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../hooks/auth';

import api from '../../service/api';
import getValidationsErrors from '../../utils/getValidationErros';

import {
  Container,
  Title,
  Separator,
  BackToSignIn,
  BackToSignInText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  nome: string;
  email: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const {signUp} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('Email obrigatorio')
          .email('Digite um email valido'),
        senha: Yup.string().min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/users', data);
      const user = response.data;
      signUp({...data, _id: user._id});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Title>Crie sua conta</Title>

            <Separator />

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="nome"
                icon="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="senha"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
              />

              {/* <Input
                name="password"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              /> */}

              <Button
                style={{backgroundColor: '#5A67D8'}}
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Criar conta
              </Button>
              <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#000" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
              </BackToSignIn>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
